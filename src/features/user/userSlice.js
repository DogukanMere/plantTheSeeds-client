import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Get user information from local storage if available
const userInfoFromLocalStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

// Login user
export const loginUser = createAsyncThunk(
  '/users/loginUser',
  async (props, thunkAPI) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const { email, password } = props;
      const { data } = await axios.post(
        '/api/users/login',
        { email, password },
        config
      );
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

// Register a new user
export const registerUser = createAsyncThunk(
  '/users/registerUser',
  async (props, thunkAPI) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const { name, email, password } = props;
      const { data } = await axios.post(
        '/api/users',
        { name, email, password },
        config
      );
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

// Update user information
export const updateUserInfo = createAsyncThunk(
  '/users/updateUserInfo',
  async (props, thunkAPI) => {
    try {
      const userChangedInfo = props;
      const { user } = thunkAPI.getState();
      const { userInfo } = user;
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.put(
        `/api/users/profile`,
        userChangedInfo,
        config
      );
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

////////////
// ADMIN ///
////////////

// get user info (for admin)
export const getUserInfo = createAsyncThunk(
  '/users/getUserInfo',
  async (props, thunkAPI) => {
    try {
      const id = props;
      const { user } = thunkAPI.getState();
      const { userInfo } = user;
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.post('/api/users/info', { id }, config);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

// Get all users
export const listUsers = createAsyncThunk(
  '/users/listUsers',
  async (props, thunkAPI) => {
    try {
      const { user } = thunkAPI.getState();
      const { userInfo } = user;
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.get('/api/users', config);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

// Delete user
export const deleteUser = createAsyncThunk(
  '/users/deleteUser',
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
      return await axios.delete(`/api/users/${id}`, config);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

// Update user / Admin
export const updateUserByAdmin = createAsyncThunk(
  '/users/updateUserByAdmin',
  async (props, thunkAPI) => {
    try {
      const userNewInfo = props;
      const { user } = thunkAPI.getState();
      const { userInfo, userForAdmin } = user;
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.put(
        `/api/users/${userForAdmin._id}`,
        userNewInfo,
        config
      );
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

// Initial states for user store
const initialState = {
  // Admin variables
  users: [],
  loadingUsers: false,
  errorUsers: '',
  loadingDelete: false,
  errorDelete: '',
  userForAdmin: {},
  loadingUpdate: false,
  successUpdate: false,
  errorUpdateAdmin: '',

  // User variables
  userInfo: userInfoFromLocalStorage,
  loading: false,
  errorUser: '',
  errorRegister: '',
  success: false,
};

const userSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    // Log out user and delete information from both local storage and redux store
    logoutUser: (state, action) => {
      localStorage.removeItem('userInfo');
      state.userInfo = null;
    },
    resetDeleteSuccess: (state) => {
      state.success = false;
    },
  },
  extraReducers: {
    // get User
    [loginUser.pending]: (state) => {
      state.loading = true;
      state.errorUser = '';
    },
    [loginUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;
      localStorage.setItem('userInfo', JSON.stringify(state.userInfo));
    },
    [loginUser.rejected]: (state, action) => {
      state.loading = false;
      state.errorUser = action.payload;
    },

    // register User
    [registerUser.pending]: (state) => {
      state.loading = true;
      state.errorRegister = '';
      state.success = false;
    },
    [registerUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;
      localStorage.setItem('userInfo', JSON.stringify(state.userInfo));
    },
    [registerUser.rejected]: (state, action) => {
      state.loading = false;
      state.errorRegister = action.payload;
    },

    // user update Info
    [updateUserInfo.pending]: (state) => {
      state.loading = true;
      state.errorUpdate = '';
      state.success = false;
    },
    [updateUserInfo.fulfilled]: (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;
      state.success = true;
      localStorage.setItem('userInfo', JSON.stringify(state.userInfo));
    },
    [updateUserInfo.rejected]: (state, action) => {
      state.loading = false;
      state.errorUpdate = action.payload;
    },

    ////////////
    // ADMIN ///
    ////////////

    // get User for Admins
    [getUserInfo.pending]: (state) => {
      state.loading = true;
      state.errorUser = '';
    },
    [getUserInfo.fulfilled]: (state, action) => {
      state.loading = false;
      state.userForAdmin = action.payload;
    },
    [getUserInfo.rejected]: (state, action) => {
      state.loading = false;
      state.errorUser = action.payload;
    },

    // get all Users
    [listUsers.pending]: (state) => {
      state.loadingUsers = true;
      state.errorUsers = '';
      state.errorUpdateAdmin = '';
      state.successUpdate = false;
    },
    [listUsers.fulfilled]: (state, action) => {
      state.loadingUsers = false;
      state.users = action.payload;
    },
    [listUsers.rejected]: (state, action) => {
      state.loadingUsers = false;
      state.errorUsers = action.payload;
    },

    // delete User
    [deleteUser.pending]: (state) => {
      state.loadingDelete = true;
      state.errorDelete = '';
    },
    [deleteUser.fulfilled]: (state, action) => {
      state.loadingDelete = false;
      state.success = true;
    },
    [deleteUser.rejected]: (state, action) => {
      state.loadingDelete = false;
      state.errorDelete = action.payload;
    },

    // update User
    [updateUserByAdmin.pending]: (state) => {
      state.loadingUpdate = true;
      state.errorUpdateAdmin = '';
    },
    [updateUserByAdmin.fulfilled]: (state, action) => {
      state.loadingUpdate = false;
      state.userForAdmin = action.payload;
      state.successUpdate = true;
    },
    [updateUserByAdmin.rejected]: (state, action) => {
      state.loadingUpdate = false;
      state.errorUpdateAdmin = action.payload;
    },
  },
});

export const { logoutUser, resetDeleteSuccess } = userSlice.actions;
export default userSlice.reducer;
