import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class FieldError {
    @Field()
    field: String;

    @Field()
    message: String;
}

@ObjectType()
export class Success {
    @Field()
    field: String;

    @Field()
    message: String;
}
