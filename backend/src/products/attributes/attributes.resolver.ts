import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AttributesService } from './attributes.service';
import { Attribute } from './attribute.entity';
import { CreateAttributeDto, UpdateAttributeDto } from './dto/attribute.dto';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/authorization/guards/gql-auth.guard';

@Resolver(() => Attribute)
export class AttributesResolver {
  constructor(private readonly attributesService: AttributesService) {}

  @Mutation(() => Attribute)
  @UseGuards(GqlAuthGuard)
  createAttribute(@Args('createAttributeInput') createAttributeDto: CreateAttributeDto) {
    return this.attributesService.create(createAttributeDto);
  }

  @Query(() => [Attribute], { name: 'attributes' })
  findAllAttributes() {
    return this.attributesService.findAll();
  }

  @Query(() => Attribute, { name: 'attribute' })
  findOneAttribute(@Args('id', { type: () => Int }) id: string) {
    return this.attributesService.findOne(id);
  }

  @Mutation(() => Attribute)
  @UseGuards(GqlAuthGuard)
  updateAttribute(
    @Args('id', { type: () => Int }) id: string,
    @Args('updateAttributeInput') updateAttributeDto: UpdateAttributeDto,
  ) {
    return this.attributesService.update(id, updateAttributeDto);
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  removeAttribute(@Args('id', { type: () => Int }) id: string) {
    return this.attributesService.remove(id);
  }
}