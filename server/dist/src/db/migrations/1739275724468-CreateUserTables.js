"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserTables1739275724468 = void 0;
class CreateUserTables1739275724468 {
    constructor() {
        this.name = 'CreateUserTables1739275724468';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "UserContactTB" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "phoneNumber" character varying NOT NULL, "fax" character varying, "linkedInUrl" character varying, "userInfoId" integer, CONSTRAINT "REL_e28769bc2a0313908822ccf63c" UNIQUE ("userInfoId"), CONSTRAINT "PK_a244e8c439478df4bb9276dff95" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "UserAddressTB" ("id" SERIAL NOT NULL, "address" character varying NOT NULL, "city" character varying NOT NULL, "state" character varying NOT NULL, "country" character varying NOT NULL, "zipCode" character varying NOT NULL, "userInfoId" integer, CONSTRAINT "REL_2054765002a01a954a07ef0de1" UNIQUE ("userInfoId"), CONSTRAINT "PK_d648439672177032d1abc8361fd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "UserAcademicsTB" ("id" SERIAL NOT NULL, "schoolName" character varying NOT NULL, "degree" character varying NOT NULL, "graduationYear" integer NOT NULL, "description" character varying, "userInfoId" integer, CONSTRAINT "PK_791e2309b48e90c127a2162bb93" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "UserInfoTB" ("id" SERIAL NOT NULL, "profilePhoto" character varying, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "dob" date NOT NULL, "occupation" character varying NOT NULL, "gender" character varying NOT NULL, CONSTRAINT "PK_025d2b850c9d41d9efdb3e94217" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "UserContactTB" ADD CONSTRAINT "FK_e28769bc2a0313908822ccf63c1" FOREIGN KEY ("userInfoId") REFERENCES "UserInfoTB"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "UserAddressTB" ADD CONSTRAINT "FK_2054765002a01a954a07ef0de12" FOREIGN KEY ("userInfoId") REFERENCES "UserInfoTB"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "UserAcademicsTB" ADD CONSTRAINT "FK_5f798c9a95c643b70c40d9165c7" FOREIGN KEY ("userInfoId") REFERENCES "UserInfoTB"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "UserAcademicsTB" DROP CONSTRAINT "FK_5f798c9a95c643b70c40d9165c7"`);
        await queryRunner.query(`ALTER TABLE "UserAddressTB" DROP CONSTRAINT "FK_2054765002a01a954a07ef0de12"`);
        await queryRunner.query(`ALTER TABLE "UserContactTB" DROP CONSTRAINT "FK_e28769bc2a0313908822ccf63c1"`);
        await queryRunner.query(`DROP TABLE "UserInfoTB"`);
        await queryRunner.query(`DROP TABLE "UserAcademicsTB"`);
        await queryRunner.query(`DROP TABLE "UserAddressTB"`);
        await queryRunner.query(`DROP TABLE "UserContactTB"`);
    }
}
exports.CreateUserTables1739275724468 = CreateUserTables1739275724468;
//# sourceMappingURL=1739275724468-CreateUserTables.js.map