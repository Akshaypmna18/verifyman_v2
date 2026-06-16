import { useState, useEffect } from 'react';
import { VerificationServiceType, CreateRequestData } from '../request-types';

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

// In-memory storage
let requests: VerificationRequest[] = [];
const listeners = new Set<() => void>();

const notify = () => {
  listeners.forEach(listener => listener());
};

export const useRequests = (): VerificationRequest[] => {
  const [data, setData] = useState(requests);

  useEffect(() => {
    const listener = () => setData([...requests]);
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);

  return data;
};

export const getRequestById = (id: string): VerificationRequest | undefined => {
  return requests.find(r => r.id === id);
};

export const addRequest = (data: CreateRequestData) => {
  const newRequest: VerificationRequest = {
    id: Math.random().toString(36).substring(7),
    referenceNumber: `VRF-${Math.floor(10000 + Math.random() * 90000)}`,
    candidateName: `${data.candidate.firstName} ${data.candidate.lastName}`,
    serviceType: data.serviceType,
    status: 'pending',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    data,
  };
  requests.push(newRequest);
  notify();
  return newRequest;
};

export const updateRequest = (id: string, data: CreateRequestData) => {
  const index = requests.findIndex(r => r.id === id);
  if (index !== -1) {
    requests[index] = {
      ...requests[index],
      candidateName: `${data.candidate.firstName} ${data.candidate.lastName}`,
      serviceType: data.serviceType,
      updatedAt: new Date().toISOString(),
      data,
    };
    notify();
    return requests[index];
  }
  return undefined;
};
