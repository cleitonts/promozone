import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1761150000000 implements MigrationInterface {
  name = 'Migration1761150000000'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE IF NOT EXISTS "users"."profiles" (
      "id" character(26) NOT NULL,
      "tenantId" character(26) NOT NULL,
      "resolvers" jsonb NOT NULL DEFAULT '[]',
      "created" TIMESTAMP NOT NULL DEFAULT now(),
      "updated" TIMESTAMP NOT NULL DEFAULT now(),
      CONSTRAINT "PK_profiles_id" PRIMARY KEY ("id"),
      CONSTRAINT "FK_profiles_tenant" FOREIGN KEY ("tenantId") REFERENCES "users"."tenants"("id") ON DELETE CASCADE
    )`);

    await queryRunner.query(`CREATE TABLE IF NOT EXISTS "users"."user_profiles" (
      "userId" character(26) NOT NULL,
      "profileId" character(26) NOT NULL,
      CONSTRAINT "PK_user_profiles" PRIMARY KEY ("userId", "profileId"),
      CONSTRAINT "FK_user_profiles_user" FOREIGN KEY ("userId") REFERENCES "users"."users"("id") ON DELETE CASCADE,
      CONSTRAINT "FK_user_profiles_profile" FOREIGN KEY ("profileId") REFERENCES "users"."profiles"("id") ON DELETE CASCADE
    )`);

    await queryRunner.query(`CREATE INDEX IF NOT EXISTS "IDX_profiles_tenant" ON "users"."profiles" ("tenantId")`);
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS "IDX_user_profiles_user" ON "users"."user_profiles" ("userId")`);
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS "IDX_user_profiles_profile" ON "users"."user_profiles" ("profileId")`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX IF EXISTS "users"."IDX_user_profiles_profile"`);
    await queryRunner.query(`DROP INDEX IF EXISTS "users"."IDX_user_profiles_user"`);
    await queryRunner.query(`DROP INDEX IF EXISTS "users"."IDX_profiles_tenant"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "users"."user_profiles"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "users"."profiles"`);
  }
}