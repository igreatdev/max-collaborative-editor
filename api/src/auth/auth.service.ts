import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { Users } from 'src/models';
import { UserRegisterDto, userResponseDto } from './dto';
import { Sequelize } from 'sequelize-typescript';
import { ValidationException } from 'src/exceptions';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Users) private users: typeof Users,
    private readonly jwtService: JwtService,
    private readonly sequelize: Sequelize,
  ) {}

  async validateUser(email: string, pass: string) {
    // find if user exist with this email
    const user = await this.users.findOne({ where: { email: email } });
    if (!user) {
      return null;
    }

    // find if user password match
    if (!user.validatePassword(pass)) {
      return null;
    }

    const token = await this.generateToken({ sub: user.id });
    // tslint:disable-next-line: no-string-literal
    const { password, ...result } = user.dataValues;
    return { ...result, token };
  }

  private async generateToken(payload) {
    const token = await this.jwtService.signAsync(payload);
    return token;
  }

  async validateUserById(id: number) {
    const user = await this.users.findByPk(id);
    if (!user) {
      return null;
    }

    return userResponseDto(user);
  }

  async registerUser(data: UserRegisterDto) {
    // Check if email exists
    const check = await this.users.findOne({ where: { email: data.email } });
    if (check) {
      // Throw validation error
      console.log('Error- unique email');

      const vError = {
        email: 'An account already exists for this email.',
      };
      throw new ValidationException(vError);
    }

    // Create User
    const userData = {
      email: data.email,
      password: data.password,
      first_name: data.first_name,
      last_name: data.last_name,
    };
    const result = await this.sequelize.transaction(async (transaction) => {
      const user = await this.users.create<Users>(userData, {
        transaction: transaction,
      });

      return user;
    });

    // TODO: Initiate signup email

    return userResponseDto(result);
  }
}
