import type { TextareaHTMLAttributes } from "react";
import type { FieldPath } from "react-hook-form";
import { useFormContext } from "react-hook-form";
import type { ApplicationFormValues } from "../../features/job-application/applicationRules";
import { FieldErrorMessage, useFieldError } from "./FieldError";

type TextAreaFieldProps = {
  name: FieldPath<ApplicationFormValues>;
  label: string;
  required?: boolean;
} & Pick<TextareaHTMLAttributes<HTMLTextAreaElement>, "rows" | "maxLength" | "placeholder">;

export function TextAreaField({
  name,
  label,
  required = false,
  rows,
  maxLength,
  placeholder,
}: TextAreaFieldProps) {
  const { register } = useFormContext<ApplicationFormValues>();
  const error = useFieldError(name);
  const errorId = `${name}-error`;

  return (
    <div className="formField">
      <label htmlFor={name}>{label}</label>
      <textarea
        id={name}
        rows={rows}
        maxLength={maxLength}
        placeholder={placeholder}
        required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        {...register(name)}
      />
      <FieldErrorMessage name={name} error={error} />
    </div>
  );
}
