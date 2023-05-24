import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import roomService from "./roomService";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  rooms: [],
  singleRoom: {},
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

// Add room

export const addRoom = createAsyncThunk(
  "rooms/add",
  async (roomData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await roomService.addRoom(roomData, token);
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

// Get single room

export const getSingleRoom = createAsyncThunk(
  "rooms/getSingle",
  async (roomId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await roomService.getSingleRoom(roomId, token);
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

// Update room

export const updateRoom = createAsyncThunk(
  "rooms/getSingle",
  async (roomData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await roomService.updateRoom(roomData, token);
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

export const roomSlice = createSlice({
  name: "room",
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
      .addCase(addRoom.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.rooms.push(action.payload);
      })
      .addCase(getSingleRoom.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.singleRoom = action.payload;
      });
  },
});

export const { reset } = roomSlice.actions;
export default roomSlice.reducer;
