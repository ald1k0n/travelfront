import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { API_URL_BASE, API_URL_PROXY } from "../../config/config";

export const priceApi = createApi({
  reducerPath: "priceApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL_PROXY}`,
  }),
  tagTypes: ["hotelPrice"],
  endpoints: (builder) => ({
    getHotelPrice: builder.query({
      query: (body) => ({
        url: `/hotels/price?agesArray=${
          body.agesArray !== "" && body.agesArray
        }&start=${body.start}&hotelId=${body.hotelId}&roomId=${
          body.roomId !== "" && body.roomId
        }&addExtraFood=${
          body.addExtraFood !== false && body.addExtraFood
        }&addRoomFood=${
          body.addRoomFood !== false && body.addRoomFood
        }&daysAmount=${
          body.daysAmount !== "" && body.daysAmount
        }&kidsFoodAmount=${
          body.kidsFoodAmount !== "" && body.kidsFoodAmount
        }&adultsFoodAmount=${
          body.adultsFoodAmount !== "" && body.adultsFoodAmount
        }&excursionsArray=${body.excursionsArray}`,
      }),
      providesTags: ["hotelPrice"],
    }),
    getSanatoriumPrice: builder.query({
      query: (body) => ({
        url: `/sanatoriums/price?agesArray=${
          body.agesArray !== "" && body.agesArray
        }&start=${body.start}&sanatoriumId=${body.sanatoriumId}&roomId=${
          body.roomId !== "" && body.roomId
        }&addExtraFood=${
          body.addExtraFood !== false && body.addExtraFood
        }&addRoomFood=${
          body.addRoomFood !== false && body.addRoomFood
        }&daysAmount=${
          body.daysAmount !== "" && body.daysAmount
        }&kidsFoodAmount=${
          body.kidsFoodAmount !== "" && body.kidsFoodAmount
        }&adultsFoodAmount=${
          body.adultsFoodAmount !== "" && body.adultsFoodAmount
        }&excursionsArray=${body.excursionsArray}`,
      }),
    }),
    getTourPrice: builder.query({
      query: (body) => ({
        url: `/tour/price?tourId=${
          body.tourId !== "" && body.tourId
        }&agesArray=${body.agesArray !== "" && body.agesArray}&start=${
          body.start !== "" && body.start
        }&daysAmount=${body.daysAmount !== "" && body.daysAmount}`,
      }),
    }),
    getCampPrice: builder.query({
      query: (body) => ({
        url: `/camps/price?campId=${
          body.campId !== "" && body.campId
        }&agesArray=${body.agesArray !== "" && body.agesArray}&start=${
          body.start !== "" && body.start
        }&daysAmount=${body.daysAmount !== "" && body.daysAmount}`,
      }),
    }),
  }),
});

export const {
  useGetHotelPriceQuery,
  useLazyGetHotelPriceQuery,
  useGetSanatoriumPriceQuery,
  useLazyGetSanatoriumPriceQuery,
  useGetTourPriceQuery,
  useLazyGetTourPriceQuery,
  useGetCampPriceQuery,
  useLazyGetCampPriceQuery,
} = priceApi;
