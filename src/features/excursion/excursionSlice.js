import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import excursionService from "./excursionService";

const initialState = {
  excursions: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Get searched hotels

export const getExcursions = createAsyncThunk(
  "excursions/getAll",
  async (locationId, thunkAPI) => {
    try {
      return await excursionService.getExcursions(locationId);
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

export const excursionSlice = createSlice({
  name: "excursion",
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
    builder.addCase(getExcursions.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.excursions = action.payload;
    });
  },
});

export const { reset } = excursionSlice.actions;
export default excursionSlice.reducer;
