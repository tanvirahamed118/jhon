import { apiSlice } from "../../app/api";

export const eventApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllSlot: builder.query({
      query: (userId) => ({
        url: `/api/event/slot/lander?userId=${userId}`,
        method: "GET",
      }),
      providesTags: ["event"],
    }),
    createEvent: builder.mutation({
      query: (slot) => ({
        url: "/api/event",
        method: "POST",
        credentials: "include",
        body: slot,
      }),
      invalidatesTags: ["event"],
    }),
  }),
});

export const { useCreateEventMutation, useGetAllSlotQuery } = eventApi;
