import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CategoriesService } from './categories.service';
import { Category } from './category.entity';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/category.dto';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/authorization/guards/gql-auth.guard';

@Resolver(() => Category)
export class CategoriesResolver {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Mutation(() => Category)
  @UseGuards(GqlAuthGuard)
  createCategory(@Args('createCategoryInput') createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Query(() => [Category], { name: 'categories' })
  findAllCategories() {
    return this.categoriesService.findAll();
  }

  @Query(() => Category, { name: 'category' })
  findOneCategory(@Args('id', { type: () => Int }) id: string) {
    return this.categoriesService.findOne(id);
  }

  @Mutation(() => Category)
  @UseGuards(GqlAuthGuard)
  updateCategory(
    @Args('id', { type: () => Int }) id: string,
    @Args('updateCategoryInput') updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  removeCategory(@Args('id', { type: () => Int }) id: string) {
    return this.categoriesService.remove(id);
  }
}