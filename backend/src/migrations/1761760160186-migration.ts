import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1761760160186 implements MigrationInterface {
    name = 'Migration1761760160186'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users"."tenants" DROP CONSTRAINT "FK_dccf2382a3ffe4edfc09b8eeb06"`);
        await queryRunner.query(`ALTER TABLE "users"."tenants" DROP COLUMN "domain"`);
        await queryRunner.query(`ALTER TABLE "users"."tenants" DROP COLUMN "active"`);
        await queryRunner.query(`ALTER TABLE "users"."tenants" ALTER COLUMN "ownerId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users"."tenants" ADD CONSTRAINT "FK_dccf2382a3ffe4edfc09b8eeb06" FOREIGN KEY ("ownerId") REFERENCES "users"."users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users"."tenants" DROP CONSTRAINT "FK_dccf2382a3ffe4edfc09b8eeb06"`);
        await queryRunner.query(`ALTER TABLE "users"."tenants" ALTER COLUMN "ownerId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users"."tenants" ADD "active" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "users"."tenants" ADD "domain" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users"."tenants" ADD CONSTRAINT "FK_dccf2382a3ffe4edfc09b8eeb06" FOREIGN KEY ("ownerId") REFERENCES "users"."users"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

}
