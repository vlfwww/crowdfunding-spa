import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const shopApi = createApi({
  reducerPath: "shopApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/c/" }),
  endpoints: (builder) => ({
    getFields: builder.query({
      query: () => "4730-2d6a-40ed-b0eb",

      transformResponse: (response) => response.fields,
    }),

    getFieldById: builder.query({
      query: (id) => "4730-2d6a-40ed-b0eb",
      transformResponse: (response, meta, arg) => {
        const item = response.fields.find((f) => String(f.id) === String(arg));
        return item || null;
      },
    }),
  }),
});

export const { useGetFieldsQuery, useGetFieldByIdQuery } = shopApi;
