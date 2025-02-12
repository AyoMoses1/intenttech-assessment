// app/users/new/page.tsx
"use client";

import { UserForm } from "@/components/features/users/UserForm";

export default function NewUserPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Create New User</h1>
        <p className="text-gray-600">Please fill in the user information</p>
      </div>
      <UserForm />
    </div>
  );
}
