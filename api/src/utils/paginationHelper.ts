import { Type, applyDecorators } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiOkResponse,
  ApiProperty,
  getSchemaPath,
} from '@nestjs/swagger';
import { ApiSuccessResponse } from './api/api.dto';

const DEFAULT_PAGE_SIZE = 20;

export class paginationReqQuery {
  @ApiProperty({ default: 1 })
  page: number;

  @ApiProperty({ required: false, default: 10 })
  size: number;
}

export const ApiPaginatedResponse = <TModel extends Type<any>>(
  model: TModel,
) => {
  return applyDecorators(
    ApiExtraModels(ApiSuccessResponse, PagingDataType, model),
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(ApiSuccessResponse) },
          {
            properties: {
              data: {
                allOf: [
                  { $ref: getSchemaPath(PagingDataType) },
                  {
                    properties: {
                      items: {
                        type: 'array',
                        items: { $ref: getSchemaPath(model) },
                      },
                    },
                  },
                ],
              },
            },
          },
        ],
      },
    }),
  );
};

class paginationQuery {
  limit: number;
  offset: number;
}

export class PagingDataType<TData> {
  @ApiProperty()
  items: TData[];

  @ApiProperty()
  totalItems: number;

  @ApiProperty()
  totalPages: number;

  @ApiProperty()
  currentPage: number;
}

export const preparePagination = (
  page: number,
  size: number,
): paginationQuery => {
  const limit = size ? +size : DEFAULT_PAGE_SIZE;
  const offset = page && page > 0 ? (page - 1) * limit : 0;

  return { limit, offset };
};

export const getPaginatedData = <T>(
  data: { count: number; rows: T[] },
  page: number,
  limit: number,
): PagingDataType<T> => {
  const { count: totalItems, rows: items } = data;
  const currentPage = page && page > 0 ? +page : 1;
  const totalPages = Math.ceil(
    totalItems / (limit ? limit : DEFAULT_PAGE_SIZE),
  );

  return { items, totalItems, totalPages, currentPage };
};
