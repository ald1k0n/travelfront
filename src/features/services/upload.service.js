import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL_BASE, API_URL_PROXY } from "../../config/config";

export const uploadApi = createApi({
  reducerPath: "uploadApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL_PROXY}`,
    credentials: "include",
  }),
  tagTypes: ["image"],
  endpoints: (builder) => ({
    uploadImage: builder.mutation({
      query: (body) => {
        return {
          url: `/${body.name}/${body.id}/upload`,
          body: body.formData,

          method: "PATCH",
        };
      },

      invalidatesTags: [{ id: "LIST", type: "image" }],
    }),
  }),
});

export const { useUploadImageMutation } = uploadApi;
