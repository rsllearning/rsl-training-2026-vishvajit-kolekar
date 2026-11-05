import { TextField } from "../../../components/form/TextField";

function PersonalStep() {
  return (
    <section>
      <h2>Personal details</h2>
      <div className="fieldGrid">
        <TextField name="fullName" label="Full name" autoComplete="name" required />
        <TextField name="email" label="Email" type="email" autoComplete="email" required />
        <TextField name="phone" label="Phone" type="tel" autoComplete="tel" required />
        <TextField name="dateOfBirth" label="Date of birth" type="date" required />
        <TextField name="currentCity" label="Current city" autoComplete="address-level2" required />
      </div>
    </section>
  );
}

export default PersonalStep;
