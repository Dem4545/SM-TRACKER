import { Employee, BOC, VRF, Document } from '../types';
import { ApiResponse, PaginationParams, SearchParams } from './types';
import { generateId } from '../utils';

// Base API URL - would be configured based on environment
const API_BASE_URL = '/api/v1';

// Generic API request handler
async function apiRequest<T>(
  endpoint: string,
  method: string = 'GET',
  body?: any
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

// Employee endpoints
export const employeeApi = {
  getAll: (params?: SearchParams & PaginationParams) =>
    apiRequest<Employee[]>(`/employees${params ? `?${new URLSearchParams(params as any)}` : ''}`),

  getById: (id: string) =>
    apiRequest<Employee>(`/employees/${id}`),

  create: (employee: Omit<Employee, 'id'>) =>
    apiRequest<Employee>('/employees', 'POST', employee),

  update: (id: string, employee: Partial<Employee>) =>
    apiRequest<Employee>(`/employees/${id}`, 'PUT', employee),

  delete: (id: string) =>
    apiRequest<void>(`/employees/${id}`, 'DELETE'),

  uploadDocument: async (employeeId: string, documentType: 'passport' | 'boc' | 'vrf', file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    
    try {
      const response = await fetch(`${API_BASE_URL}/employees/${employeeId}/documents/${documentType}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  },

  getDocuments: (employeeId: string, documentType: 'passport' | 'boc' | 'vrf') =>
    apiRequest<Document[]>(`/employees/${employeeId}/documents/${documentType}`),
};

// BOC endpoints
export const bocApi = {
  getAll: (params?: SearchParams & PaginationParams) =>
    apiRequest<BOC[]>(`/bocs${params ? `?${new URLSearchParams(params as any)}` : ''}`),

  getById: (id: string) =>
    apiRequest<BOC>(`/bocs/${id}`),

  create: (boc: Omit<BOC, 'id' | 'bocExpiryDays' | 'status'>) =>
    apiRequest<BOC>('/bocs', 'POST', boc),

  update: (id: string, boc: Partial<BOC>) =>
    apiRequest<BOC>(`/bocs/${id}`, 'PUT', boc),

  delete: (id: string) =>
    apiRequest<void>(`/bocs/${id}`, 'DELETE'),

  getExpiring: (daysThreshold: number = 7) =>
    apiRequest<BOC[]>(`/bocs/expiring?days=${daysThreshold}`),
};

// VRF endpoints
export const vrfApi = {
  getAll: (params?: SearchParams & PaginationParams) =>
    apiRequest<VRF[]>(`/vrfs${params ? `?${new URLSearchParams(params as any)}` : ''}`),

  getById: (id: string) =>
    apiRequest<VRF>(`/vrfs/${id}`),

  create: (vrf: Omit<VRF, 'id' | 'vrfExpiryDays' | 'status'>) =>
    apiRequest<VRF>('/vrfs', 'POST', vrf),

  update: (id: string, vrf: Partial<VRF>) =>
    apiRequest<VRF>(`/vrfs/${id}`, 'PUT', vrf),

  delete: (id: string) =>
    apiRequest<void>(`/vrfs/${id}`, 'DELETE'),

  getExpiring: (daysThreshold: number = 7) =>
    apiRequest<VRF[]>(`/vrfs/expiring?days=${daysThreshold}`),
};
