import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BrandsService } from './brands.service';
import { Brand } from './brand.entity';
import { CreateBrandDto, UpdateBrandDto } from './dto/brand.dto';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guards';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Resolver(() => Brand)
export class BrandsResolver {
  constructor(private readonly brandsService: BrandsService) {}

  @Mutation(() => Brand)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles('admin')
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
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles('admin')
  updateBrand(
    @Args('id', { type: () => Int }) id: string,
    @Args('updateBrandInput') updateBrandDto: UpdateBrandDto,
  ) {
    return this.brandsService.update(id, updateBrandDto);
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles('admin')
  removeBrand(@Args('id', { type: () => Int }) id: string) {
    return this.brandsService.remove(id);
  }
}