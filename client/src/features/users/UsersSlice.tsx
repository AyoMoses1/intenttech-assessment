// src/features/users/UsersSlice.ts
"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserInfo {
  id: number;
  firstName: string;
  lastName: string;
  dob: string;
  occupation: string;
  gender: string;
  contact: {
    email: string;
    phoneNumber: string;
    fax?: string;
    linkedInUrl?: string;
  };
  address: {
    address: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
  };
  academics: Array<{
    schoolName: string;
    degree: string;
    graduationYear: number;
    description?: string;
  }>;
}

interface UsersState {
  users: UserInfo[];
  selectedUser: UserInfo | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: UsersState = {
  users: [
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      dob: "1990-01-01",
      occupation: "Software Engineer",
      gender: "Male",
      contact: {
        email: "john.doe@example.com",
        phoneNumber: "+1234567890",
        linkedInUrl: "https://linkedin.com/in/johndoe",
      },
      address: {
        address: "123 Main St",
        city: "New York",
        state: "NY",
        country: "USA",
        zipCode: "10001",
      },
      academics: [
        {
          schoolName: "MIT",
          degree: "Computer Science",
          graduationYear: 2012,
          description: "Graduated with honors",
        },
      ],
    },
  ],
  selectedUser: null,
  isLoading: false,
  error: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setSelectedUser: (state, action: PayloadAction<number>) => {
      state.selectedUser =
        state.users.find((user) => user.id === action.payload) || null;
    },
    addUser: (state, action: PayloadAction<Omit<UserInfo, "id">>) => {
      const newId = Math.max(...state.users.map((user) => user.id)) + 1;
      state.users.push({ ...action.payload, id: newId });
    },
    updateUser: (state, action: PayloadAction<UserInfo>) => {
      const index = state.users.findIndex(
        (user) => user.id === action.payload.id,
      );
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    },
    deleteUser: (state, action: PayloadAction<number>) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
      if (state.selectedUser?.id === action.payload) {
        state.selectedUser = null;
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setSelectedUser,
  addUser,
  updateUser,
  deleteUser,
  setLoading,
  setError,
} = usersSlice.actions;

export default usersSlice.reducer;
