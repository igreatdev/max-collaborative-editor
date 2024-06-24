import { useCallback } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import api from '../api';
import { DOCUMENT_DETAILS_URL, DOCUMENTS_URL } from '../constants';
import { DocumentResponseType, DocumentsResponseType, DocumentType } from '../types/documents';
import { ApiPaginatedDataType } from '../types/api';

export const documentsKey = 'documents';
export const documentDetailsKey = 'document-details';
export const createDocumentKey = 'create-document';

export const getDocuments = async (params = { page: 1, size: 10 }) => {
  const { data: res }: { data: DocumentsResponseType } = await api.get(DOCUMENTS_URL, { params: params });

  return res.data;
};

export const useGetDocumentsQuery = (params = { page: 1, size: 10 }, config?: any) => {
  return useQuery<ApiPaginatedDataType<DocumentType>>({
    queryKey: [documentsKey, params],
    queryFn: useCallback(() => getDocuments(params), [params]),
    ...config,
    refetchOnWindowFocus: true,
    keepPreviousData: true,
    enabled: true,
    // initialData: initialDocumentsData,
  });
};

export const getDocumentDetails = async (id: number) => {
  const { data: res }: { data: DocumentResponseType } = await api.get(DOCUMENT_DETAILS_URL(id));

  return res.data;
};

export const useGetDocumentDetailsQuery = (id: number, config?: any) => {
  return useQuery<DocumentType>({
    queryKey: [documentDetailsKey, id],
    queryFn: useCallback(() => getDocumentDetails(id), [id]),
    ...config,
    refetchOnWindowFocus: false,
    keepPreviousData: false,
    enabled: true,
    // initialData: {},
  });
};

export const useCreateDocumentMutation = () => {
  const request = useCallback(async (data: { title: string }) => {
    console.log({ data });

    const response: { data: DocumentResponseType } = await api.post(DOCUMENTS_URL, data);

    return response.data;
  }, []);

  return useMutation({
    mutationFn: request,
    mutationKey: [createDocumentKey],
  });
};
