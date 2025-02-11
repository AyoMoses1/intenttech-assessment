// src/components/features/users/UserForm/steps/ResumePreview.tsx

import { UserInfo } from "@/types/user.types";
import { formatDate } from "@/utils/formatDate";
import { useFormContext } from "react-hook-form";

export function ResumePreview() {
  const { watch } = useFormContext<UserInfo>();
  const formData = watch(); // Get all current form values

  return (
    <div className="mx-auto max-w-4xl">
      <h2 className="mb-8 text-center text-2xl font-bold">
        Preview Your Information
      </h2>

      {/* Personal Information Section */}
      <div className="mb-6 rounded-lg bg-white p-6 shadow-md">
        <h3 className="mb-4 border-b pb-2 text-xl font-semibold">
          Personal Information
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {formData.profilePhoto && (
            <div className="col-span-2">
              <img
                src={formData.profilePhoto}
                alt="Profile"
                className="mx-auto h-32 w-32 rounded-full object-cover"
              />
            </div>
          )}
          <div>
            <p className="text-gray-600">First Name</p>
            <p className="font-medium">{formData.firstName}</p>
          </div>
          <div>
            <p className="text-gray-600">Last Name</p>
            <p className="font-medium">{formData.lastName}</p>
          </div>
          <div>
            <p className="text-gray-600">Date of Birth</p>
            <p className="font-medium">
              {formData.dob ? formatDate(new Date(formData.dob)) : ""}
            </p>
          </div>
          <div>
            <p className="text-gray-600">Gender</p>
            <p className="font-medium">{formData.gender}</p>
          </div>
          <div className="col-span-2">
            <p className="text-gray-600">Occupation</p>
            <p className="font-medium">{formData.occupation}</p>
          </div>
        </div>
      </div>

      {/* Contact Information Section */}
      <div className="mb-6 rounded-lg bg-white p-6 shadow-md">
        <h3 className="mb-4 border-b pb-2 text-xl font-semibold">
          Contact Information
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600">Email</p>
            <p className="font-medium">{formData.contact.email}</p>
          </div>
          <div>
            <p className="text-gray-600">Phone Number</p>
            <p className="font-medium">{formData.contact.phoneNumber}</p>
          </div>
          {formData.contact.fax && (
            <div>
              <p className="text-gray-600">Fax</p>
              <p className="font-medium">{formData.contact.fax}</p>
            </div>
          )}
          {formData.contact.linkedInUrl && (
            <div>
              <p className="text-gray-600">LinkedIn</p>
              <a
                href={formData.contact.linkedInUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800"
              >
                {formData.contact.linkedInUrl}
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Address Section */}
      <div className="mb-6 rounded-lg bg-white p-6 shadow-md">
        <h3 className="mb-4 border-b pb-2 text-xl font-semibold">
          Address Information
        </h3>
        <div className="space-y-2">
          <div>
            <p className="text-gray-600">Street Address</p>
            <p className="font-medium">{formData.address.address}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600">City</p>
              <p className="font-medium">{formData.address.city}</p>
            </div>
            <div>
              <p className="text-gray-600">State</p>
              <p className="font-medium">{formData.address.state}</p>
            </div>
            <div>
              <p className="text-gray-600">Country</p>
              <p className="font-medium">{formData.address.country}</p>
            </div>
            <div>
              <p className="text-gray-600">ZIP Code</p>
              <p className="font-medium">{formData.address.zipCode}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Academic Information Section */}
      <div className="rounded-lg bg-white p-6 shadow-md">
        <h3 className="mb-4 border-b pb-2 text-xl font-semibold">
          Academic Background
        </h3>
        <div className="space-y-6">
          {formData.academics.map((academic, index) => (
            <div key={index} className="rounded-lg bg-gray-50 p-4">
              <h4 className="mb-2 text-lg font-medium">
                Education #{index + 1}
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600">School/University</p>
                  <p className="font-medium">{academic.schoolName}</p>
                </div>
                <div>
                  <p className="text-gray-600">Degree</p>
                  <p className="font-medium">{academic.degree}</p>
                </div>
                <div>
                  <p className="text-gray-600">Graduation Year</p>
                  <p className="font-medium">{academic.graduationYear}</p>
                </div>
                {academic.description && (
                  <div className="col-span-2">
                    <p className="text-gray-600">Description</p>
                    <p className="font-medium">{academic.description}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 text-center text-gray-500">
        <p>Please review all information before submitting.</p>
        <p>You can go back to previous steps to make any changes.</p>
      </div>
    </div>
  );
}
