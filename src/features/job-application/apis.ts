import type { ApplicationFormValues } from "./applicationRules";

export type MockOutcome = "validationError" | "serverError" | "success";

type SubmissionResult =
  | { status: "validationError"; field: "email"; message: string }
  | { status: "serverError"; message: string }
  | { status: "success"; message: string };

export async function submitApplication(
  _application: ApplicationFormValues,
  outcome: MockOutcome,
): Promise<SubmissionResult> {
  await new Promise((resolve) => window.setTimeout(resolve, 1500));

  if (outcome === "validationError") {
    return {
      status: "validationError",
      field: "email",
      message: "This email is already in use.",
    };
  }

  if (outcome === "serverError") {
    return {
      status: "serverError",
      message: "Server error. Please try again.",
    };
  }

  return {
    status: "success",
    message: "Application submitted.",
  };
}
