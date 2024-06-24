import {
  BeforeCreate,
  BeforeUpdate,
  Column,
  Default,
  HasOne,
  Length,
  Model,
  Table,
  Unique,
} from 'sequelize-typescript';
import * as bcrypt from 'bcrypt';

const hashPassword = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

@Table({
  tableName: 'users',
  timestamps: true,
  underscored: true,
  paranoid: true,
})
export class Users extends Model {
  @Unique
  @Length({ max: 50 })
  @Column
  email: string;

  @Length({ max: 50 })
  @Column
  first_name: string;

  @Length({ max: 50 })
  @Column
  last_name: string;

  @Column
  password: string;

  @Default(1)
  @Column
  status: number;

  @BeforeCreate
  static createPasswordHash(instance: Users) {
    // this will be called when an instance is created or updated
    instance.password = hashPassword(instance.password);
  }

  @BeforeUpdate
  static updatePasswordHash(instance: Users) {
    // this will be called when an instance is created or updated
    const passChanged = instance.changed('password');
    if (passChanged) {
      instance.password = hashPassword(instance.password);
    }
  }

  validatePassword(value: string) {
    return bcrypt.compareSync(value, this.password);
  }
}
