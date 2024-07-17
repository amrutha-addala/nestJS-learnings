import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveDefaultApiKeFromEntity1721035171607 implements MigrationInterface {
    name = 'RemoveDefaultApiKeFromEntity1721035171607'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`apiKey\` \`apiKey\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`apiKey\` \`apiKey\` varchar(255) NOT NULL DEFAULT '25c0ee49-a78d-4c84-9c72-99e5aff33594'`);
    }

}
