export interface ApiResponseType {
  success?: boolean;
  statusCode: number;
  message?: string;
  data?: object[] | object;
}

export interface ApiErrorResponseType extends ApiResponseType {
  message: string;
  errors?: object;
}

export interface ApiPaginatedDataType<T> {
  items: T[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
}
