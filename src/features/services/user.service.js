import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL_PROXY } from "../../config/config";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL_PROXY}`,
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getManagers: builder.query({
      query: (data) => ({
        url: `/users/search?query=${data}`,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: "User", _id })),
              { type: "User", id: "LIST" },
            ]
          : [{ type: "User", id: "LIST" }],
    }),
    deleteManagers: builder.mutation({
      query: (body) => ({
        url: "/users/delete",
        method: "DELETE",
        body,
      }),
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),
  }),
});

export const {
  useGetManagersQuery,
  useDeleteManagersMutation,
  useLazyGetManagersQuery,
} = userApi;
