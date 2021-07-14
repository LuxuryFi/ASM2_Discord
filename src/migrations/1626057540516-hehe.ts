import {MigrationInterface, QueryRunner} from "typeorm";

export class hehe1626057540516 implements MigrationInterface {
    name = 'hehe1626057540516'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `chat_log` (`username` varchar(255) NOT NULL, `socketId` varchar(255) NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (`username`, `socketId`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE `chat_log`");
    }

}
