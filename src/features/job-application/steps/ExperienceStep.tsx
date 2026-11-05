import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import { ArrayError } from "../../../components/form/ArrayError";
import { NumberField } from "../../../components/form/NumberField";
import { RadioGroupField } from "../../../components/form/RadioGroupField";
import { TextField } from "../../../components/form/TextField";
import type { ApplicationFormValues } from "../applicationRules";

function ExperiencedFields() {
  const { control } = useFormContext<ApplicationFormValues>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "previousCompanies",
  });

  return (
    <>
      <div className="fieldGrid">
        <NumberField
          name="totalExperienceYears"
          label="Total experience (years)"
          min={0.1}
          max={50}
          step={0.1}
          required
        />
        <NumberField
          name="noticePeriodDays"
          label="Notice period (days)"
          min={0}
          max={365}
          step={1}
          required
        />
      </div>
      <div className="repeatList">
        {fields.map((field, index) => (
          <fieldset className="repeatCard" key={field.id}>
            <legend>Previous company {index + 1}</legend>
            <div className="fieldGrid">
              <TextField
                name={`previousCompanies.${index}.companyName` as const}
                label="Company name"
                required
              />
              <TextField
                name={`previousCompanies.${index}.role` as const}
                label="Role"
                required
              />
              <TextField
                name={`previousCompanies.${index}.fromDate` as const}
                label="From"
                type="date"
                required
              />
              <TextField
                name={`previousCompanies.${index}.toDate` as const}
                label="To"
                type="date"
                required
              />
            </div>
            <button type="button" className="button buttonSecondary" onClick={() => remove(index)}>
              Remove company
            </button>
          </fieldset>
        ))}
      </div>
      <ArrayError name="previousCompanies" />
      <button
        type="button"
        className="button buttonSecondary"
        onClick={() => append({ companyName: "", role: "", fromDate: "", toDate: "" })}
      >
        Add previous company
      </button>
    </>
  );
}

function ExperienceStep() {
  const { control } = useFormContext<ApplicationFormValues>();
  const candidateType = useWatch({ control, name: "candidateType" });

  return (
    <section>
      <h2>Experience</h2>
      <RadioGroupField
        name="candidateType"
        label="Application type"
        required
        options={[
          { label: "Fresher", value: "fresher" },
          { label: "Experienced", value: "experienced" },
        ]}
      />
      {candidateType === "fresher" ? (
        <div className="fieldGrid conditionalFields">
          <TextField
            name="availabilityDate"
            label="Available to join from"
            type="date"
            required
          />
        </div>
      ) : (
        <div className="conditionalFields">
          <ExperiencedFields />
        </div>
      )}
    </section>
  );
}

export default ExperienceStep;
