import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UlidUtil } from '@/common/ulid.util';
import { BrandEntity } from '@/products/brands/brand.entity';
import { CategoryEntity } from '@/products/categories/category.entity';
import { AttributeEntity } from '@/products/attributes/attribute.entity';
import { AttributeValueEntity } from '@/products/attributes/attribute-value.entity';
import { ProductEntity } from '@/products/products/product.entity';
import { ProductVariantEntity } from '@/products/variants/product-variant.entity';
import { ProductVariantAttributeEntity } from '@/products/variants/product-variant-attribute.entity';

@Injectable()
export class ProductsSeedService {
  constructor(
    @InjectRepository(BrandEntity) private readonly brandRepo: Repository<BrandEntity>,
    @InjectRepository(CategoryEntity) private readonly categoryRepo: Repository<CategoryEntity>,
    @InjectRepository(AttributeEntity) private readonly attributeRepo: Repository<AttributeEntity>,
    @InjectRepository(AttributeValueEntity) private readonly attributeValueRepo: Repository<AttributeValueEntity>,
    @InjectRepository(ProductEntity) private readonly productRepo: Repository<ProductEntity>,
    @InjectRepository(ProductVariantEntity) private readonly variantRepo: Repository<ProductVariantEntity>,
    @InjectRepository(ProductVariantAttributeEntity) private readonly variantAttrRepo: Repository<ProductVariantAttributeEntity>,
  ) {}

  async run(): Promise<void> {
    await this.seedTire();
    await this.seedTshirt();
    console.log('Products seed ensured successfully');
  }

  private async ensureBrand(name: string, slug: string): Promise<BrandEntity> {
    let brand = await this.brandRepo.findOne({ where: { slug } });
    if (!brand) {
      brand = this.brandRepo.create({ id: UlidUtil.generate(), name, slug, active: true });
      await this.brandRepo.save(brand);
    }
    return brand;
  }

  private async ensureCategory(name: string, slug: string): Promise<CategoryEntity> {
    let category = await this.categoryRepo.findOne({ where: { slug } });
    if (!category) {
      category = this.categoryRepo.create({ id: UlidUtil.generate(), name, slug, active: true });
      await this.categoryRepo.save(category);
    }
    return category;
  }

  private async ensureAttribute(name: string): Promise<AttributeEntity> {
    let attribute = await this.attributeRepo.findOne({ where: { name } });
    if (!attribute) {
      attribute = this.attributeRepo.create({ id: UlidUtil.generate(), name, active: true });
      await this.attributeRepo.save(attribute);
    }
    return attribute;
  }

  private async ensureAttributeValue(attributeId: string, value: string): Promise<AttributeValueEntity> {
    let attrValue = await this.attributeValueRepo.findOne({ where: { attributeId, value } });
    if (!attrValue) {
      attrValue = this.attributeValueRepo.create({ id: UlidUtil.generate(), attributeId, value, active: true });
      await this.attributeValueRepo.save(attrValue);
    }
    return attrValue;
  }

  private async ensureProduct(data: Partial<ProductEntity>): Promise<ProductEntity> {
    const slug = data.slug!;
    let product = await this.productRepo.findOne({ where: { slug } });
    if (!product) {
      product = this.productRepo.create({
        id: UlidUtil.generate(),
        name: data.name!,
        slug,
        description: data.description ?? null as any,
        price: data.price ?? 0,
        categoryId: data.categoryId ?? null as any,
        brandId: data.brandId ?? null as any,
        active: data.active ?? true,
      });
      await this.productRepo.save(product);
    }
    return product;
  }

  private async ensureVariant(data: Partial<ProductVariantEntity>): Promise<ProductVariantEntity> {
    const sku = data.sku!;
    let variant = await this.variantRepo.findOne({ where: { sku } });
    if (!variant) {
      variant = this.variantRepo.create({
        id: UlidUtil.generate(),
        productId: data.productId!,
        sku,
        price: data.price ?? 0,
        stock: data.stock ?? 0,
        imageUrl: data.imageUrl ?? null as any,
        active: data.active ?? true,
      });
      await this.variantRepo.save(variant);
    }
    return variant;
  }

