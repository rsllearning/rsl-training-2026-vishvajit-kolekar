import type { FieldPath } from "react-hook-form";
import { useFormContext, useFormState } from "react-hook-form";
import type { ApplicationFormValues } from "../../features/job-application/applicationRules";

type FieldErrorMessageProps = {
  name: FieldPath<ApplicationFormValues>;
  error?: { message?: string };
};

export function useFieldError(name: FieldPath<ApplicationFormValues>) {
  const { getFieldState } = useFormContext<ApplicationFormValues>();
  const formState = useFormState<ApplicationFormValues>({ name, exact: true });
  return getFieldState(name, formState).error;
}

export function FieldErrorMessage({ name, error }: FieldErrorMessageProps) {
  return error?.message ? (
    <p id={`${name}-error`} className="fieldError" role="alert">
      {error.message}
    </p>
  ) : null;
}
