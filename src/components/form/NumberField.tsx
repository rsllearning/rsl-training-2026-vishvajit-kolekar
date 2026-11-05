import type { FieldPath } from "react-hook-form";
import { useFormContext } from "react-hook-form";
import type { ApplicationFormValues } from "../../features/job-application/applicationRules";
import { FieldErrorMessage, useFieldError } from "./FieldError";

type NumberFieldProps = {
  name: FieldPath<ApplicationFormValues>;
  label: string;
  required?: boolean;
  min?: number;
  max?: number;
  step?: number;
};

export function NumberField({
  name,
  label,
  required = false,
  min,
  max,
  step,
}: NumberFieldProps) {
  const { register } = useFormContext<ApplicationFormValues>();
  const error = useFieldError(name);
  const errorId = `${name}-error`;

  return (
    <div className="formField">
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        type="number"
        min={min}
        max={max}
        step={step}
        required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        {...register(name, { valueAsNumber: true })}
      />
      <FieldErrorMessage name={name} error={error} />
    </div>
  );
}
