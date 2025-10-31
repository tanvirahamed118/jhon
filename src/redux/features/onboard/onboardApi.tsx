import { apiSlice } from "../../app/api";

export const onboardApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllOnboard: builder.query({
      query: ({ page, limit, searchBy, statusBy, userId }) => ({
        url: `/api/onboard?limit=${limit}&page=${page}&searchBy=${searchBy}&statusBy=${statusBy}&userId=${userId}`,
        method: "GET",
      }),
      providesTags: ["update"],
    }),
    getAllOnboardByAdmin: builder.query({
      query: ({ page, limit, searchBy, statusBy }) => ({
        url: `/api/onboard/admin?limit=${limit}&page=${page}&searchBy=${searchBy}&statusBy=${statusBy}`,
        method: "GET",
      }),
      providesTags: ["update"],
    }),
    getOneOnboard: builder.query({
      query: (id) => ({
        url: `/api/onboard/${id}`,
        method: "GET",
      }),
      providesTags: ["update"],
    }),
    requestDomain: builder.mutation({
      query: (user) => ({
        url: "/api/onboard/request",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["update"],
    }),
    checkDiscount: builder.mutation({
      query: (user) => ({
        url: "/api/onboard/discount",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["update"],
    }),
    onboardUser: builder.mutation({
      query: (formData) => ({
        url: "/api/onboard",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["update"],
    }),
    recreatePayment: builder.mutation({
      query: (id) => ({
        url: `/api/onboard/recreate/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["update"],
    }),
    updateInfo: builder.mutation({
      query: ({ id, onboard }) => ({
        url: `/api/onboard/info/${id}`,
        method: "PUT",
        body: onboard,
      }),
      invalidatesTags: ["update"],
    }),
    updateImages: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/api/onboard/images/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["update"],
    }),
    updateSocials: builder.mutation({
      query: ({ id, onboard }) => ({
        url: `/api/onboard/social/${id}`,
        method: "PUT",
        body: onboard,
      }),
      invalidatesTags: ["update"],
    }),
    updateUserMembership: builder.mutation({
      query: ({ id, user }) => ({
        url: `/api/onboard/membership/${id}`,
        method: "PUT",
        body: user,
      }),
    }),
    updatePayment: builder.mutation({
      query: (user) => ({
        url: "/api/onboard/update/payment",
        method: "POST",
        credentials: "include",
        body: user,
      }),
    }),
    verifyOnboardAdmin: builder.mutation({
      query: (id) => ({
        url: `/api/onboard/verify/${id}`,
        method: "PUT",
        credentials: "include",
      }),
      invalidatesTags: ["update"],
    }),
    deleteOnboard: builder.mutation({
      query: (id) => ({
        url: `/api/onboard/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["update"],
    }),
  }),
});

export const {
  useGetAllOnboardQuery,
  useGetOneOnboardQuery,
  useDeleteOnboardMutation,
  useOnboardUserMutation,
  useCheckDiscountMutation,
  useRequestDomainMutation,
  useUpdatePaymentMutation,
  useRecreatePaymentMutation,
  useUpdateInfoMutation,
  useUpdateImagesMutation,
  useUpdateSocialsMutation,
  useUpdateUserMembershipMutation,
  useGetAllOnboardByAdminQuery,
  useVerifyOnboardAdminMutation,
} = onboardApi;
