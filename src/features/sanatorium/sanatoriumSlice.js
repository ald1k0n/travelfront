import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import sanatoriumService from "./sanatoriumService";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  sanatoriums: [],
  singleSanatorium: {},
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
  filteredSanatoriums: [],
  filterType: null,
};

// Get all sanatoriums

export const getSanatoriums = createAsyncThunk(
  "sanatoriums/getAll",
  async (_, thunkAPI) => {
    try {
      return await sanatoriumService.getSanatoriums();
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

// Get all sanatoriums

export const addSanatorium = createAsyncThunk(
  "sanatoriums/add",
  async (sanatoriumData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await sanatoriumService.addSanatorium(sanatoriumData, token);
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

// Update sanatorium

export const updateSanatorium = createAsyncThunk(
  "sanatoriums/update",
  async (sanatoriumData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await sanatoriumService.updateSanatorium(sanatoriumData, token);
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

// Get single sanatorium by id

export const getSingleSanatorium = createAsyncThunk(
  "sanatoriums/getSingle",
  async (sanatoriumId, thunkAPI) => {
    try {
      return await sanatoriumService.getSingleSanatorium(sanatoriumId);
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

// Get searched sanatoriums

export const getSearchedSanatoriums = createAsyncThunk(
  "sanatoriums/getSearched",
  async (searchData, thunkAPI) => {
    try {
      return await sanatoriumService.getSearchedSanatoriums(
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

export const sanatoriumSlice = createSlice({
  name: "sanatorium",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
    setFilterData: (state, action) => {
      state.sanatoriums = action.payload;
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
      state.sanatoriums.sort((a, b) => {
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
      state.sanatoriums.sort((a, b) => {
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
      .addCase(getSanatoriums.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.sanatoriums = action.payload;
      })
      .addCase(getSingleSanatorium.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.singleSanatorium = action.payload;
      })
      .addCase(getSearchedSanatoriums.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.sanatoriums = action.payload;
      })
      .addCase(updateSanatorium.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.singleSanatorium = action.payload;
      });
  },
});

export const selectSanatoriums = (state) => {
  const {
    filterMaxPrice,
    filterMinPrice,
    filterFood,
    filterRating,
    filterStars,
  } = state.sanatoriums.filterData;
  let filteredSanatoriums = state.sanatoriums.sanatoriums;

  // Filter the hotels array based on the filter data

  if (filterMaxPrice) {
    filteredSanatoriums = filteredSanatoriums.filter(
      (hotel) => hotel.totalPrice <= filterMaxPrice
    );
  }
  if (filterMinPrice) {
    filteredSanatoriums = filteredSanatoriums.filter(
      (hotel) => hotel.totalPrice >= filterMinPrice
    );
  }
  if (filterFood && filterFood.length > 0) {
    filteredSanatoriums = filteredSanatoriums.filter((hotel) => {
      return filterFood.some((el) => hotel?.food?.foodType === el);
    });
  }
  // if (filterStars) {
  //   filteredSanatoriums = filteredSanatoriums.filter((hotel) => {
  //     return hotel.hotelStars === filterStars;
  //   });
  // }
  return filteredSanatoriums;
};

export const {
  reset,
  clearFilterData,
  setFilterData,
  sortAlphAsc,
  sortAlphDesc,
} = sanatoriumSlice.actions;
export default sanatoriumSlice.reducer;
