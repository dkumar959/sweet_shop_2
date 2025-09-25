import api from './api';
import { Sweet } from '../store/slices/sweetsSlice';

// Mock data for demonstration
const mockSweets: Sweet[] = [
  {
    id: '1',
    name: 'Rainbow Lollipops',
    category: 'Lollipops',
    price: 2.50,
    stock: 25,
    description: 'Colorful swirl lollipops with fruity flavors',
  },
  {
    id: '2',
    name: 'Gummy Bears',
    category: 'Gummies',
    price: 4.99,
    stock: 50,
    description: 'Classic chewy gummy bears in assorted flavors',
  },
  {
    id: '3',
    name: 'Chocolate Truffles',
    category: 'Chocolate',
    price: 12.99,
    stock: 15,
    description: 'Premium dark chocolate truffles with cream filling',
  },
  {
    id: '4',
    name: 'Strawberry Bon Bons',
    category: 'Hard Candy',
    price: 3.75,
    stock: 30,
    description: 'Traditional strawberry flavored hard candies',
  },
  {
    id: '5',
    name: 'Sour Worms',
    category: 'Gummies',
    price: 5.50,
    stock: 0,
    description: 'Tangy sour gummy worms that pack a punch',
  },
  {
    id: '6',
    name: 'Cotton Candy',
    category: 'Specialty',
    price: 6.00,
    stock: 20,
    description: 'Fluffy spun sugar in pink and blue',
  },
];

export const sweetsService = {
  getSweets: async () => {
    // Mock API call - replace with actual API
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: mockSweets });
      }, 500);
    });
  },

  addSweet: async (sweetData: Omit<Sweet, 'id'>) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newSweet = {
          ...sweetData,
          id: Math.random().toString(),
        };
        resolve({ data: newSweet });
      }, 500);
    });
  },

  updateSweet: async (id: string, sweetData: Partial<Sweet>) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: { ...sweetData, id } });
      }, 500);
    });
  },

  deleteSweet: async (id: string) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: { success: true } });
      }, 500);
    });
  },

  purchaseSweet: async (id: string, quantity: number = 1) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const sweet = mockSweets.find(s => s.id === id);
        if (sweet && sweet.stock >= quantity) {
          resolve({ data: { success: true } });
        } else {
          reject(new Error('Insufficient stock'));
        }
      }, 500);
    });
  },
};