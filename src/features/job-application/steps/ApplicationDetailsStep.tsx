import { CheckboxField } from "../../../components/form/CheckboxField";
import { TextField } from "../../../components/form/TextField";
import { TextAreaField } from "../../../components/form/TextAreaField";

function ApplicationDetailsStep() {
  return (
    <section>
      <h2>Application details</h2>
      <div className="fieldGrid">
        <TextField
          name="positionAppliedFor"
          label="Position applied for"
          placeholder="Job title"
          required
        />
        <TextField
          name="expectedJoiningDate"
          label="Expected joining date"
          type="date"
          required
        />
        <TextField
          name="portfolioUrl"
          label="Portfolio link (optional)"
          type="url"
          placeholder="https://"
        />
      </div>
      <TextAreaField name="coverNote" label="Cover note (optional)" rows={5} maxLength={1000} />
      <CheckboxField name="acceptedTerms" label="I accept the terms and conditions." />
    </section>
  );
}

export default ApplicationDetailsStep;
