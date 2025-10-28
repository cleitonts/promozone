import { Field, InputType } from '@nestjs/graphql'
import { IsString, IsEmail } from 'class-validator'

@InputType('LoginInput')
export class LoginInputDTO {
  @Field()
  @IsEmail()
  email!: string

  @Field()
  @IsString()
  password!: string
}