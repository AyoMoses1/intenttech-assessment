// src/components/features/users/UserForm/steps/ContactInfoStep.tsx

import { useFormContext } from "react-hook-form";
import type { UserInfo } from "@/types/user.types";
import { Input } from "@/components/common/Input";

export function ContactInfoStep() {
  const {
    register,
    formState: { errors },
  } = useFormContext<UserInfo>();

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Contact Information</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Input
          label="Email"
          type="email"
          {...register("contact.email")}
          error={errors.contact?.email?.message}
          required
        />
        <Input
          label="Phone Number"
          type="tel"
          {...register("contact.phoneNumber")}
          error={errors.contact?.phoneNumber?.message}
          required
        />
        <Input
          label="Fax (Optional)"
          type="tel"
          {...register("contact.fax")}
          error={errors.contact?.fax?.message}
        />
        <Input
          label="LinkedIn URL (Optional)"
          type="url"
          {...register("contact.linkedInUrl")}
          error={errors.contact?.linkedInUrl?.message}
          placeholder="https://linkedin.com/in/username"
        />
      </div>
    </div>
  );
}
