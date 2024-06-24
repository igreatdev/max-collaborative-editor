import {
  BelongsTo,
  Column,
  DataType,
  HasMany,
  Length,
  Model,
  Table,
} from 'sequelize-typescript';
import { Users } from './users.model';
import { DocumentHistories } from './documentHistories.model';

@Table({
  tableName: 'documents',
  timestamps: true,
  underscored: true,
  paranoid: true,
})
export class Documents extends Model {
  @Length({ max: 50 })
  @Column
  title: string;

  @Column
  content: string;

  @Column
  user_id: number;

  @BelongsTo(() => Users, 'user_id')
  user: Users;

  @HasMany(() => DocumentHistories, 'document_id')
  document_histories: DocumentHistories[];
}
