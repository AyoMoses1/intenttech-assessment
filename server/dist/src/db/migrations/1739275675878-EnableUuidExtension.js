"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnableUuidExtension1739275724467 = void 0;
class EnableUuidExtension1739275724467 {
    constructor() {
        this.name = "EnableUuidExtension1739275724467";
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP EXTENSION IF EXISTS "uuid-ossp"`);
    }
}
exports.EnableUuidExtension1739275724467 = EnableUuidExtension1739275724467;
//# sourceMappingURL=1739275675878-EnableUuidExtension.js.map