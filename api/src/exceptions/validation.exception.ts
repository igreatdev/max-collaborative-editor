import { BadRequestException } from '@nestjs/common';
import { ApiService } from 'src/utils/api/api.service';

export class ValidationException extends BadRequestException {
  constructor(errors: object) {
    const apiService = new ApiService();
    super(apiService.error('Validation Error', 400, errors));
  }
}
