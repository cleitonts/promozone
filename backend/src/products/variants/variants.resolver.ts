import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { VariantsService } from './variants.service';
import { ProductVariants } from './product-variants.entity';
import { CreateProductVariantDto, UpdateProductVariantDto } from './dto/product-variant.dto';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/authorization/guards/gql-auth.guard';

@Resolver(() => ProductVariants)
export class VariantsResolver {
  constructor(private readonly variantsService: VariantsService) {}

  @Mutation(() => ProductVariants)
  @UseGuards(GqlAuthGuard)
  createProductVariant(@Args('createVariantInput') createVariantDto: CreateProductVariantDto) {
    return this.variantsService.create(createVariantDto);
  }

  @Query(() => [ProductVariants], { name: 'productVariants' })
  findAllVariants() {
    return this.variantsService.findAll();
  }

  @Query(() => [ProductVariants], { name: 'productVariantsByProduct' })
  findVariantsByProduct(@Args('productId', { type: () => Int }) productId: number) {
    return this.variantsService.findByProductId(productId);
  }

  @Query(() => ProductVariants, { name: 'productVariant' })
  findOneVariant(@Args('id', { type: () => Int }) id: string) {
    return this.variantsService.findOne(id);
  }

  @Mutation(() => ProductVariants)
  @UseGuards(GqlAuthGuard)
  updateProductVariant(
    @Args('id', { type: () => Int }) id: string,
    @Args('updateVariantInput') updateVariantDto: UpdateProductVariantDto,
  ) {
    return this.variantsService.update(id, updateVariantDto);
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  removeProductVariant(@Args('id', { type: () => Int }) id: string) {
    return this.variantsService.remove(id);
  }
}