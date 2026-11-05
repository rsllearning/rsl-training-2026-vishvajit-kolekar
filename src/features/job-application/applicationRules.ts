import { z } from "zod";

const educationSchema = z.object({
  degree: z.string().min(2, { error: "Enter a degree." }).max(100),
  institution: z.string().min(2, { error: "Enter the institution name." }).max(120),
  passingYear: z
    .number()
    .int({ error: "Enter a whole year." })
    .min(1950, { error: "Enter a year from 1950 onward." })
    .max(new Date().getFullYear(), { error: "Passing year cannot be in the future." }),
  percentage: z
    .number()
    .min(0, { error: "Percentage cannot be less than 0." })
    .max(100, { error: "Percentage cannot be more than 100." }),
});

const previousCompanySchema = z
  .object({
    companyName: z.string().min(2, { error: "Enter the company name." }).max(120),
    role: z.string().min(2, { error: "Enter your role." }).max(100),
    fromDate: z.iso.date({ error: "Enter a valid start date." }),
    toDate: z.iso.date({ error: "Enter a valid end date." }),
  })
  .refine((company) => company.toDate > company.fromDate, {
    error: "End date must be after the start date.",
    path: ["toDate"],
  });

const commonFields = {
  fullName: z.string().min(2, { error: "Enter your full name." }).max(100),
  email: z.email({ error: "Enter a valid email address." }),
  phone: z
    .string()
    .regex(/^\+?[0-9\s()-]{7,20}$/, { error: "Enter a valid phone number." }),
  dateOfBirth: z.iso.date({ error: "Enter a valid date of birth." }),
  currentCity: z.string().min(2, { error: "Enter your current city." }).max(100),
  education: z.array(educationSchema).min(1, { error: "Add at least one qualification." }),
  positionAppliedFor: z.string().min(2, { error: "Enter the position you are applying for." }).max(100),
  expectedJoiningDate: z.iso.date({ error: "Enter a valid expected joining date." }),
  portfolioUrl: z.union([
    z.literal(""),
    z.url({ error: "Enter a valid portfolio URL." }),
  ]),
  coverNote: z.string().max(1000, { error: "Cover note must be 1000 characters or fewer." }),
  acceptedTerms: z.boolean().refine((accepted) => accepted, {
    error: "You must accept the terms.",
  }),
};

const fresherSchema = z.object({
  ...commonFields,
  candidateType: z.literal("fresher"),
  availabilityDate: z.iso.date({ error: "Enter your availability date." }),
});

const experiencedSchema = z.object({
  ...commonFields,
  candidateType: z.literal("experienced"),
  totalExperienceYears: z
    .number()
    .min(0.1, { error: "Experience must be at least 0.1 years." })
    .max(50, { error: "Experience cannot exceed 50 years." }),
  noticePeriodDays: z
    .number()
    .int({ error: "Enter a whole number of days." })
    .min(0, { error: "Notice period cannot be negative." })
    .max(365, { error: "Notice period cannot exceed 365 days." }),
  previousCompanies: z
    .array(previousCompanySchema)
    .min(1, { error: "Add at least one previous company." }),
});

function isAtLeastEighteen(dateOfBirth: string): boolean {
  const birthDate = new Date(`${dateOfBirth}T00:00:00`);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();

  if (
    today.getMonth() < birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())
  ) {
    age -= 1;
  }

  return age >= 18;
}

function isFutureDate(date: string): boolean {
  const today = new Date();
  const todayString = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");

  return date > todayString;
}

export const applicationRules = z
  .discriminatedUnion("candidateType", [fresherSchema, experiencedSchema])
  .superRefine((application, context) => {
    if (!isAtLeastEighteen(application.dateOfBirth)) {
      context.addIssue({
        code: "custom",
        message: "You must be at least 18 years old to apply.",
        path: ["dateOfBirth"],
      });
    }

    if (!isFutureDate(application.expectedJoiningDate)) {
      context.addIssue({
        code: "custom",
        message: "Expected joining date must be in the future.",
        path: ["expectedJoiningDate"],
      });
    }
  });

export type ApplicationFormValues = z.infer<typeof applicationRules>;
