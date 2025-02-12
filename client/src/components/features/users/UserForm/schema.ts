import { z } from "zod";

export const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  dob: z.string().min(1, "Date of birth is required"),
  occupation: z.string().min(1, "Occupation is required"),
  gender: z.string().min(1, "Gender is required"),
  contact: z.object({
    email: z
      .string()
      .min(1, "Email is required")
      .email("Invalid email address"),
    phoneNumber: z
      .string()
      .min(1, "Phone number is required")
      .min(10, "Phone number must be at least 10 digits"),
  }),
  address: z.object({
    address: z.string().min(1, "Address is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    country: z.string().min(1, "Country is required"),
    zipCode: z.string().min(1, "Zip code is required"),
  }),
  academics: z
    .array(
      z.object({
        schoolName: z.string().min(1, "School name is required"),
        degree: z.string().min(1, "Degree is required"),
        graduationYear: z
          .number()
          .min(1900, "Graduation year must be after 1900")
          .max(
            new Date().getFullYear() + 10,
            "Graduation year cannot be too far in the future",
          ),
      }),
    )
    .min(1, "At least one academic record is required"),
});
