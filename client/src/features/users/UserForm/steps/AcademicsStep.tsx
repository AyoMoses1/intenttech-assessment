// src/components/features/users/UserForm/steps/AcademicsStep.tsx

import { useFieldArray, useFormContext } from "react-hook-form";
import { Input } from "@/components/common/Input";
import type { UserInfo } from "@/types/user.types";

export function AcademicsStep() {
  const {
    register,
    formState: { errors },
    control,
  } = useFormContext<UserInfo>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "academics",
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Academic Background</h2>
        <button
          type="button"
          onClick={() =>
            append({
              schoolName: "",
              degree: "",
              graduationYear: new Date().getFullYear(),
              description: "",
            })
          }
          className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Add Education
        </button>
      </div>

      {fields.map((field, index) => (
        <div key={field.id} className="rounded-lg bg-gray-50 p-6">
          <div className="mb-4 flex items-start justify-between">
            <h3 className="text-lg font-medium">Education #{index + 1}</h3>
            {index > 0 && (
              <button
                type="button"
                onClick={() => remove(index)}
                className="text-red-600 hover:text-red-800"
              >
                Remove
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Input
              label="School/University Name"
              {...register(`academics.${index}.schoolName`)}
              error={errors.academics?.[index]?.schoolName?.message}
              required
            />
            <Input
              label="Degree"
              {...register(`academics.${index}.degree`)}
              error={errors.academics?.[index]?.degree?.message}
              required
            />
            <Input
              label="Graduation Year"
              type="number"
              min={1900}
              max={new Date().getFullYear()}
              {...register(`academics.${index}.graduationYear`, {
                valueAsNumber: true,
              })}
              error={errors.academics?.[index]?.graduationYear?.message}
              required
            />
            <Input
              label="Description (Optional)"
              {...register(`academics.${index}.description`)}
              error={errors.academics?.[index]?.description?.message}
            />
          </div>
        </div>
      ))}

      {fields.length === 0 && (
        <div className="rounded-lg bg-gray-50 py-8 text-center">
          <p className="text-gray-500">No academic records added yet.</p>
          <button
            type="button"
            onClick={() =>
              append({
                schoolName: "",
                degree: "",
                graduationYear: new Date().getFullYear(),
                description: "",
              })
            }
            className="mt-4 text-blue-600 hover:text-blue-800"
          >
            Add Education
          </button>
        </div>
      )}
    </div>
  );
}
