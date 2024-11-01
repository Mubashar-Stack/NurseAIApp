import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isToken: null,
  biometricStatus: false,
  userInfo: null,
};
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.isToken = action.payload;
    },
    setBioMetricStatus: (state, action) => {
      state.biometricStatus = action.payload;
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setToken, setBioMetricStatus, setUserInfo } = authSlice.actions;

export default authSlice.reducer;
