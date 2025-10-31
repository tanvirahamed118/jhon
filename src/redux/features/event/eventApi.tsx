import { apiSlice } from "../../app/api";

export const eventApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllEvent: builder.query({
      query: ({ page, limit, searchBy, statusBy, userId }) => ({
        url: `/api/event?limit=${limit}&page=${page}&searchBy=${searchBy}&statusBy=${statusBy}&userId=${userId}`,
        method: "GET",
      }),
      providesTags: ["event"],
    }),
    getAllSlot: builder.query({
      query: ({ page, limit, userId }) => ({
        url: `/api/event/slot?limit=${limit}&page=${page}&userId=${userId}`,
        method: "GET",
      }),
      providesTags: ["event"],
    }),
    getOneEvent: builder.query({
      query: (id) => ({
        url: `/api/event/${id}`,
        method: "GET",
      }),
      providesTags: ["event"],
    }),
    googleConnect: builder.mutation<void, void>({
      query: () => ({
        url: "/api/event/google",
        method: "POST",
        credentials: "include",
      }),
      invalidatesTags: ["event"],
    }),
    createSlot: builder.mutation({
      query: (slot) => ({
        url: "/api/event/slot",
        method: "POST",
        credentials: "include",
        body: slot,
      }),
      invalidatesTags: ["event"],
    }),
    toggleEvent: builder.mutation({
      query: ({ id, event }) => ({
        url: `/api/event/toggle/${id}`,
        method: "PATCH",
        credentials: "include",
        body: event,
      }),
      invalidatesTags: ["event", "LoggedUser"],
    }),
    updateEventStatus: builder.mutation({
      query: ({ id, event }) => ({
        url: `/api/event/status/${id}`,
        method: "PATCH",
        credentials: "include",
        body: event,
      }),
      invalidatesTags: ["event", "LoggedUser"],
    }),
    updateEvent: builder.mutation({
      query: ({ id, brandbook }) => ({
        url: `/api/event/${id}`,
        method: "PATCH",
        credentials: "include",
        body: brandbook,
      }),
      invalidatesTags: ["event", "LoggedUser"],
    }),
    deleteEvent: builder.mutation({
      query: (id) => ({
        url: `/api/event/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["event"],
    }),
    deleteSlot: builder.mutation({
      query: (id) => ({
        url: `/api/event/slot/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["event"],
    }),
  }),
});

export const {
  useGetAllEventQuery,
  useGetOneEventQuery,
  useDeleteEventMutation,
  useToggleEventMutation,
  useGetAllSlotQuery,
  useGoogleConnectMutation,
  useCreateSlotMutation,
  useDeleteSlotMutation,
  useUpdateEventStatusMutation,
  useUpdateEventMutation,
} = eventApi;
