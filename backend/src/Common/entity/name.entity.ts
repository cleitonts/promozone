import { Column } from "typeorm"
import { ObjectType, Field } from "@nestjs/graphql"

@ObjectType("Name")
export class Name {
  @Field()
  @Column()
  first!: string

  @Field()
  @Column()
  last!: string
}