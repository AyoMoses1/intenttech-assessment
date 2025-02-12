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
  const methods = useForm<CreateUserDto>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      profilePhoto: initialData?.profilePhoto || "",
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
    mode: "onChange", // Enable real-time validation
  });

  const {
    trigger,
    formState: { errors, isValid },
  } = methods;

  const { currentStep, next, back, isFirstStep, isLastStep } =
    useMultiStepForm(4);
  const [createUser, { isLoading }] = useCreateUserMutation();
  const router = useRouter();

  // Define validation fields for each step
  const stepValidationFields = {
    0: ["firstName", "lastName", "dob", "occupation", "gender"],
    1: ["contact.email", "contact.phoneNumber"],
    2: [
      "address.address",
      "address.city",
      "address.state",
      "address.country",
      "address.zipCode",
    ],
    3: ["academics"],
    4: [], // Preview step doesn't need validation
  };

  // Function to check if current step is valid
  const isStepValid = async () => {
    const fields =
      stepValidationFields[currentStep as keyof typeof stepValidationFields];
    const result = await trigger(fields as any);
    return result;
  };

  // Handle next step with validation
  const handleNext = async () => {
    const isValid = await isStepValid();
    if (isValid) {
      next();
    } else {
      toast.error("Please fill in all required fields correctly");
    }
  };

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

  // Function to check if the current step has any errors
  const hasStepErrors = () => {
    const currentFields =
      stepValidationFields[currentStep as keyof typeof stepValidationFields];
    return currentFields.some((field) => {
      const fieldPath = field.split(".");
      let fieldError: any = errors;
      for (const key of fieldPath) {
        if (fieldError && fieldError[key as keyof typeof fieldError]) {
          fieldError = fieldError[key as keyof typeof fieldError];
        } else {
          return false;
        }
      }
      return !!fieldError;
    });
  };

  const isNextDisabled = hasStepErrors() || isSubmitting || isLoading;

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(handleSubmit)}
        className="mx-auto w-full max-w-2xl rounded-lg bg-card p-6 shadow-md"
      >
        <div className="space-y-6">
          {currentStep === 0 && <PersonalInfoStep />}
          {currentStep === 1 && <ContactInfoStep />}
          {currentStep === 2 && <AddressStep />}
          {currentStep === 3 && <AcademicsStep />}
          {currentStep === 4 && <ResumePreview />}
        </div>

        <div className="mt-6 flex justify-between">
          {!isFirstStep && (
            <button
              type="button"
              onClick={back}
              disabled={isSubmitting || isLoading}
              className="rounded-md bg-secondary px-4 py-2 text-secondary-foreground transition-colors hover:bg-secondary/90 disabled:opacity-50"
            >
              Back
            </button>
          )}
          <button
            type="button"
            onClick={
              isLastStep ? methods.handleSubmit(handleSubmit) : handleNext
            }
            disabled={isNextDisabled}
            className={`rounded-md px-4 py-2 transition-colors disabled:opacity-50 ${
              isLastStep
                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                : "bg-accent text-accent-foreground hover:bg-accent/90"
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
