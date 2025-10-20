import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class ResolverOperationDTO {
  @Field({ nullable: true })
  moduleName?: string

  @Field()
  resolverClass!: string

  @Field({ nullable: true })
  resolverName?: string

  @Field()
  methodName!: string

  @Field()
  schemaName!: string

  @Field()
  type!: string

  @Field()
  requiresAuth!: boolean
}