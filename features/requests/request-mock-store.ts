import { useState, useEffect } from 'react';
import { VerificationServiceType, CreateRequestData } from '../request-types';
import { requestToCreateDto, dtoToRequest, requestToUpdateDto } from './api/request.mapper';
import { RequestDto } from './api/request.dto';
import { apiClient } from './api/client';

export type RequestStatus = 
  | 'pending' 
  | 'running' 
  | 'completed' 
  | 'failed' 
  | 'insufficient' 
  | 'discrepancy';

export interface VerificationRequest {
  id: string;
  referenceNumber: string;
  candidateName: string;
  serviceType: VerificationServiceType;
  status: RequestStatus;
  createdAt: string;
  updatedAt: string;
  data: CreateRequestData;
}

// In-memory cache for simplicity during transition, but primary source is now API
let cachedRequests: VerificationRequest[] = [];
const listeners = new Set<() => void>();

const notify = () => {
  listeners.forEach(listener => listener());
};

export const useRequests = () => {
  const [data, setData] = useState(cachedRequests);
  const [loading, setLoading] = useState(cachedRequests.length === 0);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setLoading(true);
        const response = await apiClient.getRequests();
        const mapped = response.requests.map(dtoToRequest);
        cachedRequests = mapped;
        setData(mapped);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch requests:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch requests'));
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();

    const listener = () => setData([...cachedRequests]);
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);

  return { requests: data, loading, error };
};

export const getRequestById = async (id: string): Promise<VerificationRequest | undefined> => {
  try {
    const response = await apiClient.getRequest(id);
    return dtoToRequest(response.request);
  } catch (error) {
    console.error(`Failed to fetch request ${id}:`, error);
    return undefined;
  }
};

export const useRequest = (id: string) => {
  const [request, setRequest] = useState<VerificationRequest | undefined>(
    cachedRequests.find(r => r.id === id)
  );
  const [loading, setLoading] = useState(!request);

  useEffect(() => {
    const fetchRequest = async () => {
      setLoading(true);
      const data = await getRequestById(id);
      if (data) {
        setRequest(data);
        // Update cache
        const index = cachedRequests.findIndex(r => r.id === id);
        if (index !== -1) {
          cachedRequests[index] = data;
        } else {
          cachedRequests.push(data);
        }
        notify();
      }
      setLoading(false);
    };

    fetchRequest();
  }, [id]);

  return { request, loading };
};

export const addRequest = async (data: CreateRequestData) => {
  try {
    const dto = requestToCreateDto(data);
    const response = await apiClient.createRequest(dto);
    const newRequest = dtoToRequest(response.request);
    
    cachedRequests.push(newRequest);
    notify();
    return newRequest;
  } catch (error) {
    console.error('Failed to add request:', error);
    throw error;
  }
};

export const updateRequest = async (id: string, data: CreateRequestData) => {
  try {
    const dto = requestToCreateDto(data); // Using requestToCreateDto as a base for update as well, or we could have a specific mapper
    // Actually requestToUpdateDto exists in mapper but let's see if it's better
    const updateDto = requestToUpdateDto(data);
    const response = await apiClient.updateRequest(id, updateDto);
    const updatedRequest = dtoToRequest(response.request);

    const index = cachedRequests.findIndex(r => r.id === id);
    if (index !== -1) {
      cachedRequests[index] = updatedRequest;
      notify();
    }
    return updatedRequest;
  } catch (error) {
    console.error(`Failed to update request ${id}:`, error);
    throw error;
  }
};

export const deleteRequest = async (id: string) => {
  try {
    await apiClient.deleteRequest(id);
    cachedRequests = cachedRequests.filter(r => r.id !== id);
    notify();
  } catch (error) {
    console.error(`Failed to delete request ${id}:`, error);
    throw error;
  }
};
