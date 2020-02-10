import { Column, DataType, ForeignKey, HasMany, Model, PrimaryKey, Table } from 'sequelize-typescript';
import TelefoneModel from './telefone.model';
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

  @HasMany(() => TelefoneModel)
  telefones?: TelefoneModel[];
}
