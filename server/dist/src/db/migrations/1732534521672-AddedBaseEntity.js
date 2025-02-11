"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddedBaseEntity1732534521672 = void 0;
class AddedBaseEntity1732534521672 {
    constructor() {
        this.name = 'AddedBaseEntity1732534521672';
    }
    async up(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD "date_created" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD "date_updated" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433"
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "id"
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
        `);
    }
    async down(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "users" DROP CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433"
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "id"
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD "id" SERIAL NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "date_updated"
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "date_created"
        `);
    }
}
exports.AddedBaseEntity1732534521672 = AddedBaseEntity1732534521672;
//# sourceMappingURL=1732534521672-AddedBaseEntity.js.map