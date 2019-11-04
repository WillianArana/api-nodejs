import { Table, Model, Column, DataType, Length, PrimaryKey } from 'sequelize-typescript';
import { IUsuario } from '../interfaces/iusuario';

@Table({ tableName: 'usuario', timestamps: false })
export class UsuarioModel extends Model<UsuarioModel> implements IUsuario {

  @PrimaryKey
  @Column
  id?: number;

  @Length({ max: 30 })
  @Column(DataType.TEXT)
  nome?: string;

}
