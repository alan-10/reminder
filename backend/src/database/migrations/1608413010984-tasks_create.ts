import { MigrationInterface, QueryRunner, Table  } from "typeorm";

export class tasksCreate1608413010984 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'tasks',
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
          name: 'description',
          type:'text',
        },
        {
          name: 'yarTask',
          type: 'varchar'
        },
        {
          name: 'hourTask',
          type: 'varchar'
        },
        {
          name: 'isCheked',
          type:'boolean'
        },
        {
          name: 'hourInMinutes',
          type: 'integer'
        },
        {
          name:'user_id',
          type: 'integer'
        }
        ],
      foreignKeys:[
        {
          name:'taskOfUser',
          columnNames: ['user_id'],
          referencedTableName: 'users',
          referencedColumnNames: ['id'],
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        }
      ]
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tasks')
  }

}
