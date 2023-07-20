import { FORGOT_PASSWORD_PREFIX } from "./../constants";
import { User } from "../entities/User";
import {
    Arg,
    Ctx,
    Int,
    Mutation,
    PubSubEngine,
    PubSub,
    Query,
    Resolver,
    Subscription,
    UseMiddleware,
    Root,
} from "type-graphql";
import { MyContext } from "../types";
import argon2 from "argon2";
import { getConnection } from "typeorm";
import { COOKIE_NAME } from "../constants";
import { v4 } from "uuid";
import { sendEmail } from "../utils/sendEmail";
import {
    UserResponse,
    UsersResponse,
    Notifications,
} from "./Objecttypes/UserObject";
import { isAuth } from "../middlewares/isAuth";
import { boolResponse } from "./Objecttypes/matchingtypes/UpdatedResponse";
import { Topic } from "../Topics";
import {
    DeleteFriendNotification,
    MakeFriendNotification,
    UserOnlineNotification,
} from "../utils/Notifications";

@Resolver()
export class UserResolver {
    @Query(() => [User])
    async Users(): Promise<User[]> {
        return User.find({});
    }

    @Query(() => [User])
    @UseMiddleware(isAuth)
    async Findusers(
        @Arg("name") name: string,
        @Ctx() { req }: MyContext
    ): Promise<User[]> {
        return await getConnection().query(
            `
            select * from public.user u
            where u.id <> $1
            order by levenshtein(u.username,$2) ASC
            limit 10
        `,
            [req.session.userId, name]
        );
    }

    @Query(() => User, { nullable: true })
    async me(@Ctx() { req }: MyContext): Promise<User | undefined> {
        if (!req.session.userId) {
            return undefined;
        }
        const user = await User.findOne({ where: { id: req.session.userId } });
        return user;
    }

    @Subscription(() => Notifications, {
        topics: [
            Topic.LOGGED_IN,
            Topic.LOGGED_OFF,
            Topic.MAKE_FRIEND,
            Topic.DELETE_FRIEND,
        ],
    })
    onlineUsers(@Root() payload: Notifications): Notifications {
        return payload;
    }

    @Mutation(() => boolResponse)
    @UseMiddleware(isAuth)
    async makeFriends(
        @Arg("userId", () => Int) userId: number,
        @PubSub() pubSub: PubSubEngine,
        @Ctx() { req }: MyContext
    ): Promise<boolResponse> {
        let friend;
        let username: string;

        if (userId === req.session.userId) {
            return {
                updated: false,
                errors: [
                    {
                        field: "friend",
                        message: `You cannot Befriend yourself`,
                    },
                ],
            };
        }

        try {
            friend = await getConnection().query(
                `
            insert into user_friends_user ("userId_1","userId_2")values($1,$2)

        `,
                [req.session.userId, userId]
            );
        } catch (err) {
            return {
                updated: false,
                errors: [
                    {
                        field: "friend",
                        message: `failed in making the user friend:   ${err.detail}`,
                    },
                ],
            };
        }

        try {
            username = await (await User.findOne({ where: { id: userId } }))
                .username;
        } catch (err) {
            return {
                updated: false,
                errors: [
                    {
                        field: "friendSelection",
                        message: `Failed in finding friend:   ${err.detail}`,
                    },
                ],
            };
        }
        if (friend[1] === 0) {
            return {
                updated: false,
                success: [
                    {
                        field: "friend",
                        message: "you have are already friends",
                    },
                ],
            };
        }

        /*
         * Publishing Notification for Making friend
         */

        await pubSub.publish(
            Topic.MAKE_FRIEND,
            MakeFriendNotification(username)
        );

        return {
            updated: true,
            success: [
                {
                    field: "friend",
                    message: "you have succesfully made a friend",
                },
            ],
        };
    }

    @Mutation(() => boolResponse)
    @UseMiddleware(isAuth)
    async deleteFriends(
        @Arg("userId", () => Int) userId: number,
        @PubSub() pubSub: PubSubEngine,
        @Ctx() { req }: MyContext
    ): Promise<boolResponse> {
        let friend;
        let username: string;
        try {
            friend = await getConnection().query(
                `
            delete from user_friends_user
            where "userId_1"=$1 and "userId_2"=$2
            `,
                [req.session.userId, userId]
            );
        } catch (err) {
            return {
                updated: false,
                errors: [
                    {
                        field: "friend",
                        message: `failed in deleting the user friend:   ${err.detail}`,
                    },
                ],
            };
        }

        try {
            username = await (await User.findOne({ where: { id: userId } }))
                .username;
        } catch (err) {
            return {
                updated: false,
                errors: [
                    {
                        field: "friendSelection",
                        message: `Failed in finding friend:   ${err.detail}`,
                    },
                ],
            };
        }
        if (friend[1] === 0) {
            return {
                updated: false,
                success: [
                    {
                        field: "friend",
                        message: "you have already unfriended this friend",
                    },
                ],
            };
        }

        /*
         * Publishing Notification for deleting friend
         */

        await pubSub.publish(
            Topic.DELETE_FRIEND,
            DeleteFriendNotification(username)
        );

        return {
            updated: true,
            success: [
                {
                    field: "friend",
                    message: "you have succesfully unfriended a friend",
                },
            ],
        };
    }

