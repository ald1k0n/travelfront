import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import hotelService from "./hotelService";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  location: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Get searched hotels

export const getSearchedHotels = createAsyncThunk(
  "hotels/getSearched",
  async (searchData, thunkAPI) => {
    try {
      return await hotelService.getSearchedHotels({
        params: { location: searchData },
      });
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

// Get single hotel

export const getSingleHotel = createAsyncThunk(
  "hotels/getSingle",
  async (hotelId, thunkAPI) => {
    try {
      return await hotelService.getSingleHotel(hotelId);
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

export const hotelSlice = createSlice({
  name: "hotel",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
    filterByType: (state, action) => {
      const filterType = action.payload;
      const filteredHotels = state.allHotels.filter(
        (hotel) => hotel.type === filterType
      );
      return { ...state, filteredHotels, filterType };
    },
    // Action to remove the filter on hotels
    clearFilter: (state) => {
      return { ...state, filteredHotels: [], filterType: null };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addHotel.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.hotels.push(action.payload);
    });
  },
});

export const { reset, filterByType, clearFilter } = hotelSlice.actions;
export default hotelSlice.reducer;
