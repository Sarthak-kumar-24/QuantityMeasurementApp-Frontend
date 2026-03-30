import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  result: null,
  loading: false,
  error: null,
};

const measurementSlice = createSlice({
  name: "measurement",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.loading = true;
      state.error = null;
    },

    success: (state, action) => {
      state.loading = false;
      state.result = action.payload;
    },

    failure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    clearResult: (state) => {
      state.result = null;
      state.error = null;
    },
  },
});

export const { startLoading, success, failure, clearResult } =
  measurementSlice.actions;

export default measurementSlice.reducer;
