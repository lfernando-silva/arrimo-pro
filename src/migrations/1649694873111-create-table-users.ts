import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createTableUsers1649694873111 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isUnique: true,
            generationStrategy: 'uuid',
            default: `uuid_generate_v4()`,
          },
          {
            name: 'name',
            type: 'varchar(350)',
            isNullable: false,
          },
          {
            name: 'password',
            type: 'varchar',
            default: false,
          },
          {
            name: 'email',
            type: 'varchar(350)',
            isNullable: false,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
