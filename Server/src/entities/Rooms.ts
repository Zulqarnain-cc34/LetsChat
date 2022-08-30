import { Field, ID, ObjectType } from "type-graphql";

import {
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    BaseEntity,
    Column,
    OneToMany,
    //ManyToMany,
} from "typeorm";
import { Members } from "./Members";
//import { UsersID } from "./UsersID";

@ObjectType()
@Entity()
export class Rooms extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id!: number;

    @Field(() => String)
    @CreateDateColumn()
    createdAt = new Date();

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt = Date();

    @Field(() => String)
    @Column({ unique: true })
    Roomname!: string;

    @Field(() => Boolean)
    @Column({ default: false })
    bilateral!: boolean;

    @Field(() => ID)
    @Column({ type: "int" })
    adminId!: number;

    @OneToMany(() => Members, (member) => member.room)
    rooms: Members[];

    @Field()
    @Column({ type: "int", default: 1 })
    members: number;

    //@Field(() => UsersID)
    //@ManyToMany(() => UsersID, (usersId) => usersId.room)
    ////@JoinTable()
    //users: UsersID[];

    //@Field(() => User)
    //@OneToMany(() => User, (user) => user.room)
    //user: UsersID;

    //@Field(() => User, { nullable: true })
    //@ManyToOne(() => User, (user) => user.roomsjoined)
    //user: User;
}
