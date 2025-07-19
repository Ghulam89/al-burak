// authSlice.js
import { createSlice } from '@reduxjs/toolkit';


const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: sessionStorage.getItem('sessionAlive') ? true : false,
    user: sessionStorage.getItem('sessionAlive')? JSON.parse(localStorage.getItem('user_data')) 
      : null,

  },
  reducers: {
    login: (state) => {
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem('user_ID');
      localStorage.removeItem('user_data');
    },
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem('user_data', JSON.stringify(action.payload));
      localStorage.setItem('user_ID', action.payload.id);
    },
  },
});

export const { login, logout,setUser} = authSlice.actions;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectUser = (state) => state.auth.user;
export default authSlice.reducer;