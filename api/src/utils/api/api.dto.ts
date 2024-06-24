// type ApiResponseData<TData> = TData;

import { Type, applyDecorators } from "@nestjs/common";
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from "@nestjs/swagger";

export class ApiSuccessResponse<T> {
  success: boolean;
  // data?: T;
  message?: string;
  statusCode: number;
}

export class ApiErrResponse {
  success: boolean;
  statusCode: number;
  message?: string;
  errors?: Array<object> | object;
}

export class ApiOptionalBodyParams<T> {
  data?: T;
  message?: string;
  errors?: Array<object> | object;
}

export const ApiModelSuccessResponse = <TModel extends Type<any>>(
  model: TModel,
) => {
  return applyDecorators(
    ApiExtraModels(ApiSuccessResponse, model),
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(ApiSuccessResponse) },
          {
            properties: {
              data: {
                $ref: getSchemaPath(model),
                // allOf: [
                //   {
                //     properties: {
                //       items: {
                //         type: 'array',
                //         items: { $ref: getSchemaPath(model) },
                //       },
                //     },
                //   },
                // ],
              },
            },
          },
        ],
      },
    }),
  );
};