"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResolver = void 0;
const constants_1 = require("./../constants");
const User_1 = require("../entities/User");
const type_graphql_1 = require("type-graphql");
const argon2_1 = __importDefault(require("argon2"));
const typeorm_1 = require("typeorm");
const constants_2 = require("../constants");
const uuid_1 = require("uuid");
const sendEmail_1 = require("../utils/sendEmail");
const UserObject_1 = require("./Objecttypes/UserObject");
const isAuth_1 = require("../middlewares/isAuth");
const UpdatedResponse_1 = require("./Objecttypes/matchingtypes/UpdatedResponse");
const Topics_1 = require("../Topics");
const Notifications_1 = require("../utils/Notifications");
let UserResolver = class UserResolver {
    Users() {
        return __awaiter(this, void 0, void 0, function* () {
            return User_1.User.find({});
        });
    }
    Findusers(name, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield typeorm_1.getConnection().query(`
            select * from public.user u
            where u.id <> $1
            order by levenshtein(u.username,$2) ASC
            limit 10
        `, [req.session.userId, name]);
        });
    }
    me({ req }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.session.userId) {
                return undefined;
            }
            const user = yield User_1.User.findOne({ where: { id: req.session.userId } });
            return user;
        });
    }
    onlineUsers(payload) {
        return payload;
    }
    makeFriends(userId, pubSub, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            let friend;
            let username;
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
                friend = yield typeorm_1.getConnection().query(`
            insert into user_friends_user ("userId_1","userId_2")values($1,$2)

        `, [req.session.userId, userId]);
            }
            catch (err) {
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
                username = yield (yield User_1.User.findOne({ where: { id: userId } }))
                    .username;
            }
            catch (err) {
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
            yield pubSub.publish(Topics_1.Topic.MAKE_FRIEND, Notifications_1.MakeFriendNotification(username));
            return {
                updated: true,
                success: [
                    {
                        field: "friend",
                        message: "you have succesfully made a friend",
                    },
                ],
            };
        });
    }
    deleteFriends(userId, pubSub, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            let friend;
            let username;
            try {
                friend = yield typeorm_1.getConnection().query(`
            delete from user_friends_user
            where "userId_1"=$1 and "userId_2"=$2
            `, [req.session.userId, userId]);
            }
            catch (err) {
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
                username = yield (yield User_1.User.findOne({ where: { id: userId } }))
                    .username;
            }
            catch (err) {
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
            yield pubSub.publish(Topics_1.Topic.DELETE_FRIEND, Notifications_1.DeleteFriendNotification(username));
            return {
                updated: true,
                success: [
                    {
                        field: "friend",
                        message: "you have succesfully unfriended a friend",
                    },
                ],
            };
        });
    }
    findFriends({ req }) {
        return __awaiter(this, void 0, void 0, function* () {
            const friends = yield typeorm_1.getConnection().query(`   select *
                from public.user u
                where u.id <> $1
                and exists(
                select 1
                from user_friends_user f
                where (f."userId_1" = $1 and f."userId_2" = u.id )
                or (f."userId_2" = $1 and f."userId_1" = u.id )
                ) order by u.username
            `, [req.session.userId]);
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
        });
    }
    profilePic(image, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            let user;
            const size = image.length * (3 / 4) - 2;
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
            const base64Rejex = /^(?:[A-Z0-9+\/]{4})*(?:[A-Z0-9+\/]{2}==|[A-Z0-9+\/]{3}=|[A-Z0-9+\/]{4})$/i;
            let isValid = base64Rejex.test(image);
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
                user = yield typeorm_1.getConnection().query(`
                update public.user
                set profilepic=$1
                where id=$2
                `, [image, req.session.userId]);
                console.log(user);
            }
            catch (err) {
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
        });
    }
    register(username, email, password, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
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
                            message: "username cannot have @ character because it is used in email format",
                        },
                    ],
                };
            }
            if (!email.includes("@")) {
                return {
                    errors: [
                        {
                            field: "email",
                            message: "email format is incorrect,invalid not possible",
                        },
                    ],
                };
            }
            if (email.length <= 2) {
                return {
                    errors: [
                        {
                            field: "email",
                            message: "invalid email name length too short not possible",
                        },
                    ],
                };
            }
            if (password.length < 8) {
                return {
                    errors: [
                        {
                            field: "password",
                            message: "password length must be atleast 8 characters long",
                        },
                    ],
                };
            }
            if (password.length > 100) {
                return {
                    errors: [
                        {
                            field: "password",
                            message: "password length must be not be above 100 characters long",
                        },
                    ],
                };
            }
            let user;
            const HashedPassword = yield argon2_1.default.hash(password);
            try {
                const result = yield typeorm_1.getConnection()
                    .createQueryBuilder()
                    .insert()
                    .into(User_1.User)
                    .values({
                    username: username,
                    email: email,
                    password: HashedPassword,
                })
                    .returning("*")
                    .execute();
                user = result.raw[0];
            }
            catch (err) {
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
            req.session.userId = user.id;
            return { user };
        });
    }
    login(usernameorEmail, password, pubSub, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.User.findOne(usernameorEmail.includes("@")
                ? { where: { email: usernameorEmail } }
                : { where: { username: usernameorEmail } });
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
            const valid = yield argon2_1.default.verify(user.password, password);
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
            yield pubSub.publish(Topics_1.Topic.LOGGED_IN, Notifications_1.UserOnlineNotification(user.username));
            return {
                user,
            };
        });
    }
    logout({ req, res }) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => {
                req.session.destroy((err) => {
                    res.clearCookie(constants_2.COOKIE_NAME);
                    if (err) {
                        console.log(err);
                        resolve(false);
                        return;
                    }
                    resolve(true);
                });
            });
        });
    }
    forgotPassword(email, { redis }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.User.findOne({ where: { email: email } });
            if (!user) {
                return true;
            }
            const token = uuid_1.v4();
            yield redis.set(constants_1.FORGOT_PASSWORD_PREFIX + token, user.id, "ex", 1000 * 60 * 60 * 24);
            yield sendEmail_1.sendEmail(email, `Click this link to rest your password ,the link will expire after one time use,if you didnot post this request than just ignore this link donot use it or else someoneelse can get access to your account
            <a href='http://localhost:3000/change-password/${token}'>Reset password</a>`);
            return true;
        });
    }
    changePassword(newPassword, token, { redis, req }) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = yield redis.get(constants_1.FORGOT_PASSWORD_PREFIX + token);
            if (newPassword.length < 8) {
                return {
                    errors: [
                        {
                            field: "newPassword",
                            message: "password length must be atleast 8 characters long",
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
                            message: "password length must be not be above 100 characters long",
                        },
                    ],
                };
            }
            const user = yield User_1.User.findOne({ where: { id: parseInt(userId) } });
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
            user.password = yield argon2_1.default.hash(newPassword);
            user.save();
            req.session.userId = user.id;
            return { user };
        });
    }
    hitlike(postId, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            let inserted;
            let updated;
            try {
                inserted = yield typeorm_1.getConnection().query(`
                insert into reply ("postId", "userId",liked) values ($1, $2,true)
                `, [postId, req.session.userId]);
                console.log(inserted);
            }
            catch (err) {
                if (err) {
                    console.log(err);
                    return false;
                }
            }
            try {
                updated = yield typeorm_1.getConnection().query(`
            update post
            set likes=likes+1
            where id=$1
        `, [postId]);
                console.log(updated);
            }
            catch (err) {
                if (err) {
                    console.log(err);
                    return false;
                }
            }
            return true;
        });
    }
    removelike(postId, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            let deleted;
            let updated;
            try {
                deleted = yield typeorm_1.getConnection().query(`
                delete from reply where "postId"=$1 and "userId"=$2
                `, [postId, req.session.userId]);
                console.log(deleted);
            }
            catch (err) {
                if (err) {
                    console.log(err);
                    return false;
                }
            }
            try {
                updated = yield typeorm_1.getConnection().query(`
            update post
            set likes=likes-1
            where id=$1
        `, [postId]);
                console.log(updated);
            }
            catch (err) {
                if (err) {
                    console.log(err);
                    return false;
                }
            }
            return true;
        });
    }
};
__decorate([
    type_graphql_1.Query(() => [User_1.User]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "Users", null);
__decorate([
    type_graphql_1.Query(() => [User_1.User]),
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    __param(0, type_graphql_1.Arg("name")),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "Findusers", null);
__decorate([
    type_graphql_1.Query(() => User_1.User, { nullable: true }),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "me", null);
__decorate([
    type_graphql_1.Subscription(() => UserObject_1.Notifications, {
        topics: [
            Topics_1.Topic.LOGGED_IN,
            Topics_1.Topic.LOGGED_OFF,
            Topics_1.Topic.MAKE_FRIEND,
            Topics_1.Topic.DELETE_FRIEND,
        ],
    }),
    __param(0, type_graphql_1.Root()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UserObject_1.Notifications]),
    __metadata("design:returntype", UserObject_1.Notifications)
], UserResolver.prototype, "onlineUsers", null);
__decorate([
    type_graphql_1.Mutation(() => UpdatedResponse_1.boolResponse),
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    __param(0, type_graphql_1.Arg("userId", () => type_graphql_1.Int)),
    __param(1, type_graphql_1.PubSub()),
    __param(2, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, type_graphql_1.PubSubEngine, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "makeFriends", null);
__decorate([
    type_graphql_1.Mutation(() => UpdatedResponse_1.boolResponse),
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    __param(0, type_graphql_1.Arg("userId", () => type_graphql_1.Int)),
    __param(1, type_graphql_1.PubSub()),
    __param(2, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, type_graphql_1.PubSubEngine, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "deleteFriends", null);
__decorate([
    type_graphql_1.Query(() => UserObject_1.UsersResponse, { nullable: true }),
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "findFriends", null);
__decorate([
    type_graphql_1.Mutation(() => UpdatedResponse_1.boolResponse),
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    __param(0, type_graphql_1.Arg("image")),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "profilePic", null);
__decorate([
    type_graphql_1.Mutation(() => UserObject_1.UserResponse),
    __param(0, type_graphql_1.Arg("username")),
    __param(1, type_graphql_1.Arg("email")),
    __param(2, type_graphql_1.Arg("password")),
    __param(3, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "register", null);
__decorate([
    type_graphql_1.Mutation(() => UserObject_1.UserResponse),
    __param(0, type_graphql_1.Arg("usernameorEmail")),
    __param(1, type_graphql_1.Arg("password")),
    __param(2, type_graphql_1.PubSub()),
    __param(3, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, type_graphql_1.PubSubEngine, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "login", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "logout", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg("email", () => String)),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "forgotPassword", null);
__decorate([
    type_graphql_1.Mutation(() => UserObject_1.UserResponse),
    __param(0, type_graphql_1.Arg("newPassword", () => String)),
    __param(1, type_graphql_1.Arg("token", () => String)),
    __param(2, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "changePassword", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    __param(0, type_graphql_1.Arg("postid", () => type_graphql_1.Int)),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "hitlike", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    __param(0, type_graphql_1.Arg("postid", () => type_graphql_1.Int)),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "removelike", null);
UserResolver = __decorate([
    type_graphql_1.Resolver()
], UserResolver);
exports.UserResolver = UserResolver;
//# sourceMappingURL=UserResolver.js.map