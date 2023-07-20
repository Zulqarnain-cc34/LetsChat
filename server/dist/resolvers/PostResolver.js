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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostResolver = void 0;
const Post_1 = require("./../entities/Post");
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const isAuth_1 = require("../middlewares/isAuth");
const isRooms_1 = require("../middlewares/isRooms");
const PostObject_1 = require("./Objecttypes/PostObject");
const Topics_1 = require("../Topics");
let PostResolver = class PostResolver {
    Postadded(roomId, payload) {
        if (payload === undefined) {
            return undefined;
        }
        if (roomId !== undefined) {
            return payload;
        }
        return payload;
    }
    post(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return Post_1.Post.findOne(id);
        });
    }
    posts(limit, roomId) {
        return __awaiter(this, void 0, void 0, function* () {
            const reallimit = Math.min(10, limit);
            const replacements = [];
            replacements.push(reallimit);
            replacements.push(roomId);
            let posts;
            try {
                posts = yield typeorm_1.getConnection().query(`
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
        `, replacements);
            }
            catch (err) {
                return { errors: [{ field: "posts", message: err.detail }] };
            }
            return {
                posts,
                success: [{ field: "posts", message: "Successfully queryed" }],
            };
        });
    }
    createpost(message, roomId, pubSub, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
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
            let post;
            let ids;
            try {
                const result = yield typeorm_1.getConnection()
                    .createQueryBuilder()
                    .insert()
                    .into(Post_1.Post)
                    .values({
                    message: message,
                    creatorid: req.session.userId,
                    roomId: roomId,
                })
                    .returning("*")
                    .execute();
                ids = result.raw[0].id;
            }
            catch (err) {
                return {
                    errors: [
                        { field: "PostError", message: "unable to create post" },
                    ],
                };
            }
            try {
                const newpost = yield typeorm_1.getConnection().query(`
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
            `, [ids]);
                post = newpost[0];
            }
            catch (err) {
                return {
                    errors: [
                        { field: "PostError", message: "unable to create post" },
                    ],
                };
            }
            yield pubSub.publish(Topics_1.Topic.NewPost, {
                post,
                success: [{ field: "Post", message: "Successfully Found posts" }],
            });
            return {
                post,
                success: [{ field: "Post", message: "Successfully Found posts" }],
            };
        });
    }
    updatepost(id, message) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = Post_1.Post.findOne(id);
            if (!post) {
                return undefined;
            }
            if (typeof message !== "undefined") {
                yield Post_1.Post.update({ id }, { message });
            }
            return post;
        });
    }
    deletepost(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Post_1.Post.delete(id);
            return true;
        });
    }
};
__decorate([
    type_graphql_1.Subscription(() => PostObject_1.PostResponse, {
        topics: Topics_1.Topic.NewPost,
        filter: ({ payload, args, }) => (payload === null || payload === void 0 ? void 0 : payload.post.roomId) === args.roomId,
    }),
    __param(0, type_graphql_1.Arg("roomId", () => type_graphql_1.Int)),
    __param(1, type_graphql_1.Root()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, PostObject_1.PostResponse]),
    __metadata("design:returntype", PostObject_1.PostsResponse)
], PostResolver.prototype, "Postadded", null);
__decorate([
    type_graphql_1.Query(() => Post_1.Post, { nullable: true }),
    __param(0, type_graphql_1.Arg("id", () => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "post", null);
__decorate([
    type_graphql_1.Query(() => PostObject_1.PostsResponse),
    type_graphql_1.UseMiddleware(isAuth_1.isAuth, isRooms_1.isRooms),
    __param(0, type_graphql_1.Arg("limit", () => type_graphql_1.Int)),
    __param(1, type_graphql_1.Arg("roomId", () => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "posts", null);
__decorate([
    type_graphql_1.Mutation(() => PostObject_1.PostResponse),
    type_graphql_1.UseMiddleware(isAuth_1.isAuth, isRooms_1.isRooms),
    __param(0, type_graphql_1.Arg("message", () => String)),
    __param(1, type_graphql_1.Arg("roomId", () => type_graphql_1.Int)),
    __param(2, type_graphql_1.PubSub()),
    __param(3, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, type_graphql_1.PubSubEngine, Object]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "createpost", null);
__decorate([
    type_graphql_1.Mutation(() => Post_1.Post),
    __param(0, type_graphql_1.Arg("id", () => type_graphql_1.Int)),
    __param(1, type_graphql_1.Arg("message", () => String, { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "updatepost", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg("id", () => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "deletepost", null);
PostResolver = __decorate([
    type_graphql_1.Resolver(Post_1.Post)
], PostResolver);
exports.PostResolver = PostResolver;
//# sourceMappingURL=PostResolver.js.map