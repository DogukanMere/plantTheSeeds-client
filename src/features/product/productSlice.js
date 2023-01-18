import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Fetch all products from db
export const fetchProducts = createAsyncThunk(
  '/products/fetchProducts',
  async (props, thunkAPI) => {
    try {
      const keyword = props ? props : '';
      const { data } = await axios.get(`/api/products?keyword=${keyword}`);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

// Fetch single product from db
export const fetchProduct = createAsyncThunk(
  '/products/fetchProduct',
  async (props, thunkAPI) => {
    try {
      const { data } = await axios.get(`/api/products/${props}`);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

/////////
//ADMIN//
/////////

// Create product / Admin
export const addProduct = createAsyncThunk(
  '/products/addProduct',
  async (props, thunkAPI) => {
    try {
      const { user } = thunkAPI.getState();
      const { userInfo } = user;
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
          'Content-Type': 'application/json',
        },
      };
      // const { name, price, description, availableInStock, image } = props;
      const { data } = await axios.post('/api/products', {}, config);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

// Delete product / Admin
export const deleteProduct = createAsyncThunk(
  '/products/deleteProduct',
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
      return await axios.delete(`/api/products/${id}`, config);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

// Update product / Admin
export const updateProductByAdmin = createAsyncThunk(
  '/users/updateProductByAdmin',
  async (props, thunkAPI) => {
    try {
      const productUpdateInfo = props;
      const { user, products } = thunkAPI.getState();
      const { userInfo } = user;
      const { product } = products;
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.put(
        `/api/products/${product._id}`,
        productUpdateInfo,
        config
      );
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

const initialState = {
  // Admin variables
  loadingDelete: false,
  errorDelete: '',
  successDelete: false,
  productAdded: {},
  successCreate: false,
  errorCreate: '',
  loadingCreate: false,
  errorUpdate: '',
  successUpdate: false,
  loadingUpdate: false,

  // User variables
  products: [],
  product: {},
  isLoading: true,
  errorProducts: '',
  errorProduct: '',
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    resetDeleteSuccess: (state) => {
      state.successDelete = false;
    },
  },
  extraReducers: {
    // All Products
    [fetchProducts.pending]: (state) => {
      state.isLoading = true;
      state.errorProducts = '';
      state.errorDelete = '';
      state.successUpdate = false;
    },
    [fetchProducts.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.products = action.payload.products;
    },
    [fetchProducts.rejected]: (state, action) => {
      state.isLoading = false;
      state.errorProducts = action.payload;
    },
    // Single Product
    [fetchProduct.pending]: (state) => {
      state.isLoading = true;
      state.errorProduct = '';
    },
    [fetchProduct.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.product = action.payload;
      state.successCreate = false;
    },
    [fetchProduct.rejected]: (state, action) => {
      state.isLoading = false;
      state.errorProduct = action.payload;
    },

    /////////
    //ADMIN//
    /////////

    // Create Product
    // POST - /api/products
    [addProduct.pending]: (state) => {
      state.loadingCreate = true;
      state.errorCreate = '';
    },
    [addProduct.fulfilled]: (state, action) => {
      state.loadingCreate = false;
      state.productAdded = action.payload;
      state.successCreate = true;
    },
    [addProduct.rejected]: (state, action) => {
      state.loadingCreate = false;
      state.errorCreate = action.payload;
    },

    // Delete single product
    // DELETE - /api/products/:id
    [deleteProduct.pending]: (state) => {
      state.loadingDelete = true;
      state.errorDelete = '';
    },
    [deleteProduct.fulfilled]: (state, action) => {
      state.loadingDelete = false;
      state.successDelete = true;
    },
    [deleteProduct.rejected]: (state, action) => {
      state.loadingDelete = false;
      state.errorDelete = action.payload;
    },
    // Update a product
    // PUT - /api/products/:id
    [updateProductByAdmin.pending]: (state) => {
      state.loadingUpdate = true;
      state.errorUpdate = '';
      state.successUpdate = false;
    },
    [updateProductByAdmin.fulfilled]: (state, action) => {
      state.loadingUpdate = false;
      state.successUpdate = true;
      state.product = action.payload;
    },
    [updateProductByAdmin.rejected]: (state, action) => {
      state.loadingUpdate = false;
      state.errorUpdate = action.payload;
    },
  },
});

export const { resetDeleteSuccess } = productSlice.actions;
export default productSlice.reducer;
