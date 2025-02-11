// src/utils/validation.ts

import { z } from "zod";

export const userAcademicSchema = z.object({
  schoolName: z.string().min(1, "School name is required"),
  degree: z.string().min(1, "Degree is required"),
  graduationYear: z
    .number()
    .min(1900, "Invalid year")
    .max(new Date().getFullYear(), "Year cannot be in the future"),
  description: z.string().optional(),
});

export const userAddressSchema = z.object({
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  country: z.string().min(1, "Country is required"),
  zipCode: z.string().min(1, "Zip code is required"),
});

export const userContactSchema = z.object({
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number"),
  fax: z.string().optional(),
  linkedInUrl: z.string().url("Invalid LinkedIn URL").optional(),
});

export const userInfoSchema = z.object({
  profilePhoto: z.string().optional(),
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  dob: z.date().max(new Date(), "Date of birth cannot be in the future"),
  occupation: z.string().min(2, "Occupation is required"),
  gender: z.enum(["Male", "Female", "Other"], {
    errorMap: () => ({ message: "Please select a valid gender" }),
  }),
  contact: userContactSchema,
  address: userAddressSchema,
  academics: z
    .array(userAcademicSchema)
    .min(1, "At least one academic record is required"),
});

export type UserFormData = z.infer<typeof userInfoSchema>;
