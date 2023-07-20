import { Rooms } from "../../entities/Rooms";
import { ObjectType, Field } from "type-graphql";
import { FieldError, Success } from "./matchingtypes/FieldError";

@ObjectType()
export class RoomsResponse {
    @Field(() => [Success], { nullable: true })
    success?: Success[];

    @Field(() => [Rooms], { nullable: true })
    rooms?: Rooms[];

    @Field(() => [FieldError], { nullable: true })
    errors?: FieldError[];
}

@ObjectType()
export class RoomResponse {
    @Field(() => [Success], { nullable: true })
    success?: Success[];

    @Field(() => Rooms, { nullable: true })
    rooms?: Rooms;

    @Field(() => [FieldError], { nullable: true })
    errors?: FieldError[];
}

export interface roomOptions {
    roomId: number;
}
