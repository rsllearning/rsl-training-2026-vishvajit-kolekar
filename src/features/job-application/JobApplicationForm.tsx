import { useEffect, useState, type FormEvent } from "react";
import { FormProvider, useForm, type FieldPath } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import PersonalStep from "./steps/PersonalStep";
import EducationStep from "./steps/EducationStep";
import ExperienceStep from "./steps/ExperienceStep";
import ApplicationDetailsStep from "./steps/ApplicationDetailsStep";
import ReviewStep from "./steps/ReviewStep";
import {
  applicationRules,
  type ApplicationFormValues,
} from "./applicationRules";
import { submitApplication, type MockOutcome } from "./apis";

const stepNames = [
  "Personal details",
  "Education",
  "Experience",
  "Application details",
  "Review and submit",
];

const stepFields: FieldPath<ApplicationFormValues>[][] = [
  ["fullName", "email", "phone", "dateOfBirth", "currentCity"],
  ["education"],
  [
    "candidateType",
    "availabilityDate",
    "totalExperienceYears",
    "noticePeriodDays",
    "previousCompanies",
  ],
  ["positionAppliedFor", "expectedJoiningDate", "portfolioUrl", "coverNote", "acceptedTerms"],
];

function JobApplicationForm() {
  const methods = useForm<ApplicationFormValues>({
    resolver: zodResolver(applicationRules),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      dateOfBirth: "",
      currentCity: "",
      education: [
        {
          degree: "",
          institution: "",
          passingYear: new Date().getFullYear(),
          percentage: 0,
        },
      ],
      positionAppliedFor: "",
      expectedJoiningDate: "",
      portfolioUrl: "",
      coverNote: "",
      acceptedTerms: false,
      candidateType: "fresher",
      availabilityDate: "",
    },
    mode: "onTouched",
  });

  const [currentStep, setCurrentStep] = useState(0);
  const [mockOutcome, setMockOutcome] = useState<MockOutcome>("success");
  const [formMessage, setFormMessage] = useState("");
  const [messageType, setMessageType] = useState<"error" | "success" | "">("");
  const [focusEmailAfterServerError, setFocusEmailAfterServerError] = useState(false);
  const { handleSubmit, setError, setFocus, formState: { isSubmitting } } = methods;

  useEffect(() => {
    if (focusEmailAfterServerError && currentStep === 0) {
      setFocus("email");
      setFocusEmailAfterServerError(false);
    }
  }, [currentStep, focusEmailAfterServerError, setFocus]);

  async function goToNextStep() {
    const valid = await methods.trigger(stepFields[currentStep], { shouldFocus: true });
    if (valid) {
      setFormMessage("");
      setMessageType("");
      setCurrentStep((step) => Math.min(step + 1, stepNames.length - 1));
    }
  }

  async function onSubmit(application: ApplicationFormValues) {
    setFormMessage("");
    setMessageType("");
    const result = await submitApplication(application, mockOutcome);

    if (result.status === "validationError") {
      setError(result.field, { type: "server", message: result.message });
      setFormMessage("Please fix the highlighted field.");
      setMessageType("error");
      setCurrentStep(0);
      setFocusEmailAfterServerError(true);
      return;
    }

    if (result.status === "serverError") {
      setFormMessage(result.message);
      setMessageType("error");
      return;
    }

    setFormMessage(result.message);
    setMessageType("success");
  }

  function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (currentStep === stepNames.length - 1) {
      void handleSubmit(onSubmit)(event);
      return;
    }

    void goToNextStep();
  }

  const stepContent = [
    <PersonalStep key="personal" />,
    <EducationStep key="education" />,
    <ExperienceStep key="experience" />,
    <ApplicationDetailsStep key="application" />,
    <ReviewStep
      key="review"
      outcome={mockOutcome}
      onOutcomeChange={setMockOutcome}
    />,
  ][currentStep];

  return (
    <main className="pageShell">
      <div className="formCard">
        <header className="formHeader">
          <p className="eyebrow">Careers</p>
          <h1>Job application</h1>
          <p>Complete each step to apply for an open position.</p>
        </header>

        <ol className="stepList">
          {stepNames.map((name, index) => (
            <li
              key={name}
              className={index === currentStep ? "stepItem active" : "stepItem"}
            >
              <span className="stepNumber">{index + 1}</span>
              <span>{name}</span>
            </li>
          ))}
        </ol>

        <p className="stepCount">Step {currentStep + 1} of {stepNames.length}</p>

        <FormProvider {...methods}>
          <form onSubmit={handleFormSubmit} noValidate>
            {stepContent}

            {formMessage && (
              <p
                className={`formMessage ${messageType}`}
                role={messageType === "error" ? "alert" : undefined}
              >
                {formMessage}
              </p>
            )}

            <div className="formActions">
              {currentStep > 0 && (
                <button
                  type="button"
                  className="button buttonSecondary"
                  onClick={() => {
                    setFormMessage("");
                    setMessageType("");
                    setCurrentStep((step) => Math.max(step - 1, 0));
                  }}
                  disabled={isSubmitting}
                >
                  Back
                </button>
              )}
              {currentStep < stepNames.length - 1 ? (
                <button type="submit" className="button buttonPrimary" disabled={isSubmitting}>
                  Continue
                </button>
              ) : (
                <button type="submit" className="button buttonPrimary" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting…" : "Submit application"}
                </button>
              )}
            </div>
          </form>
        </FormProvider>
      </div>
    </main>
  );
}

export default JobApplicationForm;
