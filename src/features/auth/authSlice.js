import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Simulate API login (real app will call backend)
export const loginUser = createAsyncThunk("auth/loginUser", async (credentials) => {
  const { username, password } = credentials;
  // Fake check
  if (username === "admin" && password === "admin") {
    return { username: "admin", token: "fake_jwt_token_123" };
  } else {
    throw new Error("Invalid credentials");
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    isLoggedIn: false,
    status: "idle",
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.username;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
