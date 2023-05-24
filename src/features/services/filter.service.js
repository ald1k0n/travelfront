import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL_BASE, API_URL_PROXY } from "../../config/config";

export const filterApi = createApi({
  reducerPath: "filterApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL_PROXY}`,
    credentials: "include",
  }),
  tagTypes: ["Filter"],
  endpoints: (builder) => ({
    getTourByFilter: builder.query({
      query: (filter) => ({
        url: `/tour/searched?dashMode=${
          filter.dashMode ? filter.dashMode : "false"
        }&minPrice=${filter.minPrice ? filter.minPrice : ""}&maxPrice=${
          filter.maxPrice ? filter.maxPrice : ""
        }&searchNameId=${
          filter.searchNameId ? filter.searchNameId : ""
        }&locationId=${filter.locationId && filter.locationId}&filterDuration=${
          filter.filterDuration && filter.filterDuration
        }&filterRating=${
          filter.filterRating && filter.filterRating
        }&filterFood=${
          filter.filterFood && filter.filterFood
        }&filterPaymentType=${
          filter.filterPaymentType && filter.filterPaymentType
        }&start=${filter.start && filter.start}&agesArray=${
          filter.agesArray && filter.agesArray
        }`,
      }),
      providesTags: [{ type: "Filter", id: "LIST" }],
    }),
    getHotelsByFilter: builder.query({
      query: (filter) => ({
        url: `/hotels/searched?dashMode=${
          filter.dashMode ? filter.dashMode : "false"
        }&minPrice=${filter.minPrice ? filter.minPrice : ""}&maxPrice=${
          filter.maxPrice ? filter.maxPrice : ""
        }&searchNameId=${
          filter.searchNameId ? filter.searchNameId : ""
        }&locationId=${filter.locationId ? filter.locationId : ""}&filterFood=${
          filter.filterFood ? filter.filterFood : ""
        }&filterStars=${
          filter.filterStars ? filter.filterStars : ""
        }&filterRating=${
          filter.filterRating ? filter.filterRating : ""
        }&start=${filter.start && filter.start}&agesArray=${
          filter.agesArray && filter.agesArray
        }&filterServices=${
          filter.filterServices ? filter.filterServices : ""
        }&filterBathroom=${
          filter.filterBathroom ? filter.filterBathroom : ""
        }&filterExtraPlaces=${
          filter.filterExtraPlaces ? filter.filterExtraPlaces : ""
        }&daysAmount=${filter.daysAmount && filter.daysAmount}`,
      }),
      providesTags: [{ type: "Filter", id: "LIST" }],
    }),
    getSanatoriumsByFilter: builder.query({
      query: (filter) => ({
        url: `/sanatoriums/searched?dashMode=${
          filter.dashMode ? filter.dashMode : "false"
        }&minPrice=${filter.minPrice ? filter.minPrice : ""}&maxPrice=${
          filter.maxPrice ? filter.maxPrice : ""
        }&searchNameId=${
          filter.searchNameId ? filter.searchNameId : ""
        }&locationId=${filter.locationId ? filter.locationId : ""}&start=${
          filter.start && filter.start
        }&agesArray=${filter.agesArray && filter.agesArray}&daysAmount=${
          filter.daysAmount && filter.daysAmount
        }&filterFood=${
          filter.filterFood ? filter.filterFood : ""
        }&filterServices=${filter.filterServices ? filter.filterServices : ""}`,
      }),
      providesTags: [{ type: "Filter", id: "LIST" }],
    }),
    getCampsByFilter: builder.query({
      query: (filter) => ({
        url: `/camps/searched?dashMode=${
          filter.dashMode ? filter.dashMode : "false"
        }&minPrice=${filter.minPrice ? filter.minPrice : ""}&maxPrice=${
          filter.maxPrice ? filter.maxPrice : ""
        }&searchNameId=${
          filter.searchNameId ? filter.searchNameId : ""
        }&locationId=${filter.locationId ? filter.locationId : ""}&start=${
          filter.start && filter.start
        }&agesArray=${filter.agesArray && filter.agesArray}&daysAmount=${
          filter.daysAmount && filter.daysAmount
        }&filterFood=${
          filter.filterFood ? filter.filterFood : ""
        }&filterServices=${filter.filterServices ? filter.filterServices : ""}`,
      }),
      providesTags: [{ type: "Filter", id: "LIST" }],
    }),
  }),
});

export const {
  useGetTourByFilterQuery,
  useLazyGetTourByFilterQuery,
  useGetHotelsByFilterQuery,
  useLazyGetHotelsByFilterQuery,
  useGetSanatoriumsByFilterQuery,
  useLazyGetSanatoriumsByFilterQuery,
  useGetCampsByFilterQuery,
  useLazyGetCampsByFilterQuery,
} = filterApi;
