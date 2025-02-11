// src/components/features/users/UserForm/steps/AddressStep.tsx

import { useFormContext } from "react-hook-form";
import type { UserInfo } from "@/types/user.types";
import { Input } from "@/components/common/Input";

export function AddressStep() {
  const {
    register,
    formState: { errors },
  } = useFormContext<UserInfo>();

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Address Information</h2>
      <div className="grid grid-cols-1 gap-6">
        <Input
          label="Street Address"
          {...register("address.address")}
          error={errors.address?.address?.message}
          required
        />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Input
            label="City"
            {...register("address.city")}
            error={errors.address?.city?.message}
            required
          />
          <Input
            label="State/Province"
            {...register("address.state")}
            error={errors.address?.state?.message}
            required
          />
          <Input
            label="Country"
            {...register("address.country")}
            error={errors.address?.country?.message}
            required
          />
          <Input
            label="ZIP/Postal Code"
            {...register("address.zipCode")}
            error={errors.address?.zipCode?.message}
            required
          />
        </div>
      </div>
    </div>
  );
}
