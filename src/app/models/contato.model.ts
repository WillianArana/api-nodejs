import {
  Table,
  Model,
  Column,
  DataType,
  PrimaryKey,
  ForeignKey,
} from 'sequelize-typescript';
import UsuarioModel from './usuario.model';

/**
 * @Obs: A classe deve conter o 'default'
 * @Doc: https://www.npmjs.com/package/sequelize-typescript#configuration
 */

@Table({ tableName: 'contato', initialAutoIncrement: '1', timestamps: false })
export default class ContatoModel extends Model<ContatoModel> {
  @PrimaryKey
  @Column({ autoIncrement: true, allowNull: false })
  id?: number;

  @ForeignKey(() => UsuarioModel)
  @Column(DataType.INTEGER)
  usuarioId?: number;

  @Column(DataType.TEXT)
  numero?: string;
}
