import { MigrationInterface, QueryRunner } from "typeorm";

export class MyMgrations1721028510867 implements MigrationInterface {
    name = 'MyMgrations1721028510867'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`playlists\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`firstName\` varchar(255) NOT NULL, \`lastName\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`twoFASecret\` text NULL, \`enable2FA\` tinyint NOT NULL DEFAULT 0, \`apiKey\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`artists\` (\`id\` int NOT NULL AUTO_INCREMENT, \`userId\` int NULL, UNIQUE INDEX \`REL_f7bd9114dc2849a90d39512911\` (\`userId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`songs\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`releasedDate\` date NOT NULL, \`duration\` time NOT NULL, \`lyrics\` text NOT NULL, \`playListId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`songs_artists\` (\`songsId\` int NOT NULL, \`artistsId\` int NOT NULL, INDEX \`IDX_971d95bf6df45f2b07c317b6b3\` (\`songsId\`), INDEX \`IDX_3f43a7e4032521e4edd2e7ecd2\` (\`artistsId\`), PRIMARY KEY (\`songsId\`, \`artistsId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`playlists\` ADD CONSTRAINT \`FK_708a919e9aa49019000d9e9b68e\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`artists\` ADD CONSTRAINT \`FK_f7bd9114dc2849a90d39512911b\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`songs\` ADD CONSTRAINT \`FK_54cf41bc33d524b206b93581950\` FOREIGN KEY (\`playListId\`) REFERENCES \`playlists\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`songs_artists\` ADD CONSTRAINT \`FK_971d95bf6df45f2b07c317b6b34\` FOREIGN KEY (\`songsId\`) REFERENCES \`songs\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`songs_artists\` ADD CONSTRAINT \`FK_3f43a7e4032521e4edd2e7ecd29\` FOREIGN KEY (\`artistsId\`) REFERENCES \`artists\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`songs_artists\` DROP FOREIGN KEY \`FK_3f43a7e4032521e4edd2e7ecd29\``);
        await queryRunner.query(`ALTER TABLE \`songs_artists\` DROP FOREIGN KEY \`FK_971d95bf6df45f2b07c317b6b34\``);
        await queryRunner.query(`ALTER TABLE \`songs\` DROP FOREIGN KEY \`FK_54cf41bc33d524b206b93581950\``);
        await queryRunner.query(`ALTER TABLE \`artists\` DROP FOREIGN KEY \`FK_f7bd9114dc2849a90d39512911b\``);
        await queryRunner.query(`ALTER TABLE \`playlists\` DROP FOREIGN KEY \`FK_708a919e9aa49019000d9e9b68e\``);
        await queryRunner.query(`DROP INDEX \`IDX_3f43a7e4032521e4edd2e7ecd2\` ON \`songs_artists\``);
        await queryRunner.query(`DROP INDEX \`IDX_971d95bf6df45f2b07c317b6b3\` ON \`songs_artists\``);
        await queryRunner.query(`DROP TABLE \`songs_artists\``);
        await queryRunner.query(`DROP TABLE \`songs\``);
        await queryRunner.query(`DROP INDEX \`REL_f7bd9114dc2849a90d39512911\` ON \`artists\``);
        await queryRunner.query(`DROP TABLE \`artists\``);
        await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP TABLE \`playlists\``);
    }

}
