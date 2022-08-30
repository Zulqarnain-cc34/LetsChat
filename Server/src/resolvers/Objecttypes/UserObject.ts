import { User } from "../../entities/User";
import { ObjectType, Field } from "type-graphql";
import { FieldError, Success } from "./matchingtypes/FieldError";
@ObjectType()
export class UserResponse {
    @Field(() => [Success], { nullable: true })
    success?: Success[];

    @Field(() => [FieldError], { nullable: true })
    errors?: FieldError[];

    @Field(() => User, { nullable: true })
    user?: User;
}

@ObjectType()
export class UsersResponse {
    @Field(() => [Success], { nullable: true })
    success?: Success[];

    @Field(() => [FieldError], { nullable: true })
    errors?: FieldError[];

    @Field(() => [User], { nullable: true })
    users?: User[];
}

@ObjectType()
export class Notifications {
    @Field(() => String, { nullable: true })
    notifier?: string;

    @Field(() => String, { nullable: true })
    message?: string;
}
