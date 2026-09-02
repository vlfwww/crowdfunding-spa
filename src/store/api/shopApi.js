import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const shopApi = createApi({
  reducerPath: "shopApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com/c/" }),
  endpoints: (builder) => ({
    getFields: builder.query({
      query: () => "be12-46fa-4dd9-950f",

      transformResponse: (response) => response.fields,
    }),

    getFieldById: builder.query({
      query: (id) => "be12-46fa-4dd9-950f",
      transformResponse: (response, meta, arg) => {
        const item = response.fields.find((f) => String(f.id) === String(arg));
        return item || null;
      },
    }),
  }),
});

export const { useGetFieldsQuery, useGetFieldByIdQuery } = shopApi;
