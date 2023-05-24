import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import periodService from "./periodService";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  periods: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Add new hotel periods

export const addPeriods = createAsyncThunk(
  "periods/add",
  async (periods, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await periodService.addPeriods(periods, token);
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

// Add new sanatorium periods

export const addSanatoriumPeriods = createAsyncThunk(
  "periods/addSanatorium",
  async (periods, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await periodService.addSanatoriumPeriods(periods, token);
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

// Add new camp periods

export const addCampPeriods = createAsyncThunk(
  "periods/addCamp",
  async (periods, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await periodService.addCampPeriods(periods, token);
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

// Add new tour periods

export const addTourPeriods = createAsyncThunk(
  "periods/addTour",
  async (periods, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await periodService.addTourPeriods(periods, token);
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

// Delete a hotel period

export const deleteHotelPeriod = createAsyncThunk(
  "periods/delete",
  async (periodId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await periodService.deletePeriod(periodId, token);
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

// Delete a camp period

export const deleteCampPeriod = createAsyncThunk(
  "periods/deleteCamp",
  async (periodId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await periodService.deleteCampPeriod(periodId, token);
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

// Delete a tour period

export const deleteTourPeriod = createAsyncThunk(
  "periods/deleteTour",
  async (periodId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await periodService.deleteTourPeriod(periodId, token);
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

export const periodSlice = createSlice({
  name: "period",
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
    builder
      .addCase(addPeriods.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.periods.push(action.payload);
      })
      .addCase(deleteHotelPeriod.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.periods = state.periods.filter(
          (per) => per._id !== action.payload
        );
      })
      .addCase(addSanatoriumPeriods.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.periods.push(action.payload);
      });
  },
});

export const { reset } = periodSlice.actions;
export default periodSlice.reducer;
