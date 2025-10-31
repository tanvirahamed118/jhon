import { apiSlice } from "../../app/api";

type ResponseType = {
  status: string;
  message: string;
  user?: Record<string, unknown>;
};

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUser: builder.query({
      query: ({ page, limit, searchBy, statusBy }) => ({
        url: `/api/auth?page=${page}&limit=${limit}&searchBy=${searchBy}&statusBy=${statusBy}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["update"],
    }),
    getAllUserByAdmin: builder.query({
      query: (role) => ({
        url: `/api/auth/admin?role=${role}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["update"],
    }),
    getOneUser: builder.query({
      query: (id) => ({
        url: `/api/auth/${id}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["update", "LoggedUser"],
    }),

    register: builder.mutation({
      query: (user) => ({
        url: "/api/auth/register",
        method: "POST",
        body: user,
      }),
    }),
    login: builder.mutation({
      query: (user) => ({
        url: "/api/auth/login",
        method: "POST",
        body: user,
        credentials: "include",
      }),
      invalidatesTags: ["LoggedUser"],
    }),
    adminLogin: builder.mutation({
      query: (user) => ({
        url: "/api/auth/login/admin",
        method: "POST",
        body: user,
        credentials: "include",
      }),
      invalidatesTags: ["LoggedUser"],
    }),
    logout: builder.mutation({
      query: (user) => ({
        url: "/api/auth/logout",
        method: "POST",
        body: user,
        credentials: "include",
      }),
      invalidatesTags: ["LoggedUser"],
    }),
    loggedUser: builder.query<ResponseType, void>({
      query: () => ({
        url: "/api/auth/logged",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["LoggedUser"],
    }),

    verifyUser: builder.mutation({
      query: (user) => ({
        url: "/api/auth/verify",
        method: "POST",
        body: user,
      }),
    }),
    verifyUserByAdmin: builder.mutation({
      query: (user) => ({
        url: "/api/auth/verify/admin",
        method: "PATCH",
        credentials: "include",
        body: user,
      }),
      invalidatesTags: ["update"],
    }),
    sendOtpCode: builder.mutation({
      query: (user) => ({
        url: "/api/auth/send",
        method: "POST",
        body: user,
      }),
    }),
    resetUser: builder.mutation({
      query: (user) => ({
        url: "/api/auth/reset",
        method: "POST",
        body: user,
      }),
    }),
    updatePassword: builder.mutation({
      query: ({ user, id }) => ({
        url: `/api/auth/password/${id}`,
        method: "PATCH",
        body: user,
      }),
      invalidatesTags: ["LoggedUser"],
    }),

    updateUser: builder.mutation({
      query: ({ formData, id }) => ({
        url: `/api/auth/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["LoggedUser"],
    }),
    updateUserByAdmin: builder.mutation({
      query: ({ formData, id }) => ({
        url: `/api/auth/admin/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["update"],
    }),
    toggleAccountActivation: builder.mutation({
      query: ({ id, user }) => ({
        url: `/api/auth/toggle/activation/${id}`,
        method: "PATCH",
        body: user,
      }),
      invalidatesTags: ["LoggedUser"],
    }),
    updatePasswordByAdmin: builder.mutation({
      query: ({ id, user }) => ({
        url: `/api/auth/password/admin/${id}`,
        method: "PATCH",
        body: user,
      }),
      invalidatesTags: ["LoggedUser"],
    }),
    updateMembership: builder.mutation({
      query: ({ id, membership }) => ({
        url: `/api/auth/membership/${id}`,
        method: "PATCH",
        body: membership,
      }),
      invalidatesTags: ["LoggedUser"],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/api/auth/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["LoggedUser"],
    }),
  }),
});

export const {
  useGetAllUserByAdminQuery,
  useGetAllUserQuery,
  useGetOneUserQuery,
  useRegisterMutation,
  useLoginMutation,
  useLoggedUserQuery,
  useLogoutMutation,
  useVerifyUserMutation,
  useSendOtpCodeMutation,
  useResetUserMutation,
  useDeleteUserMutation,
  useUpdateUserMutation,
  useUpdatePasswordMutation,
  useAdminLoginMutation,
  useVerifyUserByAdminMutation,
  useToggleAccountActivationMutation,
  useUpdateUserByAdminMutation,
  useUpdatePasswordByAdminMutation,
  useUpdateMembershipMutation,
} = authApi;
