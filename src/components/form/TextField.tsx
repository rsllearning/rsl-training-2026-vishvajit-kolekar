import type { InputHTMLAttributes } from "react";
import type { FieldPath } from "react-hook-form";
import { useFormContext } from "react-hook-form";
import type { ApplicationFormValues } from "../../features/job-application/applicationRules";
import { FieldErrorMessage, useFieldError } from "./FieldError";

type TextFieldProps = {
  name: FieldPath<ApplicationFormValues>;
  label: string;
  required?: boolean;
} & Pick<InputHTMLAttributes<HTMLInputElement>, "type" | "placeholder" | "autoComplete">;

export function TextField({
  name,
  label,
  required = false,
  type = "text",
  placeholder,
  autoComplete,
}: TextFieldProps) {
  const { register } = useFormContext<ApplicationFormValues>();
  const error = useFieldError(name);
  const errorId = `${name}-error`;

  return (
    <div className="formField">
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        {...register(name)}
      />
      <FieldErrorMessage name={name} error={error} />
    </div>
  );
}
