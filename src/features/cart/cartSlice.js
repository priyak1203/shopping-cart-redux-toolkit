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
  },
});

// console.log(cartSlice);

export const { clearCart } = cartSlice.actions;

export default cartSlice.reducer;
