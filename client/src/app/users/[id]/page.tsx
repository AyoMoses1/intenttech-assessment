// app/users/[id]/page.tsx
"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useGetUserByIdQuery } from "@/features/users/UsersApi";

export default function UserDetailsPage() {
  const params = useParams();

  const userId = params?.id ? Number(params.id) : null;

  if (!userId) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <h1 className="mb-4 text-2xl font-bold">Invalid User ID</h1>
        <Link href="/users" className="text-blue-600 hover:text-blue-800">
          Back to Users
        </Link>
      </div>
    );
  }

  const { data: user, isLoading, error } = useGetUserByIdQuery(userId);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <h1 className="mb-4 text-2xl font-bold text-red-600">
          Error Loading User
        </h1>
        <Link href="/users" className="text-blue-600 hover:text-blue-800">
          Back to Users
        </Link>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl font-bold">User Details</h1>
          <div className="flex gap-4">
            <Link
              href={`/users/edit/${user.id}`}
              className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Edit
            </Link>
            <Link
              href="/users"
              className="rounded-md bg-gray-100 px-4 py-2 text-gray-700 hover:bg-gray-200"
            >
              Back
            </Link>
          </div>
        </div>

        {/* User Information Card */}
        <div className="rounded-lg bg-white shadow-md">
          {/* Basic Info Section */}
          <div className="border-b p-6">
            <div className="flex items-center gap-6">
              <img
                src={user.profilePhoto as string}
                alt={`${user.firstName} ${user.lastName}`}
                className="h-20 w-20 rounded-full object-cover"
              />
              <div>
                <h2 className="text-xl font-bold">
                  {user.firstName} {user.lastName}
                </h2>
                <p className="text-gray-600">{user.occupation}</p>
              </div>
            </div>
          </div>

          {/* Detailed Information */}
          <div className="space-y-6 p-6">
            {/* Personal Info */}
            <div>
              <h3 className="mb-4 text-lg font-semibold">
                Personal Information
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Date of Birth</p>
                  <p className="font-medium">
                    {new Date(user.dob).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Gender</p>
                  <p className="font-medium">{user.gender}</p>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="mb-4 text-lg font-semibold">
                Contact Information
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-medium">{user.contact.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Phone</p>
                  <p className="font-medium">{user.contact.phoneNumber}</p>
                </div>
              </div>
            </div>

            {/* Address */}
            <div>
              <h3 className="mb-4 text-lg font-semibold">Address</h3>
              <div className="space-y-2">
                <p className="font-medium">{user.address.address}</p>
                <p>
                  {user.address.city}, {user.address.state}
                </p>
                <p>
                  {user.address.country}, {user.address.zipCode}
                </p>
              </div>
            </div>

            {/* Academics */}
            <div>
              <h3 className="mb-4 text-lg font-semibold">
                Academic Background
              </h3>
              <div className="space-y-4">
                {user.academics.map((academic, index) => (
                  <div key={index} className="rounded-md bg-gray-50 p-4">
                    <h4 className="mb-2 font-medium">{academic.schoolName}</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Degree</p>
                        <p className="font-medium">{academic.degree}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Graduation Year</p>
                        <p className="font-medium">{academic.graduationYear}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>{" "}
    </div>
  );
}
