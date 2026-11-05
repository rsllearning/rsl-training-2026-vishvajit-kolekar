import { useFieldArray, useFormContext } from "react-hook-form";
import { ArrayError } from "../../../components/form/ArrayError";
import { NumberField } from "../../../components/form/NumberField";
import { TextField } from "../../../components/form/TextField";
import type { ApplicationFormValues } from "../applicationRules";

function EducationStep() {
  const { control } = useFormContext<ApplicationFormValues>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "education",
  });

  return (
    <section>
      <h2>Education</h2>
      <p>Add at least one qualification.</p>
      <div className="repeatList">
        {fields.map((field, index) => (
          <fieldset className="repeatCard" key={field.id}>
            <legend>Qualification {index + 1}</legend>
            <div className="fieldGrid">
              <TextField
                name={`education.${index}.degree` as const}
                label="Degree or qualification"
                required
              />
              <TextField
                name={`education.${index}.institution` as const}
                label="Institution"
                required
              />
              <NumberField
                name={`education.${index}.passingYear` as const}
                label="Year of passing"
                min={1950}
                max={new Date().getFullYear()}
                step={1}
                required
              />
              <NumberField
                name={`education.${index}.percentage` as const}
                label="Percentage"
                min={0}
                max={100}
                step={0.01}
                required
              />
            </div>
            <button type="button" className="button buttonSecondary" onClick={() => remove(index)}>
              Remove qualification
            </button>
          </fieldset>
        ))}
      </div>
      <ArrayError name="education" />
      <button
        type="button"
        className="button buttonSecondary"
        onClick={() => append({ degree: "", institution: "", passingYear: new Date().getFullYear(), percentage: 0 })}
      >
        Add qualification
      </button>
    </section>
  );
}

export default EducationStep;
