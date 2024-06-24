import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiService } from './utils/api/api.service';
import { ApiExcludeController } from '@nestjs/swagger';

@ApiExcludeController()
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly apiService: ApiService,
  ) {}

  @Get()
  getHello() {
    return this.apiService.success('Hello');
  }
}
