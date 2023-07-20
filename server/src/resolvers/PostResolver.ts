import { Post } from "./../entities/Post";
import {
    Arg,
    Ctx,
    Int,
    Mutation,
    PubSub,
    PubSubEngine,
    Query,
    Resolver,
    ResolverFilterData,
    Root,
    Subscription,
    UseMiddleware,
} from "type-graphql";
import { getConnection } from "typeorm";
import { MyContext } from "../types";
import { isAuth } from "../middlewares/isAuth";
import { isRooms } from "../middlewares/isRooms";
import { PostResponse, PostsResponse } from "./Objecttypes/PostObject";
import { Topic } from "../Topics";
import { roomOptions } from "./Objecttypes/RoomsObject";

@Resolver(Post)
export class PostResolver {
    @Subscription(() => PostResponse, {
        topics: Topic.NewPost,
        filter: ({
            payload,
            args,
        }: ResolverFilterData<PostResponse, roomOptions>) =>
            payload?.post.roomId === args.roomId,
    })
    Postadded(
        @Arg("roomId", () => Int) roomId: number,
        @Root() payload: PostResponse
    ): PostsResponse | undefined {
        if (payload === undefined) {
            return undefined;
        }
        if (roomId !== undefined) {
            return payload;
        }
        return payload;
    }

    @Query(() => Post, { nullable: true })
    async post(@Arg("id", () => Int) id: number): Promise<Post | undefined> {
        return Post.findOne(id);
    }

    @Query(() => PostsResponse)
    @UseMiddleware(isAuth, isRooms)
    async posts(
        @Arg("limit", () => Int) limit: number,
        //@Arg("cursor", () => String, { nullable: true }) cursor: string | null,
        @Arg("roomId", () => Int) roomId: number
    ): Promise<PostsResponse> {
        const reallimit = Math.min(10, limit);

        const replacements: any[] = [];
        replacements.push(reallimit);

        //if (cursor) {
        //    replacements.push(new Date(parseInt(cursor)));
        //}  ${cursor ? `where p."createdAt"> $2` : ""}
        replacements.push(roomId);

        let posts;
        try {
            posts = await getConnection().query(
                `
            select p.*,
            json_build_object(
                'id', u.id,
                'createdAt', u."createdAt",
                'updatedAt', u."updatedAt",
                'username', u.username,
                'email', u.email
                ) creator
            from post p
            inner join public.user u on u.id=p.creatorid
            where p."roomId"=$2
            order by "createdAt" DESC
            limit $1
        `,
                replacements
            );
        } catch (err) {
            return { errors: [{ field: "posts", message: err.detail }] };
        }
        return {
            posts,
            success: [{ field: "posts", message: "Successfully queryed" }],
        };
    }

    @Mutation(() => PostResponse)
    @UseMiddleware(isAuth, isRooms)
    async createpost(
        @Arg("message", () => String) message: string,
        @Arg("roomId", () => Int) roomId: number,
        @PubSub() pubSub: PubSubEngine,
        @Ctx() { req }: MyContext
    ): Promise<PostResponse> {
        if (!roomId) {
            return {
                errors: [{ field: "Room", message: "Room id is required" }],
            };
        }
        if (message === "") {
            return {
                errors: [
                    { field: "post", message: "empty string not allowed" },
                ],
            };
        }

        let post: Post;
        let ids: number;
        try {
            const result = await getConnection()
                .createQueryBuilder()
                .insert()
                .into(Post)
                .values({
                    message: message,
                    creatorid: req.session.userId,
                    roomId: roomId,
                })
                .returning("*")
                .execute();
            ids = result.raw[0].id;
        } catch (err) {
            return {
                errors: [
                    { field: "PostError", message: "unable to create post" },
                ],
            };
        }
        try {
            const newpost = await getConnection().query(
                `
            select p.*,
            json_build_object(
                'id', u.id,
                'createdAt', u."createdAt",
                'updatedAt', u."updatedAt",
                'username', u.username,
                'email', u.email
                ) creator
            from post p
            inner join public.user u on u.id=p.creatorid
            where p.id=$1
            `,
                [ids]
            );
            post = newpost[0];
        } catch (err) {
            return {
                errors: [
                    { field: "PostError", message: "unable to create post" },
                ],
            };
        }

        await pubSub.publish(Topic.NewPost, {
            post,
            success: [{ field: "Post", message: "Successfully Found posts" }],
        });

        return {
            post,
            success: [{ field: "Post", message: "Successfully Found posts" }],
        };
    }
    @Mutation(() => Post)
    async updatepost(
        @Arg("id", () => Int) id: number,
        @Arg("message", () => String, { nullable: true }) message: string
    ): Promise<Post | undefined> {
        const post = Post.findOne(id);
        if (!post) {
            return undefined;
        }
        if (typeof message !== "undefined") {
            await Post.update({ id }, { message });
        }
        return post;
    }

    @Mutation(() => Boolean)
    async deletepost(@Arg("id", () => Int) id: number): Promise<boolean> {
        await Post.delete(id);
        return true;
    }
}
