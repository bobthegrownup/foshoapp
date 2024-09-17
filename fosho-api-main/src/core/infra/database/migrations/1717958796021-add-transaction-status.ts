import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddTransactionStatus1717958796021 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'transactions',
      new TableColumn({
        name: 'status',
        type: 'varchar',
        isNullable: false,
        default: "'PENDING'",
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('transactions', 'status');
  }
}
