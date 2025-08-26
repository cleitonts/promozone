import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductVariants } from './product-variants.entity';
import { CreateProductVariantDto } from './dto/product-variant.dto';

@Injectable()
export class VariantsService {
  constructor(
    @InjectRepository(ProductVariants)
    private readonly variantRepository: Repository<ProductVariants>,
  ) {}

  async create(createProductVariantDto: CreateProductVariantDto): Promise<ProductVariants> {
    const variant = this.variantRepository.create(createProductVariantDto);
    return await this.variantRepository.save(variant);
  }

  async findAll(): Promise<ProductVariants[]> {
    return await this.variantRepository.find({
      relations: ['product'],
    });
  }

  async findOne(id: number): Promise<ProductVariants | null> {
    return await this.variantRepository.findOne({
      where: { id },
      relations: ['product'],
    });
  }

  async update(id: number, updateProductVariantDto: Partial<CreateProductVariantDto>): Promise<ProductVariants | null> {
    await this.variantRepository.update(id, updateProductVariantDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.variantRepository.delete(id);
  }

  async findByProductId(productId: number): Promise<ProductVariants[]> {
    return await this.variantRepository.find({
      where: { productId },
      relations: ['product'],
    });
  }
}