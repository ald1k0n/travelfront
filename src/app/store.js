import { configureStore } from "@reduxjs/toolkit";

import hotelReducer from "../features/hotel/hotelSlice";
import authReducer from "../features/auth/authSlice";
import orderReducer from "../features/order/orderSlice";
import clientReducer from "../features/clientSlice";
import excursionReducer from "../features/excursion/excursionSlice";
import adminReducer from "../features/adminSlice";
import roomSlice from "../features/room/roomSlice";
import tourReducer from "../features/tour/tourSlice";
import campReducer from "../features/camps/campSlice";
import sanatoriumReducer from "../features/sanatorium/sanatoriumSlice";
import periodReducer from "../features/periods/periodSlice";
import searchSlice from "../features/search/searchSlice";

import { baseApi } from "../features/services/base.service";
import { editApi } from "../features/services/edit.service";
import { csvApi } from "../features/services/csv.service";
import { campApi } from "../features/services/camp.service";
import { priceApi } from "../features/services/price.service";

import { uploadApi } from "../features/services/upload.service";
import { filterApi } from "../features/services/filter.service";
import { userApi } from "../features/services/user.service";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    hotels: hotelReducer,
    orders: orderReducer,
    client: clientReducer,
    excursions: excursionReducer,
    admin: adminReducer,
    tour: tourReducer,
    camps: campReducer,
    sanatoriums: sanatoriumReducer,
    periods: periodReducer,
    search: searchSlice,
    [csvApi.reducerPath]: csvApi.reducer,
    [baseApi.reducerPath]: baseApi.reducer,
    [editApi.reducerPath]: editApi.reducer,
    [uploadApi.reducerPath]: uploadApi.reducer,
    rooms: roomSlice,
    [campApi.reducerPath]: campApi.reducer,
    [filterApi.reducerPath]: filterApi.reducer,
    [priceApi.reducerPath]: priceApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat([
      baseApi.middleware,
      editApi.middleware,
      csvApi.middleware,
      uploadApi.middleware,
      campApi.middleware,
      filterApi.middleware,
      priceApi.middleware,
      userApi.middleware,
    ]),
});
