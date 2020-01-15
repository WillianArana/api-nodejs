import {
  Table,
  Model,
  Column,
  DataType,
  PrimaryKey,
} from 'sequelize-typescript';
import { IUsuario } from '../interfaces/iusuario';

/**
 * @Obs: A classe deve conter o 'default'
 * @Doc: https://www.npmjs.com/package/sequelize-typescript#configuration
 */

@Table({ tableName: 'usuario', timestamps: false })
export default class UsuarioModel extends Model<UsuarioModel>
  implements IUsuario {
  @PrimaryKey
  @Column
  id?: number;

  @Column(DataType.STRING(30))
  nome?: string;

  @Column(DataType.STRING(12))
  login?: string;

  @Column(DataType.STRING(155))
  senha?: string;
}