    @Query(() => UsersResponse, { nullable: true })
    @UseMiddleware(isAuth)
    async findFriends(@Ctx() { req }: MyContext): Promise<UsersResponse> {
        const friends = await getConnection().query(
            `   select *
                from public.user u
                where u.id <> $1
                and exists(
                select 1
                from user_friends_user f
                where (f."userId_1" = $1 and f."userId_2" = u.id )
                or (f."userId_2" = $1 and f."userId_1" = u.id )
                ) order by u.username
            `,
            [req.session.userId]
        );
        if (friends.length === 0) {
            return {
                users: friends,
                success: [
                    {
                        field: "friends",
                        message: "you have no friends",
                    },
                ],
            };
        }

        return {
            users: friends,
            success: [
                {
                    field: "friends",
                    message: "successfully queryed friends",
                },
            ],
        };
    }

    @Mutation(() => boolResponse)
    @UseMiddleware(isAuth)
    async profilePic(
        @Arg("image") image: string,
        @Ctx() { req }: MyContext
    ): Promise<boolResponse> {
        let user: User;
        const size: number = image.length * (3 / 4) - 2;
        console.log(size);
        if (size > 5000000) {
            return {
                errors: [
                    {
                        field: "image",
                        message: "image size too big",
                    },
                ],
            };
        }
        const base64Rejex: RegExp = /^(?:[A-Z0-9+\/]{4})*(?:[A-Z0-9+\/]{2}==|[A-Z0-9+\/]{3}=|[A-Z0-9+\/]{4})$/i;
        let isValid: boolean = base64Rejex.test(image);
        if (!isValid) {
            return {
                errors: [
                    {
                        field: "image",
                        message: "not base64 encoded",
                    },
                ],
            };
        }
        try {
            user = await getConnection().query(
                `
                update public.user
                set profilepic=$1
                where id=$2
                `,
                [image, req.session.userId]
            );
            console.log(user);
        } catch (err) {
            return {
                updated: false,
                errors: [
                    {
                        field: "updated",
                        message: err.detail,
                    },
                ],
            };
        }
        if (user[1] === 1) {
            return {
                updated: true,
                success: [
                    {
                        field: "profilepic",
                        message: "profilepic updated",
                    },
                ],
            };
        }
        return {
            updated: false,
            success: [
                {
                    field: "profilepic",
                    message: "profilepic didnot update",
                },
            ],
        };
    }

    @Mutation(() => UserResponse)
    async register(
        @Arg("username") username: string,
        @Arg("email") email: string,
        @Arg("password") password: string,
        @Ctx() { req }: MyContext
    ): Promise<UserResponse> {
        if (username.length <= 2) {
            return {
                errors: [
                    {
                        field: "username",
                        message: "username length too short it is not possible",
                    },
                ],
            };
        }
        if (username.includes("@")) {
            return {
                errors: [
                    {
                        field: "username",
                        message:
                            "username cannot have @ character because it is used in email format",
                    },
                ],
            };
        }
        if (!email.includes("@")) {
            return {
                errors: [
                    {
                        field: "email",
                        message:
                            "email format is incorrect,invalid not possible",
                    },
                ],
            };
        }
        if (email.length <= 2) {
            return {
                errors: [
                    {
                        field: "email",
                        message:
                            "invalid email name length too short not possible",
                    },
                ],
            };
        }
        if (password.length < 8) {
            return {
                errors: [
                    {
                        field: "password",
                        message:
                            "password length must be atleast 8 characters long",
                    },
                ],
            };
        }
        if (password.length > 100) {
            return {
                errors: [
                    {
                        field: "password",
                        message:
                            "password length must be not be above 100 characters long",
                    },
                ],
            };
        }
        let user;
        const HashedPassword = await argon2.hash(password);
        try {
            const result = await getConnection()
                .createQueryBuilder()
                .insert()
                .into(User)
                .values({
                    username: username,
                    email: email,
                    password: HashedPassword,
                })
                .returning("*")
                .execute();
            user = result.raw[0];
        } catch (err) {
            if (err.code === "23505") {
                return {
                    errors: [
                        {
                            field: "Duplicate Key",
                            message: err.detail,
                        },
                    ],
                };
            }
        }
        //This will autologin the user when registering
        req.session.userId = user.id;

        return { user };
    }

