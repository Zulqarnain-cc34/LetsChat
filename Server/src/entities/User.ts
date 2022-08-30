import { Field, ID, ObjectType } from "type-graphql";
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import { Members } from "./Members";
import { Post } from "./Post";
@ObjectType()
@Entity()
export class User extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id!: number;

    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date;

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt: Date;

    @Field(() => String)
    @Column({ unique: true })
    username!: string;

    @Field(() => String)
    @Column({ unique: true })
    email!: string;
    //
    @Column({ unique: true })
    password!: string;

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    profilepic?: String;

    @OneToMany(() => Post, (post) => post.creator)
    posts: Post[];

    @ManyToMany(() => User)
    @JoinTable()
    friends: User[];

    @OneToMany(() => Members, (member) => member.users)
    memberin: Members[];
    //@ManyToOne(() => Post, (post) => post.readers)
    ////reader: Post;

    //@Field()
    //@ManyToOne(() => Rooms, (room) => room.users)
    //room: Rooms;

    //@Field(() => [jsonObject])
    //@Column("simple-json", { array: true, nullable: true, default: {} })
    //roomsjoined!: jsonObject[];

    //@OneToMany(() => Rooms, (room) => room.users)
    //room: Rooms;
}
