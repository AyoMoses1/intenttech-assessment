// src/components/features/users/UserForm/steps/PersonalInfoStep.tsx

import { useFormContext } from "react-hook-form";
import type { UserInfo } from "@/types/user.types";
import { Input, Select } from "@/components/common/Input";

export function PersonalInfoStep() {
  const {
    register,
    formState: { errors },
  } = useFormContext<UserInfo>();

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Personal Information</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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

// Similar implementations for ContactInfoStep, AddressStep, and AcademicsStep...
