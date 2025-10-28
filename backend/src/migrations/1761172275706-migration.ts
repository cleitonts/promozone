import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1761172275706 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users"."users" ADD COLUMN IF NOT EXISTS "roles" jsonb NOT NULL DEFAULT '[]'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users"."users" DROP COLUMN IF EXISTS "roles"`);
    }

}
