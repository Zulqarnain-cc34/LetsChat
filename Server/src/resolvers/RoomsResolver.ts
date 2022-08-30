import { isAuth } from "./../middlewares/isAuth";
import { Rooms } from "../entities/Rooms";
import {
    Arg,
    Ctx,
    Query,
    Mutation,
    Resolver,
    UseMiddleware,
    Int,
} from "type-graphql";
import { MyContext } from "../types";
import { getConnection } from "typeorm";
import { User } from "../entities/User";
import { RoomResponse } from "./Objecttypes/RoomsObject";
import { MembersResponse } from "./Objecttypes/MembersObject";
import { boolResponse } from "./Objecttypes/matchingtypes/UpdatedResponse";
@Resolver(Rooms)
export class RoomResolver {
    //@Subscription(() => [Post], {
    //    topics: Topic.GET_ROOM_MESSAGES,
    //    filter: ({ payload, args }: ResolverFilterData<Post, roomOptions>) =>
    //        payload.roomId === args.roomId,
    //})
    //getRoomPost(
    //    @Arg("roomId") roomId: number,
    //    @Root() payload: Post[] | Post
    //): Post[] | Post {
    //    console.log(roomId);
    //    return payload;
    //}
    @Query(() => [Rooms])
    async Rooms(): Promise<Rooms[]> {
        return await Rooms.find({});
    }

    @Query(() => MembersResponse)
    @UseMiddleware(isAuth)
    async getRoom(
        @Arg("limit", () => Int) limit: number,
        @Arg("bilateral", () => Boolean) bilateral: boolean,
        @Ctx() { req }: MyContext
    ): Promise<MembersResponse> {
        let rooms;
        console.log(limit);
        //const reallimit = Math.min(limit, 25);

        try {
            rooms = await getConnection().query(
                `
            select m."userId",m."roomId",m.joined,
                json_build_object(
                    'id', r.id,
                    'createdAt', r."createdAt",
                    'updatedAt', r."updatedAt",
                    'adminId',   r."adminId",
                    'Roomname',   r."Roomname",
                    'members',    r.members
                    )   room
                    from members m
                    inner join
                            public.user u on m."userId"=u.id
                    inner join
                            rooms r on m."roomId"=r.id
                    where m."userId"=$1 and r.bilateral=$2`,
                [req.session.userId, bilateral]
            );
            console.log(rooms);
        } catch (error) {
            if (error.code === "23505") {
                return {
                    errors: [
                        { field: "DuplicateError", message: error.detail },
                    ],
                };
            } else {
                return {
                    errors: [{ field: "Error", message: error.detail }],
                };
            }
        }
        //if (cursor) {
        //    qb.andWhere('"createdAt" > :cursor ', {
        //        cursor: new Date(parseInt(cursor)),
        //    });
        //}
        return {
            rooms: rooms,
            success: [{ field: "Rooms", message: "Rooms successfully found" }],
        };
    }

    @Mutation(() => boolResponse)
    @UseMiddleware(isAuth)
    async leaveRoom(
        @Arg("roomId", () => Int) roomId: number,
        @Arg("bilateralRoom", () => Boolean) bRoom: boolean,

        @Ctx() { req }: MyContext
    ): Promise<boolResponse> {
        if (!roomId) {
            return {
                updated: false,
                errors: [{ field: "Args", message: "roomId is required" }],
            };
        }

        try {
            const deletedArray = [
                bRoom ? req.session.userId : req.session.userId,
                roomId,
            ];
            const deleted = await getConnection().query(
                bRoom
                    ? `
                    delete from members m where m."roomId" = $2
                    `
                    : `
                    delete from members m where m."userId" = $1 and m."roomId" = $2
                    `,
                deletedArray
            );
            console.log(deleted);

            if (bRoom) {
                await getConnection().query(
                    `
                    delete from rooms r where r.id=$1
                    `,
                    [roomId]
                );
            }
        } catch (err) {
            if (err) {
                console.log(err);
                return {
                    updated: false,
                    errors: [
                        {
                            field: "DeletionError",
                            message: `Unable to delete ${err.detail}`,
                        },
                    ],
                };
            }
        }

        return {
            updated: true,
            success: [
                { field: "Rooms", message: "Rooms successfully removed" },
            ],
        };
    }

    @Mutation(() => boolResponse)
    @UseMiddleware(isAuth)
    async updateRoom(
        @Arg("prevname", () => String) prevname: string,
        @Arg("newname", () => String) newname: string,

        @Ctx() { req }: MyContext
    ): Promise<boolResponse> {
        const user = await User.findOne({ where: { id: req.session.userId } });

        if (newname.length > 100) {
            return {
                errors: [
                    {
                        field: "RoomName",
                        message: "Name is too long more than 100 characters",
                    },
                ],
            };
        }

        if (!user) {
            return {
                errors: [
                    {
                        field: "User",
                        message: "User doesnot exist",
                    },
                ],
            };
        }
        try {
            const updateResult = await Rooms.update(
                { adminId: user.id, Roomname: prevname },
                { Roomname: newname }
            );

            if (updateResult.affected === 1) {
                return {
                    updated: true,
                    success: [
                        {
                            field: "RoomName",
                            message: "Succesfully updated Roomname",
                        },
                    ],
                };
            }
        } catch (error) {
            if (error.code === "23505") {
                return {
                    errors: [
                        {
                            field: "Duplicate name",
                            message: error.detail,
                        },
                    ],
                };
            } else {
                return {
                    errors: [
                        {
                            field: "Error",
                            message: error.detail,
                        },
                    ],
                };
            }
        }

        return {
            errors: [
                {
                    field: "RoomName",
                    message: "Unsuccessful,Room name not updated",
                },
            ],
        };
    }
    @Mutation(() => boolResponse)
    async deleteRoom(
        @Arg("name", () => String) name: string,
        @Ctx() { req }: MyContext
    ): Promise<boolResponse> {
        const deleteResult = await Rooms.delete({
            adminId: req.session.userId,
            Roomname: name,
        });

        if (deleteResult.affected == 1) {
            return {
                updated: true,
                success: [
                    { field: "Rooms", message: "Room deleted successfully" },
                ],
            };
        }

        return {
            errors: [{ field: "Rooms", message: "Room deletion unsuccessful" }],
        };
    }

