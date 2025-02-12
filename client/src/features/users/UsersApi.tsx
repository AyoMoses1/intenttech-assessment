"use client";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { UserInfo, CreateUserDto } from "../../types/user.types";

// Define response types to match backend
interface UsersResponse {
  message: string;
  users: UserInfo[];
}

interface UserResponse {
  message: string;
  user: UserInfo;
}

interface DeleteResponse {
  message: string;
}

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getUsers: builder.query<UserInfo[], void>({
      query: () => "users",
      providesTags: ["User"],
      // Transform the response to extract just the users array
      transformResponse: (response: UsersResponse) => response.users,
    }),
    getUserById: builder.query<UserInfo, number>({
      query: (id) => `users/${id}`,
      providesTags: ["User"],
      // Transform the response to extract just the user object
      transformResponse: (response: UserResponse) => response.user,
    }),
    createUser: builder.mutation<UserInfo, CreateUserDto>({
      query: (userData) => ({
        url: "users",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["User"],
      // Transform the response to extract just the user object
      transformResponse: (response: UserResponse) => response.user,
    }),
    updateUser: builder.mutation<
      UserInfo,
      { id: number; data: Partial<CreateUserDto> }
    >({
      query: ({ id, data }) => ({
        url: `users/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["User"],
      // Transform the response to extract just the user object
      transformResponse: (response: UserResponse) => response.user,
    }),
    deleteUser: builder.mutation<string, number>({
      query: (id) => ({
        url: `users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
      // Transform the response to extract just the message
      transformResponse: (response: DeleteResponse) => response.message,
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
