import type { FieldPath } from "react-hook-form";
import type { ApplicationFormValues } from "../../features/job-application/applicationRules";
import { FieldErrorMessage, useFieldError } from "./FieldError";

type ArrayErrorProps = {
  name: FieldPath<ApplicationFormValues>;
};

export function ArrayError({ name }: ArrayErrorProps) {
  const error = useFieldError(name);
  return <FieldErrorMessage name={name} error={error} />;
}
