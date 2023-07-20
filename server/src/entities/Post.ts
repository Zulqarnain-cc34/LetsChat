import { Field, ID, ObjectType } from "type-graphql";
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    BaseEntity,
    ManyToOne,
} from "typeorm";
import { User } from "./User";

@ObjectType()
@Entity()
export class Post extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id!: number;

    @Field(() => Date)
    @CreateDateColumn()
    createdAt = new Date();

    @Field(() => Date)
    @UpdateDateColumn()
    updatedAt = Date();

    @Field()
    @ManyToOne(() => User, (user) => user.posts)
    creator: User;

    @Field(() => ID)
    @Column()
    roomId: number;

    @Field()
    @Column({ type: "int", default: 0 })
    likes: number;

    @Field(() => String)
    @Column()
    message!: string;

    @Field(() => ID)
    @Column()
    creatorid: number;
}
