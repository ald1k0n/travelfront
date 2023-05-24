import { createSlice } from "@reduxjs/toolkit";

const initialStateValues = {
  currentTab: 0,
  newHotelData: {},
  currServices: [],
};

export const adminSlice = createSlice({
  name: "admin",
  initialState: initialStateValues,
  reducers: {
    setCurrentTab: (state, action) => {
      state.currentTab = action.payload;
    },
    setNewHotelData: (state, action) => {
      state.newHotelData = action.payload;
    },
    setCurrServices: (state, action) => {
      state.currServices.push(action.payload);
    },
    rmCurrServices: (state, action) => {
      state.currServices = state.currServices.filter(
        (serv) => serv !== action.payload
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setCurrentTab,
  setNewHotelData,
  setCurrServices,
  rmCurrServices,
} = adminSlice.actions;

export default adminSlice.reducer;
