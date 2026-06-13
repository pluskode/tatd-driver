import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isAuthenticated: false,
    loading: false,
    sessionLoaded: false,
    otpSession: null, // { code: '1234', expiresAt: timestamp }
  },
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setSessionLoaded(state, action) {
      state.sessionLoaded = action.payload;
    },
    setLoginSuccess(state, action) {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
      state.otpSession = null;
    },
    setOtpSession(state, action) {
      state.otpSession = action.payload;
      state.loading = false;
    },
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.otpSession = null;
    },
  },
});

export const { setLoading, setSessionLoaded, setLoginSuccess, setOtpSession, logout } =
  authSlice.actions;
export default authSlice.reducer;
