import { MigrationInterface, QueryRunner } from "typeorm";

export class OptimizeUserModels1739361601534 implements MigrationInterface {
    name = 'OptimizeUserModels1739361601534'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "UserContactTB" DROP CONSTRAINT "FK_e28769bc2a0313908822ccf63c1"`);
        await queryRunner.query(`ALTER TABLE "UserAddressTB" DROP CONSTRAINT "FK_2054765002a01a954a07ef0de12"`);
        await queryRunner.query(`ALTER TABLE "UserAcademicsTB" DROP CONSTRAINT "FK_5f798c9a95c643b70c40d9165c7"`);
        await queryRunner.query(`ALTER TABLE "UserContactTB" ADD CONSTRAINT "FK_e28769bc2a0313908822ccf63c1" FOREIGN KEY ("userInfoId") REFERENCES "UserInfoTB"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "UserAddressTB" ADD CONSTRAINT "FK_2054765002a01a954a07ef0de12" FOREIGN KEY ("userInfoId") REFERENCES "UserInfoTB"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "UserAcademicsTB" ADD CONSTRAINT "FK_5f798c9a95c643b70c40d9165c7" FOREIGN KEY ("userInfoId") REFERENCES "UserInfoTB"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "UserAcademicsTB" DROP CONSTRAINT "FK_5f798c9a95c643b70c40d9165c7"`);
        await queryRunner.query(`ALTER TABLE "UserAddressTB" DROP CONSTRAINT "FK_2054765002a01a954a07ef0de12"`);
        await queryRunner.query(`ALTER TABLE "UserContactTB" DROP CONSTRAINT "FK_e28769bc2a0313908822ccf63c1"`);
        await queryRunner.query(`ALTER TABLE "UserAcademicsTB" ADD CONSTRAINT "FK_5f798c9a95c643b70c40d9165c7" FOREIGN KEY ("userInfoId") REFERENCES "UserInfoTB"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "UserAddressTB" ADD CONSTRAINT "FK_2054765002a01a954a07ef0de12" FOREIGN KEY ("userInfoId") REFERENCES "UserInfoTB"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "UserContactTB" ADD CONSTRAINT "FK_e28769bc2a0313908822ccf63c1" FOREIGN KEY ("userInfoId") REFERENCES "UserInfoTB"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
