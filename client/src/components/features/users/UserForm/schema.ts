import { z } from "zod";

export const formSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  dob: z.string(), // Changed to string
  occupation: z.string(),
  gender: z.string(),
  contact: z.object({
    email: z.string(),
    phoneNumber: z.string(),
  }),
  address: z.object({
    address: z.string(),
    city: z.string(),
    state: z.string(),
    country: z.string(),
    zipCode: z.string(),
  }),
  academics: z.array(
    z.object({
      schoolName: z.string(),
      degree: z.string(),
      graduationYear: z.number(),
    }),
  ),
});
