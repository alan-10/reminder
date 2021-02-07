import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class usersTokenCreate1611794484589 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'userTokns',
      columns: [
        {
          name: 'id',
          type: 'integer',
          unsigned: true,
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment'
        },
        {
          name: 'token',
          type: 'varchar'
          
        },
        {
          name: 'isValid',
          type: 'boolean'
        },
        {
          name: 'user_id',
          type: 'integer'
        }
      ],
      foreignKeys: [
        {
          name: 'tokenOfUser',
          columnNames: ['user_id'],
          referencedTableName: 'users',
          referencedColumnNames: ['id'],
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
        }
      ]
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('userTokns');
  }

}
