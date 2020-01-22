import {
  Table,
  Model,
  Column,
  DataType,
  PrimaryKey,
} from 'sequelize-typescript';

/**
 * @Obs: A classe deve conter o 'default'
 * @Doc: https://www.npmjs.com/package/sequelize-typescript#configuration
 */

@Table({ tableName: 'log', initialAutoIncrement: '1', timestamps: false })
export default class LogModel extends Model<LogModel> {
  @PrimaryKey
  @Column({ autoIncrement: true, allowNull: false })
  id?: number;

  @Column({ type: DataType.INTEGER, field: 'id_usuario' })
  idUsuario?: number;

  @Column(DataType.TEXT)
  request?: string;

  @Column(DataType.TEXT)
  command?: string;
}
