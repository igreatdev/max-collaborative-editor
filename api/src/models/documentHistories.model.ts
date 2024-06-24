import {
  AfterUpdate,
  BelongsTo,
  Column,
  Default,
  Length,
  Model,
  Table,
  Unique,
} from 'sequelize-typescript';
import { Documents } from './documents.model';
import { Users } from './users.model';

@Table({
  tableName: 'document_histories',
  timestamps: true,
  underscored: true,
  paranoid: true,
})
export class DocumentHistories extends Model {
  @Column
  document_id: number;

  @Length({ max: 45 })
  @Column
  title: string;

  @Column
  content: string;

  @Column
  user_id: number;

  @BelongsTo(() => Documents, 'document_id')
  document: Documents;

  @BelongsTo(() => Users, 'user_id')
  user: Users;
}
