import { ApiPaginatedDataType, ApiResponseType } from './api';

export interface DocumentsResponseType extends ApiResponseType {
  data: ApiPaginatedDataType<DocumentType>;
}

export interface DocumentResponseType extends ApiResponseType {
  data: DocumentType;
}

export interface DocumentType {
  id: number;
  title: string;
  content: string;
  user: string;
  created_at: string;
  updated_at: string;
}
