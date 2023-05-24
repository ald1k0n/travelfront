import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import hotelServService from "./hotelServService";

const initialState = {
  hotelServices: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Add hotelservices

export const addService = createAsyncThunk(
  "hotelServices/add",
  async (serviceData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await hotelServService.addService(serviceData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const hotelServSlice = createSlice({
  name: "hotelService",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addService.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.hotelServices.push(action.payload);
    });
  },
});

export const { reset } = hotelServSlice.actions;
export default hotelServSlice.reducer;
