import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BrandsService } from './brands.service';
import { Brand } from './brand.entity';
import { CreateBrandDto, UpdateBrandDto } from './dto/brand.dto';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/authorization/guards/gql-auth.guard';

@Resolver(() => Brand)
export class BrandsResolver {
  constructor(private readonly brandsService: BrandsService) {}

  @Mutation(() => Brand)
  @UseGuards(GqlAuthGuard)
  createBrand(@Args('createBrandInput') createBrandDto: CreateBrandDto) {
    return this.brandsService.create(createBrandDto);
  }

  @Query(() => [Brand], { name: 'brands' })
  findAllBrands() {
    return this.brandsService.findAll();
  }

  @Query(() => Brand, { name: 'brand' })
  findOneBrand(@Args('id', { type: () => Int }) id: string) {
    return this.brandsService.findOne(id);
  }

  @Mutation(() => Brand)
  @UseGuards(GqlAuthGuard)
  updateBrand(
    @Args('id', { type: () => Int }) id: string,
    @Args('updateBrandInput') updateBrandDto: UpdateBrandDto,
  ) {
    return this.brandsService.update(id, updateBrandDto);
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  removeBrand(@Args('id', { type: () => Int }) id: string) {
    return this.brandsService.remove(id);
  }
}