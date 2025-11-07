import { MigrationInterface, QueryRunner } from 'typeorm';

export class FixFkCharLength1762188000000 implements MigrationInterface {
  name = 'FixFkCharLength1762188000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "products"."attribute_values" ALTER COLUMN "attributeId" TYPE char(26) USING "attributeId"::char(26)`,
    );
    await queryRunner.query(
      `ALTER TABLE "products"."product_variants" ALTER COLUMN "productId" TYPE char(26) USING "productId"::char(26)`,
    );
    await queryRunner.query(
      `ALTER TABLE "products"."products" ALTER COLUMN "categoryId" TYPE char(26) USING "categoryId"::char(26)`,
    );
    await queryRunner.query(
      `ALTER TABLE "products"."products" ALTER COLUMN "brandId" TYPE char(26) USING "brandId"::char(26)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "products"."attribute_values" ALTER COLUMN "attributeId" TYPE char(1) USING "attributeId"::char(1)`,
    );
    await queryRunner.query(
      `ALTER TABLE "products"."product_variants" ALTER COLUMN "productId" TYPE char(1) USING "productId"::char(1)`,
    );
    await queryRunner.query(
      `ALTER TABLE "products"."products" ALTER COLUMN "categoryId" TYPE char(1) USING "categoryId"::char(1)`,
    );
    await queryRunner.query(
      `ALTER TABLE "products"."products" ALTER COLUMN "brandId" TYPE char(1) USING "brandId"::char(1)`,
    );
  }
}