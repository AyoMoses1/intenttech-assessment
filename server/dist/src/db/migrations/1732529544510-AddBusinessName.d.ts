import { MigrationInterface, QueryRunner } from "typeorm";
export declare class AddBusinessName1732529544510 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
