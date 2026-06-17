import { RequestDto, CreateRequestDto, UpdateRequestDto } from './request.dto';
import { getBaseUrl } from '@/lib/config';

const BASE_URL = getBaseUrl();

class ApiError extends Error {
  constructor(public status: number, message: string, public data?: any) {
    super(message);
    this.name = 'ApiError';
  }
}

async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${BASE_URL}${path}`;
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new ApiError(response.status, errorData.error || 'API Request Failed', errorData);
  }

  return response.json();
}

export const apiClient = {
  getRequests: async (): Promise<{ requests: RequestDto[] }> => {
    return request('/api/requests');
  },

  getRequest: async (id: string): Promise<{ request: RequestDto }> => {
    return request(`/api/requests/${id}`);
  },

  createRequest: async (dto: CreateRequestDto): Promise<{ request: RequestDto }> => {
    return request('/api/requests', {
      method: 'POST',
      body: JSON.stringify(dto),
    });
  },

  updateRequest: async (id: string, dto: UpdateRequestDto): Promise<{ request: RequestDto }> => {
    return request(`/api/requests/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(dto),
    });
  },

  deleteRequest: async (id: string): Promise<{ deleted: boolean; id: string }> => {
    return request(`/api/requests/${id}`, {
      method: 'DELETE',
    });
  },
};
