import type { FieldPath } from "react-hook-form";
import { useFormContext } from "react-hook-form";
import type { ApplicationFormValues } from "../../features/job-application/applicationRules";
import { FieldErrorMessage, useFieldError } from "./FieldError";

type RadioOption = {
  label: string;
  value: string;
};

type RadioGroupFieldProps = {
  name: FieldPath<ApplicationFormValues>;
  label: string;
  options: RadioOption[];
  required?: boolean;
};

export function RadioGroupField({
  name,
  label,
  options,
  required = false,
}: RadioGroupFieldProps) {
  const { register } = useFormContext<ApplicationFormValues>();
  const error = useFieldError(name);
  const errorId = `${name}-error`;

  return (
    <fieldset
      className="formField radioField"
    >
      <legend>{label}</legend>
      <div className="radioOptions">
        {options.map((option) => (
          <label className="radioOption" key={option.value}>
            <input
              type="radio"
              value={option.value}
              required={required}
              aria-invalid={Boolean(error)}
              aria-describedby={error ? errorId : undefined}
              {...register(name)}
            />
            {option.label}
          </label>
        ))}
      </div>
      <FieldErrorMessage name={name} error={error} />
    </fieldset>
  );
}
