import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL_BASE, API_URL_PROXY } from "../../config/config";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL_PROXY}`,
    credentials: "include",
  }),
  tagTypes: [
    "category",
    "location",
    "Program",
    "hotels",
    "services",
    "Camp",
    "tour",
    "Food",
    "Orders",
    "Rooms",
  ],
  endpoints: (builder) => ({
    getCategory: builder.query({
      query: () => ({
        url: "/categories",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: "category", _id })),
              { type: "category", id: "LIST" },
            ]
          : [{ type: "category", id: "LIST" }],
    }),
    getLocation: builder.query({
      query: () => ({
        url: "/locations",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: "location", _id })),
              { type: "location", id: "LIST" },
            ]
          : [{ type: "location", id: "LIST" }],
    }),
    getProgram: builder.query({
      query: () => ({
        url: "/programs",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: "Program", _id })),
              { type: "Program", id: "LIST" },
            ]
          : [{ type: "Program", id: "LIST" }],
    }),
    getHotels: builder.query({
      query: () => ({
        url: "/hotels",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: "hotels", _id })),
              { type: "hotels", id: "LIST" },
            ]
          : [{ type: "hotels", id: "LIST" }],
    }),
    getHotelService: builder.query({
      query: () => ({
        url: "/hotelServices",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: "services", _id })),
              { type: "services", id: "LIST" },
            ]
          : [{ type: "services", id: "LIST" }],
    }),
    getTour: builder.query({
      query: () => ({
        url: "/tour",
      }),
      providesTags: [{ type: "tour", id: "LIST" }],
    }),
    getCamp: builder.query({
      query: () => ({
        url: "/camps",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: "Camp", _id })),
              { type: "Camp", id: "LIST" },
            ]
          : [{ type: "Camp", id: "LIST" }],
    }),
    getFood: builder.query({
      query: () => ({
        url: "/foods",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: "Food", _id })),
              { type: "Food", id: "LIST" },
            ]
          : [{ type: "Food", id: "LIST" }],
    }),
    getOrders: builder.query({
      query: (token) => ({
        url: "/orders",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: "Orders", _id })),
              { type: "Orders", id: "LIST" },
            ]
          : [{ type: "Orders", id: "LIST" }],
    }),
    getOrdersByQuery: builder.query({
      query: (body) => ({
        url: `/orders/order/search?status=${body.status}&query=${body.query}`,
        // headers: {
        //   Authorization: `Bearer ${body.token}`,
        // },
      }),
    }),
    getOrderById: builder.query({
      query: (id) => ({
        url: `/orders/${id}`,
      }),
    }),
    //Addition
    addTour: builder.mutation({
      query: (body) => ({
        url: "/tour",
        method: "POST",
        body,
        headers: {
          Authorization: `Bearer ${body.token}`,
        },
      }),
      invalidatesTags: [{ id: "LIST", type: "tour" }],
    }),
    addCamp: builder.mutation({
      query: (body) => ({
        url: "/camps",
        method: "POST",
        body,
        headers: {
          Authorization: `Bearer ${body.token}`,
        },
      }),
      invalidatesTags: [{ id: "LIST", type: "Camp" }],
    }),
    getRoomByHotelIdLimit: builder.query({
      query: ({ limit, hotelId, capacity, agesArray }) => ({
        url: `/hotels/${hotelId}/room?limit=${limit}&capacity=${
          capacity ? capacity : ""
        }&agesArray=${agesArray ? agesArray : ""}`,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.rooms.map(({ _id }) => ({ type: "Rooms", _id })),
              { type: "Rooms", id: "LIST" },
            ]
          : [{ type: "Rooms", id: "LIST" }],
    }),
    getRoomBySanatoriumIdLimit: builder.query({
      query: ({ limit, sanatoriumId, capacity }) => ({
        url: `/sanatoriums/${sanatoriumId}/room?limit=${limit}&capacity=${
          capacity ? capacity : ""
        }`,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: "Rooms", _id })),
              { type: "Rooms", id: "LIST" },
            ]
          : [{ type: "Rooms", id: "LIST" }],
    }),
    getHotelsByTag: builder.mutation({
      query: (body) => {
        return {
          url: "/hotels/hotelRecommendation/tags",
          body,
          method: "POST",
        };
      },
    }),
    getHotelRooms: builder.query({
      query: (hotelId) => {},
    }),
    getLocationByLetter: builder.query({
      query: (letter) => ({
        url: `/locations/query/find?query=${letter}`,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: "location", _id })),
              { type: "location", id: "LIST" },
            ]
          : [{ type: "location", id: "LIST" }],
    }),
    getTourById: builder.query({
      query: (id) => ({
        url: "/tour/" + id,
      }),
    }),
    getCampById: builder.query({
      query: (id) => ({
        url: "/camps/" + id,
      }),
    }),
    addHotelService: builder.mutation({
      query: (body) => ({
        url: "/hotelServices",
        method: "POST",
        body,
        headers: {
          Authorization: `Bearer ${body.token}`,
        },
      }),
      invalidatesTags: [{ id: "LIST", type: "services" }],
    }),
    updateStatus: builder.mutation({
      query: (body) => ({
        url: `/orders/${body.id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: [{ id: "LIST", type: "Orders" }],
    }),
  }),
});

export const {
  useGetCategoryQuery,
  useGetLocationQuery,
  useGetProgramQuery,
  useGetHotelsQuery,
  useGetHotelServiceQuery,
  useAddTourMutation,
  useAddCampMutation,
  //Get
  useGetCampQuery,
  useGetTourQuery,
  useGetFoodQuery,
  useAddHotelServiceMutation,
  useGetOrdersQuery,
  useGetOrdersByQueryQuery,
  useLazyGetOrdersByQueryQuery,
  useGetRoomByHotelIdLimitQuery,
  useGetRoomBySanatoriumIdLimitQuery,
  useGetHotelsByTagMutation,

  useGetLocationByLetterQuery,
  useGetTourByIdQuery,
  useGetCampByIdQuery,

  useUpdateStatusMutation,
  useLazyGetOrderByIdQuery,
} = baseApi;
