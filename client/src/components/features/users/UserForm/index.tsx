"use client";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"; // Fixed import
import type { CreateUserDto } from "@/types/user.types";
import { PersonalInfoStep } from "@/features/users/UserForm/steps/PersonalInfoStep";
import { ContactInfoStep } from "@/features/users/UserForm/steps/ContactInfoStep";
import { AddressStep } from "@/features/users/UserForm/steps/AddressStep";
import { AcademicsStep } from "@/features/users/UserForm/steps/AcademicsStep";
import { useMultiStepForm } from "@/hooks/useMultistepForm";
import { ResumePreview } from "@/features/users/UserForm/steps/ResumePreview";
import { formSchema } from "./schema";
import { useCreateUserMutation } from "@/features/users/UsersApi";
import { toast } from "react-hot-toast"; // Optional, for notifications
import { useRouter } from "next/navigation";

export function UserForm() {
  const methods = useForm<CreateUserDto>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      dob: "",
      occupation: "",
      gender: "",
      contact: {
        email: "",
        phoneNumber: "",
      },
      address: {
        address: "",
        city: "",
        state: "",
        country: "",
        zipCode: "",
      },
      academics: [
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

  const onSubmit = async (data: CreateUserDto) => {
    try {
      await createUser(data).unwrap();
      toast.success("User created successfully");
      router.push("/users");
    } catch (error) {
      toast.error("Failed to create user");
      console.error("Failed to create user:", error);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {currentStep === 0 && <PersonalInfoStep />}
        {currentStep === 1 && <ContactInfoStep />}
        {currentStep === 2 && <AddressStep />}
        {currentStep === 3 && <AcademicsStep />}
        {currentStep === 4 && <ResumePreview />}

        <div className="mt-4 flex justify-between">
          {!isFirstStep && (
            <button type="button" onClick={back}>
              Back
            </button>
          )}
          <button
            type="button"
            onClick={isLastStep ? methods.handleSubmit(onSubmit) : next}
          >
            {isLastStep ? "Submit" : "Next"}
          </button>
        </div>
      </form>
    </FormProvider>
  );
}
