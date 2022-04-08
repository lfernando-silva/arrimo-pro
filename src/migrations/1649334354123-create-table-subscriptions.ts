import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createTableSubscriptions1649334354123
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'subscriptions',
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
            name: 'subscription_time',
            type: 'timestamptz',
            isNullable: false,
            default: 'NOW()',
          },
          {
            name: 'is_email_verified',
            type: 'boolean',
            default: false,
          },
          {
            name: 'subscriber_name',
            type: 'varchar(350)',
            isNullable: false,
          },
          {
            name: 'frequency',
            type: 'enum',
            enum: ['daily', 'weekly', 'monthly'],
            isNullable: false,
            default: `'weekly'`, // as business rules say the newsletter is weekly
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
    await queryRunner.dropTable('subscriptions');
  }
}
