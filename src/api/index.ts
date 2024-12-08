// Export all API endpoints
export * from './endpoints';
export * from './types';

// For development/testing, you can switch between real and mock APIs
export const useDevApi = process.env.NODE_ENV === 'development';

export { mockEmployeeApi, mockBocApi, mockVrfApi } from './mock';
