import api from './api';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const authService = {
  login: async (credentials: LoginCredentials) => {
    // Mock API call - replace with actual API
    return new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (credentials.email === 'admin@sweetshop.com' && credentials.password === 'admin123') {
          resolve({
            data: {
              user: {
                id: '1',
                name: 'Admin User',
                email: 'admin@sweetshop.com',
                role: 'admin' as const,
              },
              token: 'mock-jwt-token-admin',
            },
          });
        } else if (credentials.email === 'customer@sweetshop.com' && credentials.password === 'customer123') {
          resolve({
            data: {
              user: {
                id: '2',
                name: 'Customer User',
                email: 'customer@sweetshop.com',
                role: 'customer' as const,
              },
              token: 'mock-jwt-token-customer',
            },
          });
        } else {
          reject(new Error('Invalid email or password. Please check your credentials and try again.'));
        }
      }, 800);
    });
  },

  register: async (userData: RegisterData) => {
    // Mock API call - replace with actual API
    return new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (userData.password !== userData.confirmPassword) {
          reject(new Error('Passwords do not match'));
          return;
        }
        
        // Check if email already exists (mock check)
        if (userData.email === 'admin@sweetshop.com' || userData.email === 'customer@sweetshop.com') {
          reject(new Error('Email already exists. Please use a different email address.'));
          return;
        }
        
        resolve({
          data: {
            user: {
              id: Math.random().toString(),
              name: userData.username,
              email: userData.email,
              role: 'customer' as const,
            },
            token: 'mock-jwt-token-new-user',
          },
        });
      }, 800);
    });
  },
};