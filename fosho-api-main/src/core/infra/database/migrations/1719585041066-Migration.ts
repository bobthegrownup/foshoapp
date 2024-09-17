import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class Migration1719585041066 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'events',
      new TableColumn({
        name: 'location',
        type: 'varchar',
        isNullable: true,
      }),
    );

    await queryRunner.addColumn(
      'events',
      new TableColumn({
        name: 'content',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('events', 'location');
    await queryRunner.dropColumn('events', 'content');
  }
}
