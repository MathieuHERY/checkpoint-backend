import {
    BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn,
  } from "typeorm";
  import { Field, ID, InputType, ObjectType } from "type-graphql";
  
  @Entity()
  @ObjectType()
  export class Country extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id!: number;
  
    @Column()
    @Field()
    code!: string;

    @Column()
    @Field()
    name!: string;

    @Column()
    @Field()
    emoji!: string;

    @Column({nullable:true})
    @Field()
    continent!: string;
  }
  
  @InputType()
  export class InputCountry {
    @Field()
    code!: string;
    @Field()
    name!: string;
    @Field()
    emoji!: string;
    @Field()
    continent!: string;
  }
  