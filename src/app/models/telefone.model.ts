import { Column, DataType, ForeignKey, Model, PrimaryKey, Table } from 'sequelize-typescript';
import ContatoModel from './contato.model';

/**
 * @Obs: A classe deve conter o 'default'
 * @Doc: https://www.npmjs.com/package/sequelize-typescript#configuration
 */

@Table({ tableName: 'telefone', initialAutoIncrement: '1', timestamps: false })
export default class TelefoneModel extends Model<TelefoneModel> {
  @PrimaryKey
  @Column({ autoIncrement: true, allowNull: false })
  id?: number;

  @ForeignKey(() => ContatoModel)
  @Column(DataType.INTEGER)
  contatoId?: number;

  @Column(DataType.TEXT)
  tipo?: string;

  @Column(DataType.TEXT)
  numero?: string;
}
