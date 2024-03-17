import { GridSortModel } from "@mui/x-data-grid";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

/*
API Documentation: https://github.com/15Dkatz/official_joke_api/tree/master
*/
export type Joke = {
  id: string;
  type: string;
  setup: string;
  punchline: string;
};

export const jokesApi = createApi({
  reducerPath: "jokesApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3005/jokes" }),
  tagTypes: ["Joke"],
  endpoints: (build) => ({
    getRandomJoke: build.query<Joke, void>({
      query: () => "random",
      providesTags: ["Joke"],
    }),
    getTenRandomJokes: build.query<Joke[], void>({
      query: () => "ten",
      providesTags: ["Joke"],
    }),
    getJokesByType: build.query<Joke, string>({
      query: (type) => `${type}/random`,
      providesTags: ["Joke"],
    }),
    getJokeById: build.query<Joke, string>({
      query: (id) => `${id}`,
      providesTags: ["Joke"],
    }),
    getTypes: build.query<string[], void>({
      query: () => "types",
    }),
    // example of pagination query
    // paginated?page=0&sort=type:asc,setup:desc
    getJokesPaginated: build.query<
      { jokes: Joke[]; totalJokes: number },
      { page?: number; sort?: GridSortModel }
    >({
      query: ({ page = 0, sort }) => {
        const sortString =
          sort &&
          sort.length &&
          sort.map((s) => `${s.field}:${s.sort}`).join(",");
        let url = `paginated?page=${page}`;
        if (sortString) {
          url += `&sort=${sortString}`;
        }
        return url;
      },
      providesTags: ["Joke"],
    }),
  }),
});

export const {
  useGetRandomJokeQuery,
  useGetTenRandomJokesQuery,
  useGetJokesByTypeQuery,
  useGetJokeByIdQuery,
  useGetJokesPaginatedQuery,
  useGetTypesQuery,
} = jokesApi;
