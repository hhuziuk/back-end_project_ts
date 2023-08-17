import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey } from "typeorm";

export class FirstMigration1691689109985 implements MigrationInterface {
    name = 'FirstMigration1691689109985';

    public async up(queryRunner: QueryRunner): Promise<void> {





        // await queryRunner.createTable(new Table({
        //     name: "Publisher",
        //     columns: [
        //         {
        //             name: "id",
        //             type: "int",
        //             isPrimary: true,
        //             isGenerated: true,
        //             generationStrategy: "increment"
        //         },
        //         {
        //             name: "name",
        //             type: "varchar",
        //             length: "50",
        //             isNullable: false,
        //             isUnique: true
        //         }
        //     ]
        // }), true);


        // await queryRunner.createTable(new Table({
        //     name: "Book",
        //     columns: [
        //         {
        //             name: "id",
        //             type: "int",
        //             isPrimary: true,
        //             isGenerated: true,
        //             generationStrategy: "increment"
        //         },
        //         {
        //             name: "name",
        //             type: "varchar",
        //             length: "80",
        //             isNullable: false
        //         },
        //         {
        //             name: "author",
        //             type: "varchar",
        //             length: "80",
        //             isNullable: false
        //         },
        //         {
        //             name: "description",
        //             type: "varchar",
        //             length: "100",
        //             isNullable: false
        //         },
        //         {
        //             name: "file",
        //             type: "varchar",
        //             isNullable: true
        //         },
        //         {
        //             name: "ISBN",
        //             type: "varchar",
        //             isNullable: false
        //         },
        //         {
        //             name: "typeId",
        //             type: "int",
        //             isNullable: false
        //         },
        //         {
        //             name: "publisherId",
        //             type: "int",
        //             isNullable: false
        //         }
        //     ]
        // }), true);

        // await queryRunner.createTable(new Table({
        //     name: "User",
        //     columns: [
        //         {
        //             name: "id",
        //             type: "int",
        //             isPrimary: true,
        //             isGenerated: true,
        //             generationStrategy: "increment"
        //         },
        //         {
        //             name: "username",
        //             type: "varchar",
        //             length: "15",
        //             isNullable: false,
        //             isUnique: true
        //         },
        //         {
        //             name: "password",
        //             type: "varchar",
        //             length: "15",
        //             isNullable: false
        //         },
        //         {
        //             name: "email",
        //             type: "varchar",
        //             isNullable: false,
        //             isUnique: true
        //         },
        //         {
        //             name: "isActivated",
        //             type: "boolean",
        //             default: false
        //         },
        //         {
        //             name: "activationLink",
        //             type: "varchar",
        //             isNullable: true
        //         },
        //         {
        //             name: "role",
        //             type: "varchar",
        //             isNullable: false
        //         }
        //     ]
        // }), true);

        // await queryRunner.createTable(new Table({
        //     name: "Token",
        //     columns: [
        //         {
        //             name: "id",
        //             type: "int",
        //             isPrimary: true,
        //             isGenerated: true,
        //             generationStrategy: "increment"
        //         },
        //         {
        //             name: "userId",
        //             type: "int",
        //             isNullable: false
        //         },
        //         {
        //             name: "refreshToken",
        //             type: "varchar",
        //             isNullable: false
        //         }
        //     ],
        //     foreignKeys: [
        //         {
        //             columnNames: ["userId"],
        //             referencedTableName: "User",
        //             referencedColumnNames: ["id"],
        //             onDelete: "CASCADE" // or your desired onDelete action
        //         }
        //     ]
        // }), true);

        // await queryRunner.createTable(new Table({
        //     name: "Type",
        //     columns: [
        //         {
        //             name: "id",
        //             type: "int",
        //             isPrimary: true,
        //             isGenerated: true,
        //             generationStrategy: "increment"
        //         },
        //         {
        //             name: "name",
        //             type: "varchar",
        //             length: "50",
        //             isNullable: false,
        //             isUnique: true
        //         }
        //     ]
        // }), true);

        // await queryRunner.createTable(new Table({
        //     name: "WishlistBook",
        //     columns: [
        //         {
        //             name: "id",
        //             type: "int",
        //             isPrimary: true,
        //             isGenerated: true,
        //             generationStrategy: "increment"
        //         },
        //         {
        //             name: "wishlistId",
        //             type: "int",
        //             isNullable: false
        //         },
        //         {
        //             name: "bookId",
        //             type: "int",
        //             isNullable: false
        //         }
        //     ],
        //     foreignKeys: [
        //         {
        //             columnNames: ["wishlistId"],
        //             referencedTableName: "Wishlist",
        //             referencedColumnNames: ["id"],
        //             onDelete: "CASCADE" // or your desired onDelete action
        //         },
        //         {
        //             columnNames: ["bookId"],
        //             referencedTableName: "Book",
        //             referencedColumnNames: ["id"],
        //             onDelete: "CASCADE" // or your desired onDelete action
        //         }
        //     ]
        // }), true);

        // await queryRunner.createTable(new Table({
        //     name: "Wishlist",
        //     columns: [
        //         {
        //             name: "id",
        //             type: "int",
        //             isPrimary: true,
        //             isGenerated: true,
        //             generationStrategy: "increment"
        //         }
        //     ]
        // }), true);

        // await queryRunner.dropColumn("User", "username");
        // await queryRunner.dropColumn("User", "password");

        await queryRunner.addColumn("User", new TableColumn({
            name: "username",
            type: "varchar",
            isNullable: false,
            isUnique: true
        }));

        await queryRunner.addColumn("User", new TableColumn({
            name: "password",
            type: "varchar",
            isNullable: false
        }));

    }
        //npm run migration:up
    public async down(queryRunner: QueryRunner): Promise<void> {

    }


}

