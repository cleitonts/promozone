import { PartialType } from '@nestjs/graphql';
import { CreatePostRequest } from './create-post.request';
import { InputType } from '@nestjs/graphql';

@InputType()
export class UpdatePostRequest extends PartialType(CreatePostRequest) {}
