// src/components/features/users/UserResume/UserResume.tsx

import { UserInfo } from "@/types/user.types";

interface UserResumeProps {
  user: UserInfo;
}

export function UserResume({ user }: UserResumeProps) {
  return (
    <div className="mx-auto max-w-4xl overflow-hidden rounded-lg bg-white shadow-lg">
      <div className="bg-gray-50 px-8 py-6">
        <div className="flex items-center">
          {user.profilePhoto && (
            <img
              src={user.profilePhoto}
              alt={`${user.firstName} ${user.lastName}`}
              className="mr-6 h-24 w-24 rounded-full object-cover"
            />
          )}
          <div>
            <h1 className="text-3xl font-bold">
              {user.firstName} {user.lastName}
            </h1>
            <p className="text-xl text-gray-600">{user.occupation}</p>
          </div>
        </div>
      </div>

      <div className="p-8">
        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">Contact Information</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-medium">Email</p>
              <p>{user.contact.email}</p>
            </div>
            <div>
              <p className="font-medium">Phone</p>
              <p>{user.contact.phoneNumber}</p>
            </div>
            {user.contact.linkedInUrl && (
              <div>
                <p className="font-medium">LinkedIn</p>
                <a
                  href={user.contact.linkedInUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800"
                >
                  Profile
                </a>
              </div>
            )}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">Address</h2>
          <p>{user.address.address}</p>
          <p>
            {user.address.city}, {user.address.state} {user.address.zipCode}
          </p>
          <p>{user.address.country}</p>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold">Education</h2>
          <div className="space-y-4">
            {user.academics.map((academic, index) => (
              <div key={index}>
                <h3 className="text-lg font-medium">{academic.schoolName}</h3>
                <p className="text-gray-600">{academic.degree}</p>
                <p className="text-gray-500">
                  Graduated: {academic.graduationYear}
                </p>
                {academic.description && (
                  <p className="mt-2 text-gray-600">{academic.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
