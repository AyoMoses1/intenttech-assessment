// src/features/users/usersApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { UserInfo, CreateUserDto } from "../../types/user.types";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getUsers: builder.query<UserInfo[], void>({
      query: () => "users",
      providesTags: ["User"],
    }),
    getUserById: builder.query<UserInfo, string>({
      query: (id) => `users/${id}`,
      providesTags: ["User"],
    }),
    createUser: builder.mutation<UserInfo, CreateUserDto>({
      query: (userData) => ({
        url: "users",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["User"],
    }),
    updateUser: builder.mutation<
      UserInfo,
      { id: string; data: Partial<CreateUserDto> }
    >({
      query: ({ id, data }) => ({
        url: `users/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    deleteUser: builder.mutation<void, number>({
      query: (id) => ({
        url: `users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = usersApi;