  private async linkVariantAttribute(variantId: string, attributeValueId: string): Promise<void> {
    const exists = await this.variantAttrRepo.findOne({ where: { variantId, attributeValueId } });
    if (!exists) {
      const link = this.variantAttrRepo.create({ id: UlidUtil.generate(), variantId, attributeValueId });
      await this.variantAttrRepo.save(link);
    }
  }

  private async seedTire(): Promise<void> {
    const brand = await this.ensureBrand('Goodyear', 'goodyear');
    const category = await this.ensureCategory('Tires', 'tires');

    const sizeAttr = await this.ensureAttribute('size');
    const typeAttr = await this.ensureAttribute('type');

    const sizeValues = await Promise.all([
      this.ensureAttributeValue(sizeAttr.id, '195/65 R15'),
      this.ensureAttributeValue(sizeAttr.id, '205/55 R16'),
      this.ensureAttributeValue(sizeAttr.id, '225/45 R17'),
    ]);

    const typeValues = await Promise.all([
      this.ensureAttributeValue(typeAttr.id, 'summer'),
      this.ensureAttributeValue(typeAttr.id, 'winter'),
      this.ensureAttributeValue(typeAttr.id, 'all-season'),
    ]);

    const product = await this.ensureProduct({
      name: 'Goodyear EfficientGrip',
      slug: 'goodyear-efficientgrip',
      description: 'Performance tire with multiple size and type variations',
      price: 350.00,
      categoryId: category.id,
      brandId: brand.id,
    });

    const variantsData = [
      { sku: 'TIRE-GY-EG-195-65-R15-SUM', price: 349.90, size: sizeValues[0], type: typeValues[0] },
      { sku: 'TIRE-GY-EG-205-55-R16-ALL', price: 389.90, size: sizeValues[1], type: typeValues[2] },
      { sku: 'TIRE-GY-EG-225-45-R17-WIN', price: 429.90, size: sizeValues[2], type: typeValues[1] },
    ];

    for (const v of variantsData) {
      const variant = await this.ensureVariant({ productId: product.id, sku: v.sku, price: v.price, stock: 100 });
      await this.linkVariantAttribute(variant.id, v.size.id);
      await this.linkVariantAttribute(variant.id, v.type.id);
    }
  }

  private async seedTshirt(): Promise<void> {
    const brand = await this.ensureBrand('Acme', 'acme');
    const category = await this.ensureCategory('Apparel', 'apparel');

    const colorAttr = await this.ensureAttribute('color');
    const sizeAttr = await this.ensureAttribute('size');

    const colorValues = await Promise.all([
      this.ensureAttributeValue(colorAttr.id, 'red'),
      this.ensureAttributeValue(colorAttr.id, 'blue'),
      this.ensureAttributeValue(colorAttr.id, 'black'),
    ]);

    const sizeValues = await Promise.all([
      this.ensureAttributeValue(sizeAttr.id, 'S'),
      this.ensureAttributeValue(sizeAttr.id, 'M'),
      this.ensureAttributeValue(sizeAttr.id, 'L'),
    ]);

    const product = await this.ensureProduct({
      name: 'Acme Basic T-Shirt',
      slug: 'acme-basic-tshirt',
      description: 'Cotton t-shirt with color and size variations',
      price: 59.90,
      categoryId: category.id,
      brandId: brand.id,
    });

    const variantsData = [
      { sku: 'TS-ACME-RED-S', price: 59.90, color: colorValues[0], size: sizeValues[0] },
      { sku: 'TS-ACME-BLUE-M', price: 64.90, color: colorValues[1], size: sizeValues[1] },
      { sku: 'TS-ACME-BLACK-L', price: 69.90, color: colorValues[2], size: sizeValues[2] },
    ];

    for (const v of variantsData) {
      const variant = await this.ensureVariant({ productId: product.id, sku: v.sku, price: v.price, stock: 200 });
      await this.linkVariantAttribute(variant.id, v.color.id);
      await this.linkVariantAttribute(variant.id, v.size.id);
    }
  }
}