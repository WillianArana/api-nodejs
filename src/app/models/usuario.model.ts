import {
  Table,
  Model,
  Column,
  DataType,
  Length,
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

  @Length({ max: 30 })
  @Column(DataType.TEXT)
  nome?: string;
}
