import { createSlice } from '@reduxjs/toolkit';

import cartItems from '../../cartItems';

const initialState = {
  cartItems: cartItems,
  amount: 12,
  total: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },

    removeItem: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
    },

    increase: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload.id);
      cartItem.amount += 1;
    },

    decrease: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload.id);
      cartItem.amount -= 1;
    },

    calculateTotals: (state) => {
      let amount = 0;
      let total = 0;
      state.cartItems.forEach((item) => {
        amount += item.amount;
        total += item.amount * item.price;
      });

      total = parseFloat(total.toFixed(2));

      state.amount = amount;
      state.total = total;
    },

    toggleAmount: (state, { payload }) => {
      const { id, type } = payload;
      const cartItem = state.cartItems.find((item) => item.id === id);
      if (type === 'inc') {
        cartItem.amount += 1;
      }
      if (type === 'dec') {
        cartItem.amount -= 1;
      }
    },
  },
});

// console.log(cartSlice);

export const {
  clearCart,
  removeItem,
  increase,
  decrease,
  calculateTotals,
  toggleAmount,
} = cartSlice.actions;

export default cartSlice.reducer;
