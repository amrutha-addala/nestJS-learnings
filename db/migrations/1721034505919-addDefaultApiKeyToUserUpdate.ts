import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDefaultApiKeyToUserUpdate1721034505919 implements MigrationInterface {
    name = 'AddDefaultApiKeyToUserUpdate1721034505919'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`apiKey\` \`apiKey\` varchar(255) NOT NULL DEFAULT '25c0ee49-a78d-4c84-9c72-99e5aff33594'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`apiKey\` \`apiKey\` varchar(255) NOT NULL DEFAULT 'default_api_key_value'`);
    }

}
