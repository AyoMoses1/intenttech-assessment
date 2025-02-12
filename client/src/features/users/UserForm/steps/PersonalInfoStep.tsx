import { useFormContext } from "react-hook-form";
import { useEffect, useState } from "react";
import type { UserInfo } from "@/types/user.types";
import { Input, Select } from "@/components/common/Input";
import { cn } from "@/lib/utils";

export function PersonalInfoStep() {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<UserInfo>();

  const [previewUrl, setPreviewUrl] = useState<string>("");
  const profilePhoto = watch("profilePhoto");

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (file) {
      // Create object URL for preview
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);

      // Convert file to base64
      const reader = new FileReader();
      reader.onloadend = () => {
        // Set the base64 string as the profile photo value
        const base64String = reader.result as string;
        setValue("profilePhoto", base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    return () => {
      // Cleanup object URL on component unmount
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  // If profilePhoto is a base64 string, use it for preview
  useEffect(() => {
    if (
      typeof profilePhoto === "string" &&
      profilePhoto.startsWith("data:image")
    ) {
      setPreviewUrl(profilePhoto);
    }
  }, [profilePhoto]);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Personal Information</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Profile Photo Upload */}
        <div className="col-span-full space-y-2">
          <label className="block text-base font-medium text-foreground">
            Profile Photo
          </label>
          <div className="flex items-center gap-4">
            {/* Image Preview */}
            {(previewUrl || profilePhoto) && (
              <div className="relative h-20 w-20 overflow-hidden rounded-full bg-muted">
                <img
                  src={previewUrl}
                  alt="Profile preview"
                  className="h-full w-full object-cover"
                />
                {/* Remove Button */}
                <button
                  type="button"
                  onClick={() => {
                    setPreviewUrl("");
                    setValue("profilePhoto", "");
                  }}
                  className="absolute right-0 top-0 rounded-bl-lg bg-destructive/80 p-1 text-destructive-foreground hover:bg-destructive"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 6L6 18"></path>
                    <path d="M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
            )}

            {/* File Input */}
            <div className="flex-1">
              <input
                type="file"
                onChange={handleFileChange}
                accept="image/*"
                className={cn(
                  "flex h-10 w-full rounded-md border border-input bg-background",
                  "file:h-10 file:border-0 file:bg-primary file:text-primary-foreground",
                  "file:mr-4 file:cursor-pointer file:px-4 hover:file:bg-primary/90",
                  "text-sm text-muted-foreground",
                  errors.profilePhoto && "border-destructive",
                )}
              />
              {errors.profilePhoto && (
                <p className="mt-1 text-sm font-medium text-destructive">
                  {errors.profilePhoto.message}
                </p>
              )}
              <p className="mt-1 text-sm text-muted-foreground">
                Accepted formats: JPG, PNG. Max size: 5MB
              </p>
            </div>
          </div>
        </div>

        {/* Other Fields */}
        <Input
          label="First Name"
          {...register("firstName")}
          error={errors.firstName?.message}
        />
        <Input
          label="Last Name"
          {...register("lastName")}
          error={errors.lastName?.message}
        />
        <Input
          label="Date of Birth"
          type="date"
          {...register("dob")}
          error={errors.dob?.message}
        />
        <Input
          label="Occupation"
          {...register("occupation")}
          error={errors.occupation?.message}
        />
        <Select
          label="Gender"
          {...register("gender")}
          error={errors.gender?.message}
          options={[
            { value: "", label: "Select gender" },
            { value: "Male", label: "Male" },
            { value: "Female", label: "Female" },
            { value: "Other", label: "Other" },
          ]}
        />
      </div>
    </div>
  );
}
