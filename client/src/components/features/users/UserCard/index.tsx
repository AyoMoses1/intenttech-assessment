// src/components/features/users/UserList/UserCard/UserCard.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { UserInfo } from "@/types/user.types";

interface UserCardProps {
  user: UserInfo;
  onDelete: (id: number) => void;
}

export function UserCard({ user, onDelete }: UserCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setIsDeleting(true);
      try {
        await onDelete(user.id!);
      } catch (error) {
        console.error("Failed to delete user:", error);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-md transition-shadow duration-300 hover:shadow-lg">
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            {user.profilePhoto ? (
              <img
                src={user.profilePhoto as string}
                alt={`${user.firstName} ${user.lastName}`}
                className="h-12 w-12 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-200">
                <span className="text-xl text-gray-600">
                  {user.firstName[0]}
                  {user.lastName[0]}
                </span>
              </div>
            )}
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {user.firstName} {user.lastName}
              </h3>
              <p className="text-gray-600">{user.occupation}</p>
            </div>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <p className="text-sm text-gray-600">
            <span className="font-medium">Email:</span> {user.contact.email}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Phone:</span>{" "}
            {user.contact.phoneNumber}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Location:</span> {user.address.city},{" "}
            {user.address.country}
          </p>
        </div>

        <div className="mt-6 flex items-center justify-end space-x-3">
          <Link
            href={`/users/${user.id}`}
            className="rounded-md px-3 py-2 text-sm font-medium text-blue-600 transition-colors duration-200 hover:text-blue-800"
          >
            View Details
          </Link>
          <Link
            href={`/users/edit/${user.id}`}
            className="rounded-md px-3 py-2 text-sm font-medium text-green-600 transition-colors duration-200 hover:text-green-800"
          >
            Edit
          </Link>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className={`rounded-md px-3 py-2 text-sm font-medium text-red-600 transition-colors duration-200 hover:text-red-800 ${
              isDeleting ? "cursor-not-allowed opacity-50" : ""
            }`}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
