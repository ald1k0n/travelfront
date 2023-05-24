import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { API_URL_BASE, API_URL_PROXY } from "../../config/config";

export const editApi = createApi({
  reducerPath: "editApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL_PROXY}`,
    credentials: "include",
  }),
  tagTypes: ["Camp", "Tour"],
  endpoints: (builder) => ({
    getCampById: builder.query({
      query: (id) => ({
        url: `/camps/${id}`,
      }),
      providesTags: [{ type: "Camp", id: "LIST" }],
    }),
    editCampById: builder.mutation({
      query: (body) => ({
        url: `/camps/${body.id}`,
        method: "PATCH",
        body,
        headers: {
          Authorization: `Bearer ${body.token}`,
        },
      }),
      invalidatesTags: [{ type: "Camp", id: "LIST" }],
    }),
    deleteCampById: builder.mutation({
      query: (id) => ({
        url: `/camps/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${body.token}`,
        },
      }),
      invalidatesTags: [{ type: "Camp", id: "LIST" }],
    }),

    //tour
    getTourById: builder.query({
      query: (id) => ({
        url: `/tour/${id}`,
      }),
      providesTags: [{ type: "Tour", id: "LIST" }],
    }),
    getTourByTag: builder.mutation({
      query: (body) => ({
        url: `/tour/recommendation`,
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Tour", id: "LIST" }],
    }),
    editTourById: builder.mutation({
      query: (body) => ({
        url: `/tour/${body.id}`,
        method: "PATCH",
        body,
        headers: {
          Authorization: `Bearer ${body.token}`,
        },
      }),
      invalidatesTags: [{ type: "Tour", id: "LIST" }],
    }),
    deleteTourById: builder.mutation({
      query: (body) => ({
        url: `/tour/${body.id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${body.token}`,
        },
      }),
      invalidatesTags: [{ type: "Tour", id: "LIST" }],
    }),
  }),
});

export const {
  useGetCampByIdQuery,
  useLazyGetCampByIdQuery,
  useDeleteCampByIdMutation,
  useEditCampByIdMutation,

  //tour
  useDeleteTourByIdMutation,
  useGetTourByIdQuery,
  useLazyGetTourByIdQuery,
  useGetTourByTagMutation,
  useEditTourByIdMutation,
} = editApi;
