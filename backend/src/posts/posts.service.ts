import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { UpdatePostRequest } from './dto/update-post.request';
import { UsersService } from 'src/users/users.service';
import { CreatePostRequest } from './dto/create-post.request';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
    private usersService: UsersService,
  ) {}

  async create(
    createPostRequest: CreatePostRequest & { authorId: string },
  ): Promise<Post> {
    const author = await this.usersService.findOne(createPostRequest.authorId);
    if (!author) {
      throw new NotFoundException('User not found');
    }
    const domain = new URL(createPostRequest.originalUrl).hostname;
    const allowedDomains = ['amazon.com'];

    if (!allowedDomains.some((d) => domain.includes(d))) {
      throw new BadRequestException('Domain not allowed');
    }

    return this.postsRepository.save({
      ...createPostRequest,
      author,
    });
  }

  findAll(): Promise<Post[]> {
    return this.postsRepository.find({ relations: ['author'] });
  }

  findOne(id: string): Promise<Post | null> {
    return this.postsRepository.findOne({
      where: { id },
      relations: ['author'],
    });
  }

  async getPostEngagement(postId: string): Promise<{ percentage: number }> {
    const post = await this.postsRepository.findOne({ where: { id: postId } });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return { percentage: post.getEngagementPercentage() };
  }

  async vote(postId: string, type: 'up' | 'down'): Promise<Post> {
    const post = await this.postsRepository.findOne({ where: { id: postId } });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    type === 'up' ? post.upvotes++ : post.downvotes++;

    return this.postsRepository.save(post);
  }

  async update(
    id: string,
    updatePostRequest: UpdatePostRequest,
  ): Promise<Post> {
    await this.postsRepository.update(id, updatePostRequest);
    const updatedPost = await this.postsRepository.findOne({ where: { id } });

    if (!updatedPost) {
      throw new NotFoundException('Post not found');
    }

    return updatedPost;
  }

  async remove(id: string): Promise<void> {
    await this.postsRepository.delete(id);
  }
}
