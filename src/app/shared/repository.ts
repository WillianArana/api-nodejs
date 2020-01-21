import { sequelize } from '../../sequelize';

export function getRepository(model: any): any {
  const repository: any = sequelize.getRepository(model);
  repository.query = sequelize.query;
  return repository;
}
