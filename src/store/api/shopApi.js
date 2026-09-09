import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const isProd = process.env.NODE_ENV === "production";

const optimizeFieldImage = (image, width) =>
  typeof image === "string"
    ? (() => {
        const url = new URL(image);
        url.searchParams.set("w", String(width));
        url.searchParams.set("q", "65");
        return url.toString();
      })()
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
          image: optimizeFieldImage(field.image, 480),
        })),
    }),
  }),
});

export const { useGetFieldsQuery } = shopApi;
