import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

const FOREIGN_KEY_NAME = 'subscription_country_fk';
export class addColumnCountryIdOnSubscriptions1649336907138
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'subscriptions',
      new TableColumn({
        name: 'country_id',
        type: 'uuid',
        isNullable: false,
      }),
    );

    await queryRunner.createForeignKey(
      'subscriptions',
      new TableForeignKey({
        name: FOREIGN_KEY_NAME,
        columnNames: ['country_id'],
        referencedTableName: 'countries',
        referencedColumnNames: ['id'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE subscriptions DROP FOREIGN KEY ${FOREIGN_KEY_NAME}`,
    );
    await queryRunner.query('ALTER TABLE subscriptions DROP COLUMN country_id');
  }
}
