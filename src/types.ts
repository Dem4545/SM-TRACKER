export interface Employee {
  id: string;
  no: number;
  firstName: string;
  lastName: string;
  nationality: string;
  passportNumber: string;
  position: string;
  arrival: string;
  departure: string;
  bocNumber: string;
  bocExpiry: string;
  bocExpiryDays: number;
  badge: string;
  vrfNumber: string;
  vrfExpiry: string;
  vrfExpiryDays: number;
  email: string;
  mobilePhone: string;
  bloodType: string;
  note: string;
  documents?: {
    passport: Document[];
    boc: Document[];
    vrf: Document[];
  };
}

export interface BOC {
  id: string;
  bocNumber: string;
  bocIssued: string;
  bocExpiry: string;
  bocExpiryDays: number;
  status: 'Available' | 'Assigned' | 'Expired';
  assignedEmployeeId?: string;
  comments?: string;
}

export interface VRF {
  id: string;
  vrfNumber: string;
  vrfIssued: string;
  vrfExpiry: string;
  vrfExpiryDays: number;
  status: 'Available' | 'Assigned' | 'Expired';
  assignedEmployeeId?: string;
  access: string;
  comments?: string;
}

export interface Document {
  id: string;
  name: string;
  type: string;
  url: string;
  uploadDate: string;
}

export interface SortConfig {
  key: string;
  direction: 'asc' | 'desc';
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
