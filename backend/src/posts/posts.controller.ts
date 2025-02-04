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
import { EUserRole } from '../users/user-role.enum';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiResponse,
  ApiQuery,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guards';
import { CreatePostRequest } from './dto/create-post.request';
import { UpdatePostRequest } from './dto/update-post.request';
import { CreatePostResponse } from './dto/create-post.response';
import { ApiRequest } from 'src/common/types/request';
import { ErrorResponse } from 'src/common/dto/api.response';

@ApiTags('Posts')
@ApiBearerAuth()
@Controller('posts')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @ApiOperation({
    summary: 'Criar novo post',
    description: 'Cria um novo post com autenticação JWT',
  })
  @ApiResponse({
    status: 201,
    description: 'Post criado com sucesso',
    type: CreatePostResponse,
  })
  @ApiResponse({
    status: 401,
    description: 'Acesso não autorizado',
  })
  @ApiResponse({
    status: 403,
    description: 'Permissões insuficientes',
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos',
    type: ErrorResponse,
  })
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
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  @Roles(EUserRole.ADMIN, EUserRole.USER)
  @ApiOperation({ summary: 'Obter post por ID' })
  @ApiResponse({ status: 200, description: 'Post encontrado' })
  @ApiResponse({ status: 404, description: 'Post não encontrado' })
  async findOne(@Param('id') id: string) {
    const post = await this.postsService.findOne(id);
    if (!post) {
      throw new NotFoundException('Post não encontrado');
    }
    return post;
  }

  @Put(':id')
  @Roles(EUserRole.ADMIN, EUserRole.USER)
  @ApiOperation({ summary: 'Atualizar post' })
  @ApiResponse({ status: 200, description: 'Post atualizado' })
  @ApiResponse({ status: 403, description: 'Acesso negado' })
  @ApiResponse({ status: 404, description: 'Post não encontrado' })
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
      post.author.id !== req.user.userId &&
      req.user.roles.includes(EUserRole.ADMIN)
    ) {
      throw new NotFoundException('Acesso negado');
    }

    return this.postsService.update(id, updatePostRequest);
  }

  @Delete(':id')
  @Roles(EUserRole.ADMIN, EUserRole.USER)
  @ApiOperation({ summary: 'Deletar post' })
  @ApiResponse({ status: 200, description: 'Post deletado' })
  @ApiResponse({ status: 403, description: 'Acesso negado' })
  @ApiResponse({ status: 404, description: 'Post não encontrado' })
  async remove(@Param('id') id: string, @Req() req: ApiRequest) {
    const post = await this.postsService.findOne(id);
    if (!post) {
      throw new NotFoundException('Post não encontrado');
    }

    // Verificar se o usuário é o autor ou admin
    if (
      post.author.id !== req.user.userId &&
      req.user.roles.includes(EUserRole.ADMIN)
    ) {
      throw new NotFoundException('Acesso negado');
    }

    return this.postsService.remove(id);
  }

  @Post(':id/vote/:type')
  @UseGuards(JwtAuthGuard)
  async vote(
    @Param('id') postId: string,
    @Param('type') voteType: 'up' | 'down',
  ) {
    return this.postsService.vote(postId, voteType);
  }

  @Get(':id/engagement')
  async getEngagement(@Param('id') postId: string) {
    return this.postsService.getPostEngagement(postId);
  }
}
