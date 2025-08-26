import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { UseGuards, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PostsService } from './posts.service';
import { Post } from './post.entity';
import { CreatePostRequest } from './dto/create-post.request';
import { UpdatePostRequest } from './dto/update-post.request';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guards';
import { Roles } from '../auth/decorators/roles.decorator';
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
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('POST:CREATE')
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
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('POST:READ')
  async findAllPosts(): Promise<Post[]> {
    return this.postsService.findAll();
  }

  @Query(() => Post)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('POST:READ')
  async findOnePost(@Args('id') id: string): Promise<Post> {
    const post = await this.postsService.findOne(id);
    if (!post) {
      throw new NotFoundException('Post não encontrado');
    }
    return post;
  }

  @Mutation(() => Post)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('POST:UPDATE')
  async updatePost(
    @Args('id') id: string,
    @Args('updatePostInput') updatePostInput: UpdatePostRequest,
    @Context() context: any,
  ): Promise<Post> {
    const userId = context.req.user.userId;
    const post = await this.postsService.findOne(id);
    if (!post) {
      throw new NotFoundException('Post não encontrado');
    }
    if (post.author.id !== userId) {
      throw new ForbiddenException('Acesso negado');
    }
    return this.postsService.update(id, updatePostInput);
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('POST:DELETE')
  async removePost(
    @Args('id') id: string,
    @Context() context: any,
  ): Promise<boolean> {
    const userId = context.req.user.userId;
    const post = await this.postsService.findOne(id);
    if (!post) {
      throw new NotFoundException('Post não encontrado');
    }
    if (post.author.id !== userId) {
      throw new ForbiddenException('Acesso negado');
    }
    await this.postsService.remove(id);
    return true;
  }

  @Mutation(() => VoteResponse)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('POST:UPDATE')
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
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('POST:READ')
  async getPostEngagement(@Args('postId') postId: string): Promise<EngagementResponse> {
    return await this.postsService.getPostEngagement(postId);
  }
}