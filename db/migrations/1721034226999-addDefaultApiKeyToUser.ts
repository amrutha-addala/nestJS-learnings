import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDefaultApiKeyToUser1721034226999 implements MigrationInterface {
    name = 'AddDefaultApiKeyToUser1721034226999'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`apiKey\` \`apiKey\` varchar(255) NOT NULL DEFAULT 'default_api_key_value'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`apiKey\` \`apiKey\` varchar(255) NOT NULL`);
    }

}
