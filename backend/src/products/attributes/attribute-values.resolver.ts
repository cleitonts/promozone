import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AttributeValuesService } from './attribute-values.service';
import { AttributeValue } from './attribute-value.entity';
import { CreateAttributeValueDto, UpdateAttributeValueDto } from './dto/attribute-value.dto';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guards';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Resolver(() => AttributeValue)
export class AttributeValuesResolver {
  constructor(private readonly attributeValuesService: AttributeValuesService) {}

  @Mutation(() => AttributeValue)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles('admin')
  createAttributeValue(@Args('createAttributeValueInput') createAttributeValueDto: CreateAttributeValueDto) {
    return this.attributeValuesService.create(createAttributeValueDto);
  }

  @Query(() => [AttributeValue], { name: 'attributeValues' })
  findAllAttributeValues() {
    return this.attributeValuesService.findAll();
  }

  @Query(() => [AttributeValue], { name: 'attributeValuesByAttribute' })
  findAttributeValuesByAttribute(@Args('attributeId', { type: () => Int }) attributeId: number) {
    return this.attributeValuesService.findByAttribute(attributeId);
  }

  @Query(() => AttributeValue, { name: 'attributeValue' })
  findOneAttributeValue(@Args('id', { type: () => Int }) id: string) {
    return this.attributeValuesService.findOne(id);
  }

  @Mutation(() => AttributeValue)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles('admin')
  updateAttributeValue(
    @Args('id', { type: () => Int }) id: string,
    @Args('updateAttributeValueInput') updateAttributeValueDto: UpdateAttributeValueDto,
  ) {
    return this.attributeValuesService.update(id, updateAttributeValueDto);
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles('admin')
  removeAttributeValue(@Args('id', { type: () => Int }) id: string) {
    return this.attributeValuesService.remove(id);
  }
}