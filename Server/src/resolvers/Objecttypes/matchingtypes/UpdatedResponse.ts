import { ObjectType, Field } from "type-graphql";
import { Success, FieldError } from "./FieldError";

@ObjectType()
export class boolResponse {
    @Field(() => [Success], { nullable: true })
    success?: Success[];

    @Field(() => Boolean, { nullable: true })
    updated?: boolean;

    @Field(() => [FieldError], { nullable: true })
    errors?: FieldError[];
}
