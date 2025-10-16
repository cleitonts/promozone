import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsString } from 'class-validator';

@InputType('CreateTodoItem')
export class TodoItemCreateDTO {
  @IsString()
  @Field()
  title!: string;

  @IsBoolean()
  @Field()
  completed!: boolean;
}