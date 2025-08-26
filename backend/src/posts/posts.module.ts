import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsService } from './posts.service';

import { PostsResolver } from './posts.resolver';
import { Post } from './post.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Post]), UsersModule],

  providers: [PostsService, PostsResolver],
  exports: [PostsService],
})
export class PostsModule {}
