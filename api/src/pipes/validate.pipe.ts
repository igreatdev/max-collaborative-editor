import { Injectable, ArgumentMetadata, ValidationPipe } from '@nestjs/common';
import { ValidationException } from 'src/exceptions';

@Injectable()
export class ValidateInputPipe extends ValidationPipe {
  constructor() {
    super({
      exceptionFactory: (errors) => {
        const errorObj = {};
        errors.map((error) => {
          const objErrors = Object.values(error.constraints);
          errorObj[error.property] = objErrors.length && objErrors[0];
        });

        throw new ValidationException(errorObj);
      },
    });
  }
  public async transform(value, metadata: ArgumentMetadata) {
    return await super.transform(value, metadata);
  }
}
