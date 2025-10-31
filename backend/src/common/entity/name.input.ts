import { InputType, Field } from '@nestjs/graphql'
import { IsString } from 'class-validator'

@InputType('NameInput')
export class NameInput {
  @IsString()
  @Field()
  first!: string

  @IsString()
  @Field()
  last!: string
}