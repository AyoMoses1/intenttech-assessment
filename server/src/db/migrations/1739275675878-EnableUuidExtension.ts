import { MigrationInterface, QueryRunner } from "typeorm";

export class EnableUuidExtension1739275724467 implements MigrationInterface {
  name = "EnableUuidExtension1739275724467";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP EXTENSION IF EXISTS "uuid-ossp"`);
  }
}
