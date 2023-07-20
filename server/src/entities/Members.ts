import { Field, ObjectType } from "type-graphql";
import {
    Entity,
    BaseEntity,
    ManyToOne,
    PrimaryColumn,
    CreateDateColumn,
} from "typeorm";
import { Rooms } from "./Rooms";
import { User } from "./User";

@ObjectType()
@Entity()
export class Members extends BaseEntity {
    @Field(() => Date)
    @CreateDateColumn()
    joined: Date;

    @Field()
    @PrimaryColumn()
    userId: number;

    @Field(() => User, { nullable: true })
    @ManyToOne(() => User, (user) => user.memberin)
    users: User;

    @Field()
    @PrimaryColumn()
    roomId: number;

    @Field(() => Rooms, { nullable: true })
    @ManyToOne(() => Rooms, (room) => room.rooms)
    room: Rooms;
}
