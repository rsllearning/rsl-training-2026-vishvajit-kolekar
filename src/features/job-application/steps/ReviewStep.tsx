import { useFormContext, useWatch } from "react-hook-form";
import type { ApplicationFormValues } from "../applicationRules";
import type { MockOutcome } from "../apis";

type ReviewStepProps = {
  outcome: MockOutcome;
  onOutcomeChange: (outcome: MockOutcome) => void;
};

function ReviewSummary() {
  const { control, getValues } = useFormContext<ApplicationFormValues>();
  useWatch({ control });
  const application = getValues();

  return (
    <div className="reviewSummary">
      <section>
        <h3>Personal details</h3>
        <dl>
          <div><dt>Full name</dt><dd>{application.fullName || "—"}</dd></div>
          <div><dt>Email</dt><dd>{application.email || "—"}</dd></div>
          <div><dt>Phone</dt><dd>{application.phone || "—"}</dd></div>
          <div><dt>Date of birth</dt><dd>{application.dateOfBirth || "—"}</dd></div>
          <div><dt>Current city</dt><dd>{application.currentCity || "—"}</dd></div>
        </dl>
      </section>

      <section>
        <h3>Education</h3>
        {application.education.map((education, index) => (
          <dl key={`${education.institution}-${index}`}>
            <div><dt>Qualification</dt><dd>{education.degree || "—"}</dd></div>
            <div><dt>Institution</dt><dd>{education.institution || "—"}</dd></div>
            <div><dt>Year of passing</dt><dd>{education.passingYear || "—"}</dd></div>
            <div><dt>Percentage</dt><dd>{education.percentage}%</dd></div>
          </dl>
        ))}
      </section>

      <section>
        <h3>Experience</h3>
        {application.candidateType === "fresher" ? (
          <dl>
            <div><dt>Candidate type</dt><dd>Fresher</dd></div>
            <div><dt>Available to join from</dt><dd>{application.availabilityDate || "—"}</dd></div>
          </dl>
        ) : (
          <>
            <dl>
              <div><dt>Candidate type</dt><dd>Experienced</dd></div>
              <div><dt>Total experience</dt><dd>{application.totalExperienceYears} years</dd></div>
              <div><dt>Notice period</dt><dd>{application.noticePeriodDays} days</dd></div>
            </dl>
            {application.previousCompanies.map((company, index) => (
              <dl key={`${company.companyName}-${index}`}>
                <div><dt>Company</dt><dd>{company.companyName || "—"}</dd></div>
                <div><dt>Role</dt><dd>{company.role || "—"}</dd></div>
                <div><dt>From</dt><dd>{company.fromDate || "—"}</dd></div>
                <div><dt>To</dt><dd>{company.toDate || "—"}</dd></div>
              </dl>
            ))}
          </>
        )}
      </section>

      <section>
        <h3>Application details</h3>
        <dl>
          <div><dt>Position</dt><dd>{application.positionAppliedFor || "—"}</dd></div>
          <div><dt>Expected joining date</dt><dd>{application.expectedJoiningDate || "—"}</dd></div>
          <div><dt>Portfolio</dt><dd>{application.portfolioUrl || "—"}</dd></div>
          <div><dt>Cover note</dt><dd>{application.coverNote || "—"}</dd></div>
          <div><dt>Terms accepted</dt><dd>{application.acceptedTerms ? "Yes" : "No"}</dd></div>
        </dl>
      </section>
    </div>
  );
}

function ReviewStep({ outcome, onOutcomeChange }: ReviewStepProps) {
  return (
    <section>
      <h2>Review and submit</h2>
      <p>Check your application before submitting.</p>
      <ReviewSummary />
      <div className="formField mockControl">
        <label htmlFor="mock-outcome">Mock API response</label>
        <select
          id="mock-outcome"
          value={outcome}
          onChange={(event) => {
            const value = event.currentTarget.value;
            if (value === "success" || value === "validationError" || value === "serverError") {
              onOutcomeChange(value);
            }
          }}
        >
          <option value="success">Success</option>
          <option value="validationError">Server field validation error</option>
          <option value="serverError">Server error</option>
        </select>
        <p className="fieldHint">Choose a response to demonstrate the submission flow.</p>
      </div>
    </section>
  );
}

export default ReviewStep;
