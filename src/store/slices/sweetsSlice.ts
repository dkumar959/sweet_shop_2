import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Sweet {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  description?: string;
  image?: string;
}

interface SweetsState {
  sweets: Sweet[];
  filteredSweets: Sweet[];
  isLoading: boolean;
  error: string | null;
  searchTerm: string;
  selectedCategory: string;
  priceRange: [number, number];
  categories: string[];
}

const initialState: SweetsState = {
  sweets: [],
  filteredSweets: [],
  isLoading: false,
  error: null,
  searchTerm: '',
  selectedCategory: '',
  priceRange: [0, 100],
  categories: [],
};

const sweetsSlice = createSlice({
  name: 'sweets',
  initialState,
  reducers: {
    setSweetsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setSweetsSuccess: (state, action: PayloadAction<Sweet[]>) => {
      state.sweets = action.payload;
      state.filteredSweets = action.payload;
      state.categories = [...new Set(action.payload.map(sweet => sweet.category))];
      state.isLoading = false;
      state.error = null;
    },
    setSweetsError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    addSweet: (state, action: PayloadAction<Sweet>) => {
      state.sweets.push(action.payload);
      state.categories = [...new Set(state.sweets.map(sweet => sweet.category))];
      sweetsSlice.caseReducers.applyFilters(state);
    },
    updateSweet: (state, action: PayloadAction<Sweet>) => {
      const index = state.sweets.findIndex(sweet => sweet.id === action.payload.id);
      if (index !== -1) {
        state.sweets[index] = action.payload;
        state.categories = [...new Set(state.sweets.map(sweet => sweet.category))];
        sweetsSlice.caseReducers.applyFilters(state);
      }
    },
    deleteSweet: (state, action: PayloadAction<string>) => {
      state.sweets = state.sweets.filter(sweet => sweet.id !== action.payload);
      state.categories = [...new Set(state.sweets.map(sweet => sweet.category))];
      sweetsSlice.caseReducers.applyFilters(state);
    },
    purchaseSweet: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const sweet = state.sweets.find(s => s.id === action.payload.id);
      if (sweet && sweet.stock >= action.payload.quantity) {
        sweet.stock -= action.payload.quantity;
        sweetsSlice.caseReducers.applyFilters(state);
      }
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
      sweetsSlice.caseReducers.applyFilters(state);
    },
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
      sweetsSlice.caseReducers.applyFilters(state);
    },
    setPriceRange: (state, action: PayloadAction<[number, number]>) => {
      state.priceRange = action.payload;
      sweetsSlice.caseReducers.applyFilters(state);
    },
    applyFilters: (state) => {
      let filtered = state.sweets;

      if (state.searchTerm) {
        filtered = filtered.filter(sweet =>
          sweet.name.toLowerCase().includes(state.searchTerm.toLowerCase())
        );
      }

      if (state.selectedCategory) {
        filtered = filtered.filter(sweet => sweet.category === state.selectedCategory);
      }

      filtered = filtered.filter(
        sweet => sweet.price >= state.priceRange[0] && sweet.price <= state.priceRange[1]
      );

      state.filteredSweets = filtered;
    },
    clearFilters: (state) => {
      state.searchTerm = '';
      state.selectedCategory = '';
      state.priceRange = [0, 100];
      state.filteredSweets = state.sweets;
    },
  },
});

export const {
  setSweetsLoading,
  setSweetsSuccess,
  setSweetsError,
  addSweet,
  updateSweet,
  deleteSweet,
  purchaseSweet,
  setSearchTerm,
  setSelectedCategory,
  setPriceRange,
  clearFilters,
} = sweetsSlice.actions;

export default sweetsSlice.reducer;