import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import hotelService from "./hotelService";

const initialState = {
  hotels: [],
  singleHotel: {},
  filterData: {
    filterRating: [],
    filterMaxPrice: null,
    filterMinPrice: null,
    filterFood: [],
    filterStars: null,
  },
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  filteredHotels: [],
  filterType: null,
  currentHotel: {},
};

// Add hotel

export const addHotel = createAsyncThunk(
  "hotels/add",
  async (hotelData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await hotelService.addHotel(hotelData, token);
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

// Update hotel

export const updateHotel = createAsyncThunk(
  "hotels/update",
  async (hotelData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await hotelService.updateHotel(hotelData, token);
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

// Update hotel periods

export const updateHotelPeriods = createAsyncThunk(
  "hotels/updatePeriods",
  async (periodsData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await hotelService.updateHotelPeriods(periodsData, token);
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

// Delete hotel period

export const deletePeriod = createAsyncThunk(
  "hotels/deletePeriod",
  async (periodData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await hotelService.deletePeriod(periodData, token);
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

// Get all hotels

export const getHotels = createAsyncThunk(
  "hotels/getAll",
  async (_, thunkAPI) => {
    try {
      return await hotelService.getHotels();
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

// Get searched hotels

export const getSearchedHotels = createAsyncThunk(
  "hotels/getSearched",
  async (searchData, thunkAPI) => {
    try {
      return await hotelService.getSearchedHotels(
        searchData.locationId,
        searchData.peopleAmount,
        searchData.daysAmount,
        searchData.start,
        searchData.adultsAmount,
        searchData.kidsAmount
      );
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

// Get all admin hotels

export const getAdminHotels = createAsyncThunk(
  "hotels/getAdminHotels",
  async (searchData, thunkAPI) => {
    try {
      return await hotelService.getAdminHotels(
        searchData.name,
        searchData.minAge,
        searchData.locationId
      );
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
    setFilterData: (state, action) => {
      state.hotels = action.payload;
    },
    clearFilterData: (state) => {
      state.filterData = {
        filterMaxPrice: null,
        filterMinPrice: null,
        filterFood: [],
        filterRating: null,
      };
    },
    sortAlphAsc: (state) => {
      state.hotels.sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        } else if (a.name > b.name) {
          return 1;
        } else {
          return 0;
        }
      });
    },
    sortAlphDesc: (state) => {
      state.hotels.sort((a, b) => {
        if (a.name > b.name) {
          return -1;
        } else if (a.name < b.name) {
          return 1;
        } else {
          return 0;
        }
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addHotel.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.hotels.push(action.payload);
        state.currentHotel = action.payload;
      })
      .addCase(getHotels.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.hotels = action.payload;
      })
      .addCase(getSearchedHotels.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.hotels = action.payload;
      })
      .addCase(getSingleHotel.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.singleHotel = action.payload;
      })
      .addCase(getSingleHotel.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAdminHotels.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.hotels = action.payload;
      })
      .addCase(updateHotel.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.singleHotel = action.payload;
      });
  },
});

export const selectHotels = (state) => {
  const {
    filterMaxPrice,
    filterMinPrice,
    filterFood,
    filterRating,
    filterStars,
  } = state.hotels.filterData;
  let filteredHotels = state.hotels.hotels;

  // Filter the hotels array based on the filter data

  if (filterMaxPrice) {
    filteredHotels = filteredHotels.filter(
      (hotel) => hotel.totalPrice <= filterMaxPrice
    );
  }
  if (filterMinPrice) {
    filteredHotels = filteredHotels.filter(
      (hotel) => hotel.totalPrice >= filterMinPrice
    );
  }
  if (filterFood && filterFood.length > 0) {
    filteredHotels = filteredHotels.filter((hotel) => {
      return filterFood.some((el) => hotel?.food?._id === el);
    });
  }
  if (filterStars) {
    filteredHotels = filteredHotels.filter((hotel) => {
      return hotel.hotelStars === filterStars;
    });
  }
  return filteredHotels;
};

export const {
  reset,
  setFilterData,
  clearFilterData,
  sortAlphAsc,
  sortAlphDesc,
} = hotelSlice.actions;
export default hotelSlice.reducer;
