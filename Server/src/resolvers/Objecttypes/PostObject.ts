import { Post } from "../../entities/Post";
import { ObjectType, Field } from "type-graphql";
import { Success, FieldError } from "./matchingtypes/FieldError";

@ObjectType()
export class PostResponse {
    @Field(() => [Success], { nullable: true })
    success?: Success[];

    @Field(() => Post, { nullable: true })
    post?: Post;

    @Field(() => [FieldError], { nullable: true })
    errors?: FieldError[];
}

@ObjectType()
export class PostsResponse {
    @Field(() => [Success], { nullable: true })
    success?: Success[];

    @Field(() => [Post], { nullable: true })
    posts?: Post[];

    @Field(() => [FieldError], { nullable: true })
    errors?: FieldError[];
}
