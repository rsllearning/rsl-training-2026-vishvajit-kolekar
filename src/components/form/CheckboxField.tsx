import type { FieldPath } from "react-hook-form";
import { useFormContext } from "react-hook-form";
import type { ApplicationFormValues } from "../../features/job-application/applicationRules";
import { FieldErrorMessage, useFieldError } from "./FieldError";

type CheckboxFieldProps = {
  name: FieldPath<ApplicationFormValues>;
  label: string;
};

export function CheckboxField({ name, label }: CheckboxFieldProps) {
  const { register } = useFormContext<ApplicationFormValues>();
  const error = useFieldError(name);
  const errorId = `${name}-error`;

  return (
    <div className="formField checkboxField">
      <div className="checkboxControl">
        <input
          id={name}
          type="checkbox"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          {...register(name)}
        />
        <label htmlFor={name}>{label}</label>
      </div>
      <FieldErrorMessage name={name} error={error} />
    </div>
  );
}