    @Mutation(() => boolResponse)
    @UseMiddleware(isAuth)
    async joinRoom(
        @Arg("roomId", () => Int) roomid: number,
        @Ctx() { req }: MyContext
    ): Promise<boolResponse> {
        try {
            await getConnection().query(
                `
            insert into members("userId","roomId")values($1,$2)
        `,
                [req.session.userId, roomid]
            );
        } catch (error) {
            if (error.code === "23505") {
                return {
                    updated: false,
                    errors: [
                        {
                            field: "Rooms",
                            message:
                                "duplicate key error user already a member of the group",
                        },
                    ],
                };
            } else {
                return {
                    updated: false,
                    errors: [
                        { field: "insertionError", message: error.detail },
                    ],
                };
            }
        }

        try {
            await getConnection().query(
                `
                    update rooms
                    set members=members+1
                    where id=$1
                `,
                [roomid]
            );
        } catch (error) {
            return {
                updated: false,
                errors: [{ field: "updationError", message: error.detail }],
            };
        }

        return {
            updated: true,
            success: [{ field: "Rooms", message: "Successfully joined room" }],
        };
    }

    @Mutation(() => RoomResponse)
    async createRoom(
        @Arg("name", () => String) name: string,
        @Ctx() { req }: MyContext
    ): Promise<RoomResponse> {
        if (name.length > 100) {
            return {
                errors: [
                    {
                        field: "Name",
                        message: "Name is too long more than 100 characters",
                    },
                ],
            };
        }

        let room;
        try {
            const result = await getConnection()
                .createQueryBuilder()
                .insert()
                .into(Rooms)
                .values({
                    Roomname: name,
                    adminId: req.session.userId,
                })
                .returning("*")
                .execute();

            room = result.raw[0];
            console.log(room);
        } catch (error) {
            if (error.code === "23505") {
                return {
                    errors: [
                        {
                            field: "Duplicate name",
                            message: error.detail,
                        },
                    ],
                };
            } else {
                return {
                    errors: [{ field: "Error", message: error.detail }],
                };
            }
        }
        if (room) {
            try {
                await getConnection().query(
                    `
            insert into members("userId","roomId")values($1,$2)
        `,
                    [req.session.userId, room.id]
                );
            } catch (err) {
                return {
                    errors: [{ field: "InsertionError", message: err.detail }],
                };
            }
            return { rooms: room };
        }

        return {
            errors: [
                {
                    field: "RoomCreation",
                    message: "Room unable to create",
                },
            ],
        };
    }

    @Mutation(() => boolResponse)
    async createBilateralRoom(
        @Arg("fname", () => String) fname: string,
        @Arg("fid", () => Int) fid: number,
        @Ctx() { req }: MyContext
    ): Promise<boolResponse> {
        if (fname.length > 100) {
            return {
                errors: [
                    {
                        field: "fname",
                        message:
                            "Friend Name is too long more than 100 characters",
                    },
                ],
            };
        }

        let isUser;
        try {
            isUser = await getConnection().query(
                `
                    select exists(
                    select id from public."user" u
                    where u.id=$1 and u.username=$2
                )
                `,
                [fid, fname]
            );
            console.log(isUser);
        } catch (err) {
            return {
                errors: [
                    {
                        field: "Friend",
                        message: "Friend Checking error",
                    },
                ],
            };
        }

        if (isUser) {
            let room;

            try {
                const result = await getConnection()
                    .createQueryBuilder()
                    .insert()
                    .into(Rooms)
                    .values({
                        Roomname: fname,
                        adminId: req.session.userId,
                        bilateral: true,
                    })
                    .returning("*")
                    .execute();

                room = result.raw[0];
                console.log(room);
            } catch (error) {
                if (error.code === "23505") {
                    return {
                        errors: [
                            {
                                field: "Duplicate name",
                                message: error.detail,
                            },
                        ],
                    };
                } else {
                    return {
                        errors: [{ field: "Error", message: error.detail }],
                    };
                }
            }

            try {
                await getConnection().query(
                    `
                        insert into members("userId","roomId")values($1,$2)
                        `,
                    [req.session.userId, room.id]
                );
            } catch (err) {
                return {
                    errors: [{ field: "InsertionError", message: err.detail }],
                };
            }

            try {
                await getConnection().query(
                    `
                    insert into members("userId","roomId")values($1,$2)
                    `,
                    [fid, room.id]
                );
            } catch (err) {
                return {
                    errors: [{ field: "InsertionError", message: err.detail }],
                };
            }

            return { updated: true };
        }

        return {
            errors: [
                {
                    field: "RoomCreation",
                    message: "Room unable to create",
                },
            ],
        };
    }
}
