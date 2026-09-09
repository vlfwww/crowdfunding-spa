import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const isProd = process.env.NODE_ENV === "production";

const optimizeFieldImage = (image) =>
  typeof image === "string"
    ? image.replace(/([?&])w=\d+/, "$1w=480").replace(/([?&])q=\d+/, "$1q=65")
    : image;

export const shopApi = createApi({
  reducerPath: "shopApi",
  baseQuery: fetchBaseQuery({
    baseUrl: isProd ? "https://dummyjson.com/c/" : "/c/",
  }),
  endpoints: (builder) => ({
    getFields: builder.query({
      query: () => "4730-2d6a-40ed-b0eb",
      transformResponse: (response) =>
        response.fields.map((field) => ({
          ...field,
          image: optimizeFieldImage(field.image),
        })),
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
