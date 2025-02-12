import { MigrationInterface, QueryRunner } from "typeorm";
export declare class OptimizeUserModels1739361601534 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
