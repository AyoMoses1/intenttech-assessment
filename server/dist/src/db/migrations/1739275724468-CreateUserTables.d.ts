import { MigrationInterface, QueryRunner } from "typeorm";
export declare class CreateUserTables1739275724468 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
