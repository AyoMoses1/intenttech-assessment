"use client";

import { useParams, useRouter } from "next/navigation";
import { UserForm } from "@/components/features/users/UserForm";
import Link from "next/link";
import {
  useGetUserByIdQuery,
  useUpdateUserMutation,
} from "@/features/users/UsersApi";
import { CreateUserDto } from "@/types/user.types";
import { toast } from "react-hot-toast";

export default function EditUserPage() {
  const params = useParams();
  const router = useRouter();
  
  // Check for id before the query
  if (!params?.id) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <h1 className="mb-4 text-2xl font-bold">Invalid User ID</h1>
        <Link href="/users" className="text-blue-600 hover:text-blue-800">
          Back to Users
        </Link>
      </div>
    );
  }

  const { data: user, isLoading: isLoadingUser } = useGetUserByIdQuery(Number(params.id));
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

  if (isLoadingUser) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <h1 className="mb-4 text-2xl font-bold">User Not Found</h1>
        <Link href="/users" className="text-blue-600 hover:text-blue-800">
          Back to Users
        </Link>
      </div>
    );
  }

  const handleSubmit = async (data: CreateUserDto) => {
    try {
      await updateUser({ id: Number(params.id), data }).unwrap();
      toast.success("User updated successfully");
      router.push(`/users/${params.id}`);
    } catch (error) {
      toast.error("Failed to update user");
      console.error("Failed to update user:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Edit User</h1>
        <div className="flex gap-4">
          <Link
            href={`/users/${params.id}`}
            className="rounded-md bg-gray-100 px-4 py-2 text-gray-700 hover:bg-gray-200"
          >
            Cancel
          </Link>
        </div>
      </div>

      <UserForm
        initialData={user}
        onSubmit={handleSubmit}
        isSubmitting={isUpdating}
        submitLabel="Update User"
      />
    </div>
  );
}