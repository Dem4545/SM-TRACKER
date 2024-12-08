import { Employee, BOC, VRF, Document } from '../types';
import { ApiResponse, PaginationParams, SearchParams } from './types';
import { generateId } from '../utils';

// Simulated database
let employees: Employee[] = [];
let bocs: BOC[] = [];
let vrfs: VRF[] = [];
let documents: Record<string, Document[]> = {};

// Helper functions
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const paginate = <T>(items: T[], { page, limit }: PaginationParams) => {
  const start = (page - 1) * limit;
  const end = start + limit;
  return items.slice(start, end);
};

const filterItems = <T extends Record<string, any>>(
  items: T[],
  { query, filters }: SearchParams
) => {
  let filtered = [...items];

  if (query) {
    const searchQuery = query.toLowerCase();
    filtered = filtered.filter(item =>
      Object.values(item).some(value =>
        String(value).toLowerCase().includes(searchQuery)
      )
    );
  }

  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      filtered = filtered.filter(item => item[key] === value);
    });
  }

  return filtered;
};

// Mock API implementations
export const mockEmployeeApi = {
  getAll: async (params?: SearchParams & PaginationParams): Promise<ApiResponse<Employee[]>> => {
    await delay(500);
    let result = [...employees];

    if (params) {
      if (params.query || params.filters) {
        result = filterItems(result, params);
      }
      if (params.page && params.limit) {
        result = paginate(result, params);
      }
    }

    return { success: true, data: result };
  },

  getById: async (id: string): Promise<ApiResponse<Employee>> => {
    await delay(300);
    const employee = employees.find(emp => emp.id === id);
    if (!employee) {
      return { success: false, error: 'Employee not found' };
    }
    return { success: true, data: employee };
  },

  create: async (employee: Omit<Employee, 'id'>): Promise<ApiResponse<Employee>> => {
    await delay(500);
    const newEmployee = { ...employee, id: generateId() };
    employees.push(newEmployee);
    return { success: true, data: newEmployee };
  },

  update: async (id: string, update: Partial<Employee>): Promise<ApiResponse<Employee>> => {
    await delay(500);
    const index = employees.findIndex(emp => emp.id === id);
    if (index === -1) {
      return { success: false, error: 'Employee not found' };
    }
    employees[index] = { ...employees[index], ...update };
    return { success: true, data: employees[index] };
  },

  delete: async (id: string): Promise<ApiResponse<void>> => {
    await delay(500);
    const index = employees.findIndex(emp => emp.id === id);
    if (index === -1) {
      return { success: false, error: 'Employee not found' };
    }
    employees.splice(index, 1);
    return { success: true };
  },

  uploadDocument: async (
    employeeId: string,
    documentType: 'passport' | 'boc' | 'vrf',
    file: File
  ): Promise<ApiResponse<Document>> => {
    await delay(1000);
    const document: Document = {
      id: generateId(),
      name: file.name,
      type: file.type,
      url: URL.createObjectURL(file),
      uploadDate: new Date().toISOString(),
    };

    if (!documents[employeeId]) {
      documents[employeeId] = [];
    }
    documents[employeeId].push(document);

    return { success: true, data: document };
  },

  getDocuments: async (
    employeeId: string,
    documentType: 'passport' | 'boc' | 'vrf'
  ): Promise<ApiResponse<Document[]>> => {
    await delay(300);
    return {
      success: true,
      data: documents[employeeId]?.filter(doc => doc.type === documentType) || [],
    };
  },
};

// Similar mock implementations for BOC and VRF APIs...
export const mockBocApi = {
  // Implementation similar to employeeApi
};

export const mockVrfApi = {
  // Implementation similar to employeeApi
};
