import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// CREATE A NEW ORDER
export const createOrder = createAsyncThunk(
  '/orders/createOrder',
  async (props, thunkAPI) => {
    try {
      const { user } = thunkAPI.getState();
      const userToken = user.userInfo.token;
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`,
        },
      };
      const order = props;
      const { data } = await axios.post('/api/orders', order, config);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

// GET ORDER DETAILS
export const getOrderDetails = createAsyncThunk(
  '/orders/getOrderDetails',
  async (props, thunkAPI) => {
    try {
      const id = props;
      const { user } = thunkAPI.getState();
      const getUserToken = user.userInfo.token;
      const config = {
        headers: {
          Authorization: `Bearer ${getUserToken}`,
        },
      };

      const { data } = await axios.get(`/api/orders/${id}`, config);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

// GET MY ORDER LIST
export const getOrderList = createAsyncThunk(
  '/orders/getOrderList',
  async (props, thunkAPI) => {
    try {
      const { user } = thunkAPI.getState();
      const getUserToken = user.userInfo.token;
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getUserToken}`,
        },
      };

      const { data } = await axios.get(`/api/orders/orderlist`, config);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

////////////
// ADMIN ///
////////////

// List all Orders
export const listOrders = createAsyncThunk(
  '/orders/listOrders',
  async (props, thunkAPI) => {
    try {
      const { user } = thunkAPI.getState();
      const getUserToken = user.userInfo.token;
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getUserToken}`,
        },
      };

      const { data } = await axios.get(`/api/orders/`, config);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

// Mark an order as Delivered
export const setOrderDelivered = createAsyncThunk(
  '/orders/setOrderDelivered',
  async (props, thunkAPI) => {
    try {
      const id = props;
      const { user } = thunkAPI.getState();
      const getUserToken = user.userInfo.token;
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getUserToken}`,
        },
      };

      return await axios.put(`/api/orders/${id}/deliver`, {}, config);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

// Mark an order as Paid
export const setOrderPaid = createAsyncThunk(
  '/orders/setOrderPaid',
  async (props, thunkAPI) => {
    try {
      const id = props;
      const { user } = thunkAPI.getState();
      const getUserToken = user.userInfo.token;
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getUserToken}`,
        },
      };

      return await axios.put(`/api/orders/${id}/pay`, {}, config);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

// Make Farm Request
export const setFarmRequest = createAsyncThunk(
  '/orders/setFarmRequest',
  async (props, thunkAPI) => {
    try {
      const id = props;
      const { user } = thunkAPI.getState();
      const getUserToken = user.userInfo.token;
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getUserToken}`,
        },
      };

      return await axios.put(`/api/orders/${id}/request`, {}, config);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

// Delete product / Admin
export const deleteOrder = createAsyncThunk(
  '/products/deleteOrder',
  async (props, thunkAPI) => {
    try {
      const id = props;
      const { user } = thunkAPI.getState();
      const { userInfo } = user;
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      return await axios.delete(`/api/orders/${id}`, config);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

// Reduce available seed amount from db
export const reduceAmountInStock = createAsyncThunk(
  '/users/reduceAmountInStock',
  async (props, thunkAPI) => {
    try {
      const productUpdateInfo = props;
      const { id } = props;
      const { user } = thunkAPI.getState();
      const { userInfo } = user;
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.put(
        `/api/orders/${id}`,
        productUpdateInfo,
        config
      );
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

// INITIAL VARIABLES
const initialState = {
  // Admin Variables
  orderList: [],
  successOrder: false,
  loadingOrderDetail: true,
  successDeliver: false,
  errorDeliver: '',
  loadingDeliver: false,
  successPayment: false,
  errorPayment: '',
  loadingPayment: false,
  loadingDelete: false,
  errorDelete: '',
  successDelete: false,
  successNewOrder: false,
  loadingUpdate: true,
  errorUpdate: '',
  successUpdate: false,
  loadingRequest: false,
  errorRequest: '',
  successRequest: false,
  // User Variables
  loadingOrder: true,
  success: false,
  order: {},
  error: '',
  orderDetails: {},
  orders: [],
};

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    removeOrderDetails: (state) => {
      state.order = {};
      state.orders = [];
      state.orderDetails = {};
    },
    emptyOrder: (state) => {
      state.order = {};
    },
    resetDeleteSuccess: (state) => {
      state.successDelete = false;
    },
    resetRequestSuccess: (state) => {
      state.successRequest = false;
    },
  },
  extraReducers: {
    // Create Order
    [createOrder.pending]: (state) => {
      state.loadingOrder = true;
      state.error = '';
      state.successNewOrder = false;
    },
    [createOrder.fulfilled]: (state, action) => {
      state.loadingOrder = false;
      state.order = action.payload;
      state.orderDetails = action.payload;
      state.successNewOrder = true;
    },
    [createOrder.rejected]: (state, action) => {
      state.loadingOrder = false;
      state.error = action.payload;
      state.successNewOrder = false;
    },

    // Get Order by Id
    [getOrderDetails.pending]: (state) => {
      state.loadingOrder = true;
      state.error = '';
      state.success = false;
    },
    [getOrderDetails.fulfilled]: (state, action) => {
      state.loadingOrder = false;
      state.orderDetails = action.payload;
      state.success = true;
      state.successNewOrder = false;
    },
    [getOrderDetails.rejected]: (state, action) => {
      state.loadingOrder = false;
      state.error = action.payload;
      state.success = false;
    },

    // Get My Order List
    [getOrderList.pending]: (state) => {
      state.loadingOrder = true;
      state.error = '';
      state.success = false;
    },
    [getOrderList.fulfilled]: (state, action) => {
      state.loadingOrder = false;
      state.orders = action.payload;
      state.success = true;
    },
    [getOrderList.rejected]: (state, action) => {
      state.loadingOrder = false;
      state.error = action.payload;
      state.success = false;
    },

    // Make farm request
    [setFarmRequest.pending]: (state) => {
      state.succesRequest = false;
      state.errorRequest = '';
      state.loadingRequest = true;
    },
    [setFarmRequest.fulfilled]: (state, action) => {
      state.successRequest = true;
      state.loadingRequest = false;
    },
    [setFarmRequest.rejected]: (state, action) => {
      state.errorRequest = action.payload;
      state.succesRequest = false;
      state.loadingRequest = false;
    },

    ////////////
    // ADMIN ///
    ////////////

    // Get All Orders / Admin
    [listOrders.pending]: (state) => {
      state.loadingOrderDetail = true;
      state.error = '';
      state.successOrder = false;
    },
    [listOrders.fulfilled]: (state, action) => {
      state.loadingOrderDetail = false;
      state.orderList = action.payload;
      state.successOrder = true;
    },
    [listOrders.rejected]: (state, action) => {
      state.loadingOrderDetail = false;
      state.error = action.payload;
      state.successOrder = false;
    },

    // Mark an order as Delivered / Admin
    [setOrderDelivered.pending]: (state) => {
      state.successDeliver = false;
      state.errorDeliver = '';
      state.loadingDeliver = true;
    },
    [setOrderDelivered.fulfilled]: (state, action) => {
      state.successDeliver = true;
      state.loadingDeliver = false;
    },
    [setOrderDelivered.rejected]: (state, action) => {
      state.errorDeliver = action.payload;
      state.successDeliver = false;
      state.loadingDeliver = false;
    },

    // Mark an order as Paid / Admin
    [setOrderPaid.pending]: (state) => {
      state.successPayment = false;
      state.errorPayment = '';
      state.loadingPayment = true;
    },
    [setOrderPaid.fulfilled]: (state, action) => {
      state.successPayment = true;
      state.loadingPayment = false;
    },
    [setOrderPaid.rejected]: (state, action) => {
      state.errorPayment = action.payload;
      state.successPayment = false;
      state.loadingPayment = false;
    },

    // Delete single order
    // DELETE - /api/orders/:id
    [deleteOrder.pending]: (state) => {
      state.loadingDelete = true;
      state.errorDelete = '';
    },
    [deleteOrder.fulfilled]: (state, action) => {
      state.loadingDelete = false;
      state.successDelete = true;
    },
    [deleteOrder.rejected]: (state, action) => {
      state.loadingDelete = false;
      state.errorDelete = action.payload;
    },
    // Update amount in stock
    // PUT - /api/orders
    [reduceAmountInStock.pending]: (state) => {
      state.loadingUpdate = true;
      state.errorUpdate = '';
      state.successUpdate = false;
    },
    [reduceAmountInStock.fulfilled]: (state, action) => {
      state.loadingUpdate = false;
      state.successUpdate = true;
    },
    [reduceAmountInStock.rejected]: (state, action) => {
      state.loadingUpdate = false;
      state.errorUpdate = action.payload;
    },
  },
});

export const {
  removeOrderDetails,
  resetDeleteSuccess,
  emptyOrder,
  resetRequestSuccess,
} = orderSlice.actions;
export default orderSlice.reducer;
