import { ObjectType, Field } from "type-graphql";
import { Success, FieldError } from "./matchingtypes/FieldError";
import { Members } from "../../entities/Members";

@ObjectType()
export class MemberResponse {
    @Field(() => [Success], { nullable: true })
    success?: Success[];

    @Field(() => [FieldError], { nullable: true })
    errors?: FieldError[];

    @Field(() => Members, { nullable: true })
    rooms?: Members;
}
@ObjectType()
export class MembersResponse {
    @Field(() => [Success], { nullable: true })
    success?: Success[];

    @Field(() => [FieldError], { nullable: true })
    errors?: FieldError[];

    @Field(() => [Members], { nullable: true })
    rooms?: Members[];
}