    @Mutation(() => UserResponse)
    async login(
        @Arg("usernameorEmail") usernameorEmail: string,
        @Arg("password") password: string,
        @PubSub() pubSub: PubSubEngine,
        @Ctx() { req }: MyContext
    ): Promise<UserResponse> {
        const user = await User.findOne(
            usernameorEmail.includes("@")
                ? { where: { email: usernameorEmail } }
                : { where: { username: usernameorEmail } }
        );

        if (!user) {
            return {
                errors: [
                    {
                        field: "username",
                        message: "the username or email doesnot exist",
                    },
                ],
            };
        }
        const valid = await argon2.verify(user.password, password);

        if (!valid) {
            return {
                errors: [
                    {
                        field: "password",
                        message: "password doesn't match,incorrect password",
                    },
                ],
            };
        }

        req.session.userId = user.id;

        /*
         * Publishing Notification for Going online
         */

        await pubSub.publish(
            Topic.LOGGED_IN,
            UserOnlineNotification(user.username)
        );

        return {
            user,
        };
    }

    @Mutation(() => Boolean)
    async logout(
        //@PubSub() pubSub: PubSubEngine,
        @Ctx() { req, res }: MyContext
    ): Promise<boolean> {
        return new Promise<boolean>((resolve) => {
            req.session.destroy((err: any) => {
                res.clearCookie(COOKIE_NAME);
                if (err) {
                    console.log(err);
                    resolve(false);
                    return;
                }
                resolve(true);
            });
        });
    }

    @Mutation(() => Boolean)
    async forgotPassword(
        @Arg("email", () => String) email: string,
        @Ctx() { redis }: MyContext
    ): Promise<boolean> {
        const user = await User.findOne({ where: { email: email } });
        if (!user) {
            return true;
        }
        const token = v4();

        await redis.set(
            FORGOT_PASSWORD_PREFIX + token,
            user.id,
            "ex",
            1000 * 60 * 60 * 24
        );

        await sendEmail(
            email,
            `Click this link to rest your password ,the link will expire after one time use,if you didnot post this request than just ignore this link donot use it or else someoneelse can get access to your account
            <a href='http://localhost:3000/change-password/${token}'>Reset password</a>`
        );

        return true;
    }

    @Mutation(() => UserResponse)
    async changePassword(
        @Arg("newPassword", () => String) newPassword: string,
        @Arg("token", () => String) token: string,
        @Ctx() { redis, req }: MyContext
    ): Promise<UserResponse> {
        const userId = await redis.get(FORGOT_PASSWORD_PREFIX + token);

        if (newPassword.length < 8) {
            return {
                errors: [
                    {
                        field: "newPassword",
                        message:
                            "password length must be atleast 8 characters long",
                    },
                ],
            };
        }
        if (!userId) {
            return {
                errors: [
                    {
                        field: "token",
                        message: "token expired",
                    },
                ],
            };
        }
        if (newPassword.length > 100) {
            return {
                errors: [
                    {
                        field: "newPassword",
                        message:
                            "password length must be not be above 100 characters long",
                    },
                ],
            };
        }

        const user = await User.findOne({ where: { id: parseInt(userId) } });

        if (!user) {
            return {
                errors: [
                    {
                        field: "token",
                        message: "User got deleted or no user",
                    },
                ],
            };
        }
        user.password = await argon2.hash(newPassword);
        user.save();

        //optional step to log user in after changing password
        req.session.userId = user.id;
        return { user };
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async hitlike(
        @Arg("postid", () => Int) postId: number,
        @Ctx() { req }: MyContext
    ): Promise<Boolean> {
        let inserted;
        let updated;
        try {
            inserted = await getConnection().query(
                `
                insert into reply ("postId", "userId",liked) values ($1, $2,true)
                `,
                [postId, req.session.userId]
            );
            console.log(inserted);
        } catch (err) {
            if (err) {
                console.log(err);
                return false;
            }
        }
        try {
            updated = await getConnection().query(
                `
            update post
            set likes=likes+1
            where id=$1
        `,
                [postId]
            );
            console.log(updated);
        } catch (err) {
            if (err) {
                console.log(err);
                return false;
            }
        }
        return true;
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async removelike(
        @Arg("postid", () => Int) postId: number,
        @Ctx() { req }: MyContext
    ): Promise<Boolean> {
        let deleted;
        let updated;
        try {
            deleted = await getConnection().query(
                `
                delete from reply where "postId"=$1 and "userId"=$2
                `,
                [postId, req.session.userId]
            );
            console.log(deleted);
        } catch (err) {
            if (err) {
                console.log(err);
                return false;
            }
        }
        try {
            updated = await getConnection().query(
                `
            update post
            set likes=likes-1
            where id=$1
        `,
                [postId]
            );
            console.log(updated);
        } catch (err) {
            if (err) {
                console.log(err);
                return false;
            }
        }
        return true;
    }
}
