import { HttpStatus, Injectable } from '@nestjs/common';
import {
  ApiErrResponse,
  ApiOptionalBodyParams,
  ApiSuccessResponse,
} from './api.dto';
import * as _ from 'lodash';

@Injectable()
export class ApiService {
  ERR_MSG_UNAUTHORIZED = 'Unauthorized';

  _res<T>(
    data: ApiOptionalBodyParams<T>,
    success = true,
    code: number = HttpStatus.OK,
  ) {
    const responseBody: ApiSuccessResponse<T> | ApiErrResponse = {
      success: success,
      statusCode: code,
      ...data,
    };

    return responseBody;
  }

  success<T>(data: T): ApiSuccessResponse<T> {
    const resData = typeof data === 'string' ? { message: data } : { data };
    return this._res<T>(resData);
  }

  error(message: string, code: number, errors?: object): ApiErrResponse {
    message = !_.isEmpty(message) ? message : 'An Error occurred';
    code = !_.isNil(code) ? code : HttpStatus.BAD_REQUEST;

    const data = {
      message,
    };
    const resData = !_.isEmpty(errors) ? { ...data, errors: errors } : data;

    return this._res(resData, false, code);
  }
}
