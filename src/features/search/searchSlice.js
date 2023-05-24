import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  refetch: () => {},
  searchData: {
    locationId: "", // all KZ initially
    locationName: "Весь Казахстан",
    daysAmount: 1, // 1 day initially
    agesArray: [1000], // initially 1 adult
    start: "1685556000000",
    end: "1685642400000",
    searchNameId: "",
    filterFood: [],
    filterServices: [],
    filterStars: "",
    filterRating: [],
    filterExtraPlaces: true,
    filterBathroom: "",
    filterDuration: "",
    filterPaymentType: "",
  },
};

const searchSlice = createSlice({
  name: "Search",
  initialState,
  reducers: {
    setRefetch: (state, action) => {
      state.refetch = action.payload;
    },
    setSearchData: (state, action) => {
      state.searchData = action.payload;
    },
  },
});
export const { setRefetch, setSearchData } = searchSlice.actions;
export default searchSlice.reducer;
