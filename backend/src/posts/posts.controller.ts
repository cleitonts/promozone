import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
  Req,
  NotFoundException,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guards';
import { CreatePostRequest } from './dto/create-post.request';
import { UpdatePostRequest } from './dto/update-post.request';
import { ApiRequest } from 'src/common/types/request';

@Controller({
  version: '1',
  path: 'posts',
})
@UseGuards(JwtAuthGuard, RolesGuard)
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @Roles('POST:CREATE')
  async create(
    @Body() createPostRequest: CreatePostRequest,
    @Req() req: ApiRequest,
  ) {
    return await this.postsService.create({
      ...createPostRequest,
      authorId: req.user.userId,
    });
  }

  @Get()
  @Roles('POST:READ')
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  @Roles('POST:READ')
  async findOne(@Param('id') id: string) {
    const post = await this.postsService.findOne(id);
    if (!post) {
      throw new NotFoundException('Post não encontrado');
    }
    return post;
  }

  @Put(':id')
  @Roles('POST:UPDATE')
  async update(
    @Param('id') id: string,
    @Body() updatePostRequest: UpdatePostRequest,
    @Req() req: ApiRequest,
  ) {
    const post = await this.postsService.findOne(id);
    if (!post) {
      throw new NotFoundException('Post não encontrado');
    }
    if (
      post.author.id !== req.user.userId
      // req.user.roles.includes(EUserRole.ADMIN)
    ) {
      throw new NotFoundException('Acesso negado');
    }

    return this.postsService.update(id, updatePostRequest);
  }

  @Delete(':id')
  @Roles('POST:DELETE')
  async remove(@Param('id') id: string, @Req() req: ApiRequest) {
    const post = await this.postsService.findOne(id);
    if (!post) {
      throw new NotFoundException('Post não encontrado');
    }

    // Verificar se o usuário é o autor ou admin
    if (
      post.author.id !== req.user.userId
      // req.user.roles.includes(EUserRole.ADMIN)
    ) {
      throw new NotFoundException('Acesso negado');
    }

    return this.postsService.remove(id);
  }

  @Post(':id/vote/:type')
  @Roles('POST:UPDATE')
  async vote(
    @Param('id') postId: string,
    @Param('type') voteType: 'up' | 'down',
  ) {
    return this.postsService.vote(postId, voteType);
  }

  @Get(':id/engagement')
  @Roles('POST:READ')
  async getEngagement(@Param('id') postId: string) {
    return this.postsService.getPostEngagement(postId);
  }
}
