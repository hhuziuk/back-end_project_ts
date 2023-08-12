import { MigrationInterface, QueryRunner } from "typeorm"

export class FirstMigration1691689109985 implements MigrationInterface {
    name = 'FirstMigration1691689109985';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "User"
            ADD COLUMN role TEXT DEFAULT 'USER';`);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
         await queryRunner.query(`ALTER TABLE "User" DROP COLUMN "role";`);
    }

}

