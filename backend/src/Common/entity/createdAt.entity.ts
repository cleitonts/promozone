import { CreateDateColumn } from "typeorm"
import { ObjectType, Field, GraphQLISODateTime } from "@nestjs/graphql"

@ObjectType("Timestamps")
export class CreatedAt {
  @Field(() => GraphQLISODateTime)
  @CreateDateColumn()
  createdAt!: Date
}