"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MadeTokenColumnNullable1732531821972 = void 0;
class MadeTokenColumnNullable1732531821972 {
    constructor() {
        this.name = 'MadeTokenColumnNullable1732531821972';
    }
    async up(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "users"
            ALTER COLUMN "token" DROP NOT NULL
        `);
    }
    async down(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "users"
            ALTER COLUMN "token"
            SET NOT NULL
        `);
    }
}
exports.MadeTokenColumnNullable1732531821972 = MadeTokenColumnNullable1732531821972;
//# sourceMappingURL=1732531821972-MadeTokenColumnNullable.js.map