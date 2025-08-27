import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProductVariantAttributesService } from './product-variant-attributes.service';
import { ProductVariantAttribute } from './product-variant-attribute.entity';
import { CreateProductVariantAttributeDto, UpdateProductVariantAttributeDto } from './dto/product-variant-attribute.dto';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guards';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Resolver(() => ProductVariantAttribute)
export class ProductVariantAttributesResolver {
  constructor(private readonly productVariantAttributesService: ProductVariantAttributesService) {}

  @Mutation(() => ProductVariantAttribute)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles('admin')
  createProductVariantAttribute(@Args('createProductVariantAttributeInput') createProductVariantAttributeDto: CreateProductVariantAttributeDto) {
    return this.productVariantAttributesService.create(createProductVariantAttributeDto);
  }

  @Query(() => [ProductVariantAttribute], { name: 'productVariantAttributes' })
  findAllProductVariantAttributes() {
    return this.productVariantAttributesService.findAll();
  }

  @Query(() => [ProductVariantAttribute], { name: 'productVariantAttributesByVariant' })
  findProductVariantAttributesByVariant(@Args('variantId', { type: () => Int }) variantId: number) {
    return this.productVariantAttributesService.findByVariant(variantId);
  }

  @Query(() => [ProductVariantAttribute], { name: 'productVariantAttributesByAttribute' })
  findProductVariantAttributesByAttribute(@Args('attributeId', { type: () => Int }) attributeId: number) {
    return this.productVariantAttributesService.findByAttribute(attributeId);
  }

  @Query(() => ProductVariantAttribute, { name: 'productVariantAttribute' })
  findOneProductVariantAttribute(@Args('id', { type: () => Int }) id: string) {
    return this.productVariantAttributesService.findOne(id);
  }

  @Mutation(() => ProductVariantAttribute)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles('admin')
  updateProductVariantAttribute(
    @Args('id', { type: () => Int }) id: string,
    @Args('updateProductVariantAttributeInput') updateProductVariantAttributeDto: UpdateProductVariantAttributeDto,
  ) {
    return this.productVariantAttributesService.update(id, updateProductVariantAttributeDto);
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles('admin')
  removeProductVariantAttribute(@Args('id', { type: () => Int }) id: string) {
    return this.productVariantAttributesService.remove(id);
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles('admin')
  removeProductVariantAttributesByVariant(@Args('variantId', { type: () => Int }) variantId: number) {
    return this.productVariantAttributesService.removeByVariant(variantId);
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles('admin')
  removeProductVariantAttributeByVariantAndAttribute(
    @Args('variantId', { type: () => Int }) variantId: number,
    @Args('attributeId', { type: () => Int }) attributeId: number,
  ) {
    return this.productVariantAttributesService.removeByVariantAndAttribute(variantId, attributeId);
  }
}