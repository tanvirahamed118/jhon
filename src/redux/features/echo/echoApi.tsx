import { apiSlice } from "../../app/api";

export const onboardApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllEcho: builder.query({
      query: (landerName) => ({
        url: `/api/echo/lander?landerName=${landerName}`,
        method: "GET",
      }),
      providesTags: ["event"],
    }),
    getOneEcho: builder.query({
      query: (id) => ({
        url: `/api/echo/${id}`,
        method: "GET",
      }),
      providesTags: ["echo"],
    }),
    createEcho: builder.mutation({
      query: (echo) => ({
        url: "/api/echo",
        method: "POST",
        body: echo,
      }),
      invalidatesTags: ["echo"],
    }),
    updateEcho: builder.mutation({
      query: ({ id, echo }) => ({
        url: `/api/echo/${id}`,
        method: "POST",
        body: echo,
      }),
      invalidatesTags: ["echo"],
    }),
    deleteEcho: builder.mutation({
      query: (id) => ({
        url: `/api/echo/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["echo"],
    }),
  }),
});

export const {
  useGetAllEchoQuery,
  useGetOneEchoQuery,
  useCreateEchoMutation,
  useUpdateEchoMutation,
  useDeleteEchoMutation,
} = onboardApi;
