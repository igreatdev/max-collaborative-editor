import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiService } from 'src/utils/api/api.service';
import { AuthGuard } from './auth.guard';
import { UserLoginDto, UserRegisterDto } from './dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private apiService: ApiService,
  ) {}

  @Post('login')
  async login(@Body() data: UserLoginDto) {
    const user = await this.authService.validateUser(data.email, data.password);

    if (!user) {
      throw new UnauthorizedException('Invalid user credentials');
    }

    return this.apiService.success(user);
  }

  @Post('register')
  async register(@Body() data: UserRegisterDto) {
    const user = await this.authService.registerUser(data);

    return this.apiService.success(user);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return this.apiService.success(req.user);
  }
}
