"use client";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { CreateUserDto, UserInfo } from "@/types/user.types";
import { PersonalInfoStep } from "@/features/users/UserForm/steps/PersonalInfoStep";
import { ContactInfoStep } from "@/features/users/UserForm/steps/ContactInfoStep";
import { AddressStep } from "@/features/users/UserForm/steps/AddressStep";
import { AcademicsStep } from "@/features/users/UserForm/steps/AcademicsStep";
import { useMultiStepForm } from "@/hooks/useMultistepForm";
import { ResumePreview } from "@/features/users/UserForm/steps/ResumePreview";
import { formSchema } from "./schema";
import { useCreateUserMutation } from "@/features/users/UsersApi";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

interface UserFormProps {
  initialData?: UserInfo;
  onSubmit?: (data: CreateUserDto) => Promise<void>;
  isSubmitting?: boolean;
  submitLabel?: string;
}

export function UserForm({
  initialData,
  onSubmit: externalSubmit,
  isSubmitting = false,
  submitLabel = "Submit",
}: UserFormProps = {}) {
  // Provide empty default object for props
  const methods = useForm<CreateUserDto>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: initialData?.firstName || "",
      lastName: initialData?.lastName || "",
      dob: initialData?.dob || "",
      occupation: initialData?.occupation || "",
      gender: initialData?.gender || "",
      contact: {
        email: initialData?.contact?.email || "",
        phoneNumber: initialData?.contact?.phoneNumber || "",
      },
      address: {
        address: initialData?.address?.address || "",
        city: initialData?.address?.city || "",
        state: initialData?.address?.state || "",
        country: initialData?.address?.country || "",
        zipCode: initialData?.address?.zipCode || "",
      },
      academics: initialData?.academics || [
        {
          schoolName: "",
          degree: "",
          graduationYear: 0,
        },
      ],
    },
  });

  const { currentStep, next, back, isFirstStep, isLastStep } =
    useMultiStepForm(4);
  const [createUser, { isLoading }] = useCreateUserMutation();
  const router = useRouter();

  const handleSubmit = async (data: CreateUserDto) => {
    if (externalSubmit) {
      await externalSubmit(data);
    } else {
      try {
        await createUser(data).unwrap();
        toast.success("User created successfully");
        router.push("/users");
      } catch (error) {
        toast.error("Failed to create user");
        console.error("Failed to create user:", error);
      }
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleSubmit)}>
        {currentStep === 0 && <PersonalInfoStep />}
        {currentStep === 1 && <ContactInfoStep />}
        {currentStep === 2 && <AddressStep />}
        {currentStep === 3 && <AcademicsStep />}
        {currentStep === 4 && <ResumePreview />}

        <div className="mt-4 flex justify-between">
          {!isFirstStep && (
            <button
              type="button"
              onClick={back}
              disabled={isSubmitting || isLoading}
              className="rounded-md bg-gray-100 px-4 py-2 text-gray-700 hover:bg-gray-200"
            >
              Back
            </button>
          )}
          <button
            type="button"
            onClick={isLastStep ? methods.handleSubmit(handleSubmit) : next}
            disabled={isSubmitting || isLoading}
            className={`rounded-md px-4 py-2 ${
              isLastStep
                ? "bg-green-600 text-white hover:bg-green-700"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {isSubmitting || isLoading
              ? "Saving..."
              : isLastStep
                ? submitLabel
                : "Next"}
          </button>
        </div>
      </form>
    </FormProvider>
  );
}
