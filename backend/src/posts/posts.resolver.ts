import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { UseGuards, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PostsService } from './posts.service';
import { Post } from './post.entity';
import { CreatePostRequest } from './dto/create-post.request';
import { UpdatePostRequest } from './dto/update-post.request';
import { JwtAuthGuard } from '../authorization/guards/jwt-auth.guard';
import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class EngagementResponse {
  @Field(() => Int)
  percentage: number;
}

@ObjectType()
export class VoteResponse {
  @Field(() => Int)
  upvotes: number;

  @Field(() => Int)
  downvotes: number;
}

@Resolver(() => Post)
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {}

  @Mutation(() => Post)
  @UseGuards(JwtAuthGuard)
  async createPost(
    @Args('createPostInput') createPostInput: CreatePostRequest,
    @Context() context: any,
  ): Promise<Post> {
    const userId = context.req.user.userId;
    return await this.postsService.create({
      ...createPostInput,
      authorId: userId,
    });
  }

  @Query(() => [Post])
  @UseGuards(JwtAuthGuard)
  async findAllPosts(): Promise<Post[]> {
    return this.postsService.findAll();
  }

  @Query(() => Post)
  @UseGuards(JwtAuthGuard)
  async findOnePost(@Args('id') id: string): Promise<Post> {
    const post = await this.postsService.findOne(id);
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    return post;
  }

  @Mutation(() => Post)
  @UseGuards(JwtAuthGuard)
  async updatePost(
    @Args('id') id: string,
    @Args('updatePostInput') updatePostInput: UpdatePostRequest,
    @Context() context: any,
  ): Promise<Post> {
    const userId = context.req.user.userId;
    const post = await this.postsService.findOne(id);
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    if (post.author.id !== userId) {
      throw new ForbiddenException('Access denied');
    }
    return this.postsService.update(id, updatePostInput);
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtAuthGuard)
  async removePost(
    @Args('id') id: string,
    @Context() context: any,
  ): Promise<boolean> {
    const userId = context.req.user.userId;
    const post = await this.postsService.findOne(id);
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    if (post.author.id !== userId) {
      throw new ForbiddenException('Access denied');
    }
    await this.postsService.remove(id);
    return true;
  }

  @Mutation(() => VoteResponse)
  @UseGuards(JwtAuthGuard)
  async votePost(
    @Args('postId') postId: string,
    @Args('voteType') voteType: string,
  ): Promise<VoteResponse> {
    if (voteType !== 'up' && voteType !== 'down') {
      throw new Error('Vote type must be "up" or "down"');
    }
    return this.postsService.vote(postId, voteType as 'up' | 'down');
  }

  @Query(() => EngagementResponse)
  @UseGuards(JwtAuthGuard)
  async getPostEngagement(@Args('postId') postId: string): Promise<EngagementResponse> {
    return await this.postsService.getPostEngagement(postId);
  }
}