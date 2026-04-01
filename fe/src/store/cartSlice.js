import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    setCartLoading: (state) => {
      state.loading = true;
    },
    setCartItems: (state, action) => {
      state.items = action.payload;
      state.loading = false;
    },
    addCartItem: (state, action) => {
      const existing = state.items.find(item => item.id === action.payload.id);
      if (existing) {
        existing.quantity = action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
      state.loading = false;
    },
    updateCartItem: (state, action) => {
      const item = state.items.find(item => item.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
    removeCartItem: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
    },
    setCartError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setCartLoading, setCartItems, addCartItem, updateCartItem, removeCartItem, clearCart, setCartError } = cartSlice.actions;
export default cartSlice.reducer;
