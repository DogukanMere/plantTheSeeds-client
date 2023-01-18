import { configureStore } from '@reduxjs/toolkit';
import productReducer from './features/product/productSlice';
import cartReducer from './features/cart/cartSlice';
import userReducer from './features/user/userSlice';
import orderReducer from './features/order/orderSlice';
import thunk from 'redux-thunk';

const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
    user: userReducer,
    order: orderReducer,
  },
  middleware: [thunk],
});

export default store;
