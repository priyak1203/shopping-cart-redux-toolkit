import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { openModal } from '../modal/modalSlice';

const url = 'https://course-api.com/react-useReducer-cart-projects';

const initialState = {
  isLoading: true,
  cartItems: [],
  amount: 12,
  total: 0,
};

export const getCartItems = createAsyncThunk(
  'cart/getCartItems',
  async (name, thunkAPI) => {
    try {
      // console.log(name);
      // console.log(thunkAPI);
      // console.log(thunkAPI.getState());
      // thunkAPI.dispatch(openModal());

      const response = await axios(url);
      return response.data;
    } catch (error) {
      // console.log(error);
      // return thunkAPI.rejectWithValue('something went wrong');
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

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
  extraReducers: {
    [getCartItems.pending]: (state) => {
      state.isLoading = true;
    },

    [getCartItems.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.cartItems = action.payload;
    },

    [getCartItems.rejected]: (state, action) => {
      console.log(action);
      console.log(action.payload);
      state.isLoading = false;
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
