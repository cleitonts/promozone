import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductVariantAttribute } from './product-variant-attribute.entity';
import { CreateProductVariantAttributeDto } from './dto/product-variant-attribute.dto';

@Injectable()
export class ProductVariantAttributesService {
  constructor(
    @InjectRepository(ProductVariantAttribute)
    private productVariantAttributeRepository: Repository<ProductVariantAttribute>,
  ) {}

  async create(createProductVariantAttributeDto: CreateProductVariantAttributeDto): Promise<ProductVariantAttribute> {
    const productVariantAttribute = this.productVariantAttributeRepository.create(createProductVariantAttributeDto);
    return await this.productVariantAttributeRepository.save(productVariantAttribute);
  }

  async findAll(): Promise<ProductVariantAttribute[]> {
    return await this.productVariantAttributeRepository.find({
      relations: ['variant', 'attribute', 'value'],
    });
  }

  async findOne(id: string): Promise<ProductVariantAttribute | null> {
    return await this.productVariantAttributeRepository.findOne({
      where: { id },
      relations: ['variant', 'attribute', 'value'],
    });
  }

  async findByVariant(variantId: number): Promise<ProductVariantAttribute[]> {
    return await this.productVariantAttributeRepository.find({
      where: { variantId },
      relations: ['variant', 'attribute', 'value'],
    });
  }

  async findByAttribute(attributeId: number): Promise<ProductVariantAttribute[]> {
    return await this.productVariantAttributeRepository.find({
      where: { attributeId },
      relations: ['variant', 'attribute', 'value'],
    });
  }

  async update(id: string, updateProductVariantAttributeDto: Partial<CreateProductVariantAttributeDto>): Promise<ProductVariantAttribute | null> {
    await this.productVariantAttributeRepository.update(id, updateProductVariantAttributeDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.productVariantAttributeRepository.delete(id);
  }

  async removeByVariant(variantId: number): Promise<void> {
    await this.productVariantAttributeRepository.delete({ variantId });
  }

  async removeByVariantAndAttribute(variantId: number, attributeId: number): Promise<void> {
    await this.productVariantAttributeRepository.delete({ variantId, attributeId });
  }
}