import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1760635613693 implements MigrationInterface {
    name = 'Migration1760635613693'

    public async up(queryRunner: QueryRunner): Promise<void> {
        //cria schemas
        await queryRunner.query(`CREATE SCHEMA IF NOT EXISTS "users"`);
        await queryRunner.query(`CREATE SCHEMA IF NOT EXISTS "todo_items"`);
        await queryRunner.query(`CREATE SCHEMA IF NOT EXISTS "products"`);
        
        await queryRunner.query(`CREATE TABLE "users"."users" ("id" character(26) NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "active" boolean NOT NULL DEFAULT true, "nameFirst" character varying NOT NULL, "nameLast" character varying NOT NULL, "createdAtCreatedat" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "todo_items" ("id" character(26) NOT NULL, "title" character varying NOT NULL, "completed" boolean NOT NULL, "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_7ad331e73b03da55c148c2b5595" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users"."tenants" ("id" character(26) NOT NULL, "name" character varying NOT NULL, "domain" character varying NOT NULL, "active" boolean NOT NULL DEFAULT true, "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_53be67a04681c66b87ee27c9321" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "products"."categories" ("id" character(26) NOT NULL, "name" character varying NOT NULL, "description" character varying, "slug" character varying NOT NULL, "active" boolean NOT NULL DEFAULT true, "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_420d9f679d41281f282f5bc7d09" UNIQUE ("slug"), CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "products"."brands" ("id" character(26) NOT NULL, "name" character varying NOT NULL, "slug" character varying NOT NULL, "description" character varying, "logoUrl" character varying, "website" character varying, "country" character varying, "active" boolean NOT NULL DEFAULT true, "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_b15428f362be2200922952dc268" UNIQUE ("slug"), CONSTRAINT "PK_b0c437120b624da1034a81fc561" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "products"."products" ("id" character(26) NOT NULL, "name" character varying NOT NULL, "slug" character varying NOT NULL, "description" character varying, "price" numeric(10,2) NOT NULL, "categoryId" character, "brandId" character, "active" boolean NOT NULL DEFAULT true, "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_464f927ae360106b783ed0b4106" UNIQUE ("slug"), CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "products"."product_variants" ("id" character(26) NOT NULL, "productId" character NOT NULL, "sku" character varying NOT NULL, "price" numeric(10,2) NOT NULL, "stock" integer NOT NULL DEFAULT '0', "imageUrl" character varying, "active" boolean NOT NULL DEFAULT true, "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_46f236f21640f9da218a063a866" UNIQUE ("sku"), CONSTRAINT "PK_281e3f2c55652d6a22c0aa59fd7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "products"."attributes" ("id" character(26) NOT NULL, "name" character varying NOT NULL, "description" character varying, "active" boolean NOT NULL DEFAULT true, "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_32216e2e61830211d3a5d7fa72c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "products"."attribute_values" ("id" character(26) NOT NULL, "attributeId" character NOT NULL, "value" character varying NOT NULL, "active" boolean NOT NULL DEFAULT true, "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_3babf93d1842d73e7ba849c0160" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "products"."products" ADD CONSTRAINT "FK_ff56834e735fa78a15d0cf21926" FOREIGN KEY ("categoryId") REFERENCES "products"."categories"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products"."products" ADD CONSTRAINT "FK_ea86d0c514c4ecbb5694cbf57df" FOREIGN KEY ("brandId") REFERENCES "products"."brands"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products"."product_variants" ADD CONSTRAINT "FK_f515690c571a03400a9876600b5" FOREIGN KEY ("productId") REFERENCES "products"."products"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products"."attribute_values" ADD CONSTRAINT "FK_b8f8e1d9141248b538c9285574e" FOREIGN KEY ("attributeId") REFERENCES "products"."attributes"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        //drop schemas
        await queryRunner.query(`DROP SCHEMA IF EXISTS "products"`);
        await queryRunner.query(`DROP SCHEMA IF EXISTS "todo_items"`);
        await queryRunner.query(`DROP SCHEMA IF EXISTS "users"`);

        await queryRunner.query(`ALTER TABLE "products"."attribute_values" DROP CONSTRAINT "FK_b8f8e1d9141248b538c9285574e"`);
        await queryRunner.query(`ALTER TABLE "products"."product_variants" DROP CONSTRAINT "FK_f515690c571a03400a9876600b5"`);
        await queryRunner.query(`ALTER TABLE "products"."products" DROP CONSTRAINT "FK_ea86d0c514c4ecbb5694cbf57df"`);
        await queryRunner.query(`ALTER TABLE "products"."products" DROP CONSTRAINT "FK_ff56834e735fa78a15d0cf21926"`);
        await queryRunner.query(`DROP TABLE "products"."attribute_values"`);
        await queryRunner.query(`DROP TABLE "products"."attributes"`);
        await queryRunner.query(`DROP TABLE "products"."product_variants"`);
        await queryRunner.query(`DROP TABLE "products"."products"`);
        await queryRunner.query(`DROP TABLE "products"."brands"`);
        await queryRunner.query(`DROP TABLE "products"."categories"`);
        await queryRunner.query(`DROP TABLE "users"."tenants"`);
        await queryRunner.query(`DROP TABLE "todo_items"`);
        await queryRunner.query(`DROP TABLE "users"."users"`);
    }

}
