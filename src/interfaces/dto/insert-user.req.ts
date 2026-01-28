import { z } from "zod";

export const InsertUserDTO = z.object({
  firstName: z.string().min(1, "First name is required"),

  lastName: z.string().min(1, "Last name is required"),

  jobTitle: z.string().min(1, "Job title is required"),

  companyName: z.string().min(1, "Company name is required"),

  emailAddress: z.email("Invalid email address"),

  country: z.string().min(1, "Please select a country"),

  // Phone number validation can be tricky;
  // usually best paired with a library like libphonenumber-js
  phoneNumber: z.string().min(5, "Phone number is too short"),

  companyWebsite: z.url("Invalid URL").or(z.literal("")), // Allows empty string if optional

  currentMonthlyVolume: z
    .string()
    .min(1, "Please enter your processing volume"),

  howDidYouHear: z.string().min(1, "Please select an option"),

  description: z
    .string()
    .max(500, "Description must be under 500 characters")
    .optional(),
});

export type InsertUserDTO = z.infer<typeof InsertUserDTO>;
