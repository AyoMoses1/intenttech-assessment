"use client";

import { UserList } from "@/components/features/users/UserList";
import { ReduxProvider } from "@/providers/ReduxProvider";
import Link from "next/link";

export default function UsersPage() {
  return (
    <ReduxProvider>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Users</h1>
          <Link
            href="/users/new"
            className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Add New User
          </Link>
        </div>
        <UserList />
      </div>
    </ReduxProvider>
  );
}
