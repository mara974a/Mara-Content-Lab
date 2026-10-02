"use client";

import { useEffect, useState, FormEvent } from "react";
import { CONTACT_EMAIL } from "@/lib/constants";
import styles from "./RequestForm.module.css";

const FORM_ACTION = `https://formsubmit.co/${CONTACT_EMAIL}`;
const DRAFT_STORAGE_KEY = "mara-content-lab-request-draft-v1";
const SUCCESS_MESSAGE =
  "Thanks, your request is received. I'll review your source and get back to you within 2 business days. If it's a fit, I'll share scope confirmation and a payment link.";

interface FormData {
  fullName: string;
  workEmail: string;
  companyWebsite: string;
  role: string;
  sourceLink: string;
  targetAudience: string;
  contentGoal: string;
  linkedinUrl: string;
  voiceReferences: string;
  anythingElse: string;
  acknowledged: boolean;
}

interface FormErrors {
  fullName?: string;
  workEmail?: string;
  companyWebsite?: string;
  role?: string;
  sourceLink?: string;
  linkedinUrl?: string;
  targetAudience?: string;
  contentGoal?: string;
  acknowledged?: string;
}

const initialData: FormData = {
  fullName: "",
  workEmail: "",
  companyWebsite: "",
  role: "",
  sourceLink: "",
  targetAudience: "",
  contentGoal: "",
  linkedinUrl: "",
  voiceReferences: "",
  anythingElse: "",
  acknowledged: false,
};

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateUrl(url: string): boolean {
  if (!url) return true; // optional
  if (/\s/.test(url)) return false;
  try {
    const candidate = /^https?:\/\//i.test(url) ? url : `https://${url}`;
    const parsed = new URL(candidate);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

export default function RequestForm() {
  const [formData, setFormData] = useState<FormData>(initialData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [step, setStep] = useState(1);
  const [draftReady, setDraftReady] = useState(false);
  const [draftSaveFailed, setDraftSaveFailed] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const savedDraft = localStorage.getItem(DRAFT_STORAGE_KEY);
        if (savedDraft) {
          const parsed = JSON.parse(savedDraft) as {
            formData?: Partial<FormData>;
            step?: number;
          };
          if (parsed.formData) {
            setFormData({ ...initialData, ...parsed.formData });
          }
          if (typeof parsed.step === "number" && parsed.step >= 1 && parsed.step <= 3) {
            setStep(parsed.step);
          }
        }
      } catch {
        setDraftSaveFailed(true);
      } finally {
        setDraftReady(true);
      }
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  const hasDraft = Object.values(formData).some((value) =>
    typeof value === "string" ? value.trim() !== "" : value
  );

  useEffect(() => {
    if (!draftReady) return;

    try {
      if (submitted || !hasDraft) {
        localStorage.removeItem(DRAFT_STORAGE_KEY);
      } else {
        localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify({ formData, step }));
      }
    } catch {
      window.setTimeout(() => setDraftSaveFailed(true), 0);
    }
  }, [draftReady, formData, hasDraft, step, submitted]);

  useEffect(() => {
    if (draftReady && step > 1) {
      document.getElementById(`form-step-${step}-heading`)?.focus();
    }
  }, [draftReady, step]);

  const validateStep = (stepNumber: number): FormErrors => {
    const e: FormErrors = {};

    if (stepNumber === 1) {
      if (!formData.fullName.trim()) e.fullName = "Full name is required.";
      if (!formData.workEmail.trim()) {
        e.workEmail = "Work email is required.";
      } else if (!validateEmail(formData.workEmail)) {
        e.workEmail = "Please enter a valid email address.";
      }
      if (!formData.companyWebsite.trim()) {
        e.companyWebsite = "Company or professional website is required.";
      } else if (!validateUrl(formData.companyWebsite)) {
        e.companyWebsite = "Please enter a valid URL.";
      }
      if (!formData.role.trim()) e.role = "Role is required.";
    }

    if (stepNumber === 2) {
      if (!formData.sourceLink.trim()) {
        e.sourceLink = "Source link is required.";
      } else if (!validateUrl(formData.sourceLink)) {
        e.sourceLink = "Please enter a valid URL.";
      }
      if (formData.linkedinUrl.trim() && !validateUrl(formData.linkedinUrl)) {
        e.linkedinUrl = "Please enter a valid URL.";
      }
      if (!formData.targetAudience.trim()) {
        e.targetAudience = "Please describe who this content should reach.";
      }
      if (!formData.contentGoal.trim()) {
        e.contentGoal = "Please describe what the content should clarify.";
      }
    }

    if (stepNumber === 3 && !formData.acknowledged) {
      e.acknowledged = "Please confirm you understand how requests are reviewed.";
    }
    return e;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setDraftSaveFailed(false);
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const validationErrors = step === 3
      ? { ...validateStep(1), ...validateStep(2), ...validateStep(3) }
      : validateStep(step);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      const firstErrorKey = Object.keys(validationErrors)[0];
      const firstErrorStep = ["fullName", "workEmail", "companyWebsite", "role"].includes(firstErrorKey)
        ? 1
        : ["sourceLink", "linkedinUrl", "targetAudience", "contentGoal"].includes(firstErrorKey)
          ? 2
          : 3;
      setStep(firstErrorStep);
      requestAnimationFrame(() => {
        document.getElementById(`field-${firstErrorKey}`)?.focus();
      });
      return;
    }

    setSubmitError(null);
    if (step < 3) {
      setStep(step + 1);
      return;
    }

    setSubmitting(true);

    try {
      const body = new FormData(form);
      const response = await fetch(`https://formsubmit.co/ajax/${CONTACT_EMAIL}`, {
        method: "POST",
        body,
        headers: { Accept: "application/json" },
      });
      const result: { success?: boolean | string } = await response.json();

      if (
        !response.ok ||
        (result.success !== true && result.success !== "true")
      ) {
        throw new Error("submit-failed");
      }

      setSubmitted(true);
    } catch {
      setSubmitError("send-failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="request" className={styles.formSection} aria-labelledby="request-heading">
      <div className="container">
        <div className={styles.formHeader}>
          <p className="section-index">
            08 / REQUEST
          </p>
          <h2 id="request-heading" className={styles.formSectionHeading}>
            Request a project
          </h2>
          <p className={styles.formSupportingText}>
            Fill out the form below with one strong conversation and a little context. I&apos;ll review your request and reply within 2 business days. If it&apos;s a fit, I&apos;ll confirm the scope and share a payment link; otherwise, I&apos;ll let you know.
          </p>
        </div>

        {submitted ? (
          <div className={styles.successBox} role="status" aria-live="polite">
            <p className={styles.successHeading}>Request received</p>
            <p className={styles.successBody}>{SUCCESS_MESSAGE}</p>
          </div>
        ) : (
        <form
          className={styles.form}
          onSubmit={handleSubmit}
          action={FORM_ACTION}
          method="POST"
          noValidate
          aria-label="Project request form"
        >
          <input type="hidden" name="_subject" value="New Mara Content Lab request" />
          <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="_template" value="table" />
          <div className={styles.progressHeader}>
            <p className={styles.stepCount} aria-live="polite">Step {step} of 3</p>
            <div
              className={styles.progressTrack}
              role="progressbar"
              aria-label={`Request form progress: step ${step} of 3`}
              aria-valuemin={1}
              aria-valuemax={3}
              aria-valuenow={step}
            >
              <span style={{ width: `${(step / 3) * 100}%` }} />
            </div>
          </div>

          <div className={styles.stepFields} hidden={step !== 1} aria-labelledby="form-step-1-heading">
            <h3 id="form-step-1-heading" className={styles.stepHeading} tabIndex={-1}>
              Contact details
            </h3>
          {/* Row 1: Name + Email */}
          <div className={styles.formRow}>
            <div className={styles.fieldGroup}>
              <label htmlFor="field-fullName" className={styles.label}>
                Full name <span className={styles.required} aria-hidden="true">*</span>
              </label>
              <input
                id="field-fullName"
                name="fullName"
                type="text"
                autoComplete="name"
                className={`${styles.input} ${errors.fullName ? styles.inputError : ""}`}
                value={formData.fullName}
                onChange={handleChange}
                aria-required="true"
                required
                aria-describedby={errors.fullName ? "err-fullName" : undefined}
              />
              {errors.fullName && (
                <span id="err-fullName" className={styles.fieldError} role="alert">
                  {errors.fullName}
                </span>
              )}
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="field-workEmail" className={styles.label}>
                Work email <span className={styles.required} aria-hidden="true">*</span>
              </label>
              <input
                id="field-workEmail"
                name="workEmail"
                type="email"
                autoComplete="email"
                className={`${styles.input} ${errors.workEmail ? styles.inputError : ""}`}
                value={formData.workEmail}
                onChange={handleChange}
                aria-required="true"
                required
                aria-describedby={errors.workEmail ? "err-workEmail" : undefined}
              />
              {errors.workEmail && (
                <span id="err-workEmail" className={styles.fieldError} role="alert">
                  {errors.workEmail}
                </span>
              )}
            </div>
          </div>

          {/* Row 2: Website + Role */}
          <div className={styles.formRow}>
            <div className={styles.fieldGroup}>
              <label htmlFor="field-companyWebsite" className={styles.label}>
                Company or professional website <span className={styles.required} aria-hidden="true">*</span>
              </label>
              <input
                id="field-companyWebsite"
                name="companyWebsite"
                type="url"
                autoComplete="url"
                placeholder="https://"
                className={`${styles.input} ${errors.companyWebsite ? styles.inputError : ""}`}
                value={formData.companyWebsite}
                onChange={handleChange}
                aria-required="true"
                required
                aria-describedby={errors.companyWebsite ? "err-companyWebsite" : undefined}
              />
              {errors.companyWebsite && (
                <span id="err-companyWebsite" className={styles.fieldError} role="alert">
                  {errors.companyWebsite}
                </span>
              )}
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="field-role" className={styles.label}>
                Role <span className={styles.required} aria-hidden="true">*</span>
              </label>
              <input
                id="field-role"
                name="role"
                type="text"
                placeholder="e.g. Fractional COO"
                className={`${styles.input} ${errors.role ? styles.inputError : ""}`}
                value={formData.role}
                onChange={handleChange}
                aria-required="true"
                required
                aria-describedby={errors.role ? "err-role" : undefined}
              />
              {errors.role && (
                <span id="err-role" className={styles.fieldError} role="alert">
                  {errors.role}
                </span>
              )}
            </div>
          </div>
          </div>

          <div className={styles.stepFields} hidden={step !== 2} aria-labelledby="form-step-2-heading">
            <h3 id="form-step-2-heading" className={styles.stepHeading} tabIndex={-1}>
              Source and direction
            </h3>
          {/* Source link */}
          <div className={styles.fieldGroup}>
            <label htmlFor="field-sourceLink" className={styles.label}>
              Source link <span className={styles.required} aria-hidden="true">*</span>
            </label>
            <input
              id="field-sourceLink"
              name="sourceLink"
              type="url"
              placeholder="https:// — podcast episode, webinar recording, interview, etc."
              className={`${styles.input} ${errors.sourceLink ? styles.inputError : ""}`}
              value={formData.sourceLink}
              onChange={handleChange}
              aria-required="true"
              required
              aria-describedby={errors.sourceLink ? "err-sourceLink" : undefined}
            />
            {errors.sourceLink && (
              <span id="err-sourceLink" className={styles.fieldError} role="alert">
                {errors.sourceLink}
              </span>
            )}
          </div>

          {/* Audience */}
          <div className={styles.fieldGroup}>
            <label htmlFor="field-targetAudience" className={styles.label}>
              Who should this content reach? <span className={styles.required} aria-hidden="true">*</span>
            </label>
            <textarea
              id="field-targetAudience"
              name="targetAudience"
              className={`${styles.textarea} ${errors.targetAudience ? styles.inputError : ""}`}
              placeholder="Describe the founders, operators, or decision-makers you want to be visible to."
              value={formData.targetAudience}
              onChange={handleChange}
              aria-required="true"
              required
              aria-describedby={errors.targetAudience ? "err-targetAudience" : undefined}
            />
            {errors.targetAudience && (
              <span id="err-targetAudience" className={styles.fieldError} role="alert">
                {errors.targetAudience}
              </span>
            )}
          </div>

          {/* Content goal */}
          <div className={styles.fieldGroup}>
            <label htmlFor="field-contentGoal" className={styles.label}>
              What should the content help clarify? <span className={styles.required} aria-hidden="true">*</span>
            </label>
            <textarea
              id="field-contentGoal"
              name="contentGoal"
              className={`${styles.textarea} ${errors.contentGoal ? styles.inputError : ""}`}
              placeholder="The business problem you understand, how you think about it, when someone should consider working with you — anything specific."
              value={formData.contentGoal}
              onChange={handleChange}
              aria-required="true"
              required
              aria-describedby={errors.contentGoal ? "err-contentGoal" : undefined}
            />
            {errors.contentGoal && (
              <span id="err-contentGoal" className={styles.fieldError} role="alert">
                {errors.contentGoal}
              </span>
            )}
          </div>

          <hr className={styles.formDivider} />
          <p className={styles.optionalLabel}>Optional</p>

          {/* LinkedIn URL */}
          <div className={styles.fieldGroup}>
            <label htmlFor="field-linkedinUrl" className={styles.label}>
              LinkedIn profile URL
              <span className={styles.optionalTag}>optional</span>
            </label>
            <input
              id="field-linkedinUrl"
              name="linkedinUrl"
              type="url"
              placeholder="https://linkedin.com/in/"
              className={styles.input}
              value={formData.linkedinUrl}
              onChange={handleChange}
              aria-invalid={Boolean(errors.linkedinUrl)}
              aria-describedby={errors.linkedinUrl ? "err-linkedinUrl" : undefined}
            />
            {errors.linkedinUrl && (
              <span id="err-linkedinUrl" className={styles.fieldError} role="alert">
                {errors.linkedinUrl}
              </span>
            )}
          </div>

          {/* Voice references */}
          <div className={styles.fieldGroup}>
            <label htmlFor="field-voiceReferences" className={styles.label}>
              Voice or writing reference links
              <span className={styles.optionalTag}>optional</span>
            </label>
            <textarea
              id="field-voiceReferences"
              name="voiceReferences"
              className={styles.textarea}
              placeholder="Links to three to five public LinkedIn posts that represent your writing style and voice."
              value={formData.voiceReferences}
              onChange={handleChange}
              style={{ minHeight: "80px" }}
            />
          </div>

          {/* Anything else */}
          <div className={styles.fieldGroup}>
            <label htmlFor="field-anythingElse" className={styles.label}>
              Anything else Mara should know?
              <span className={styles.optionalTag}>optional</span>
            </label>
            <textarea
              id="field-anythingElse"
              name="anythingElse"
              className={styles.textarea}
              placeholder="Any context that would help Mara review this request."
              value={formData.anythingElse}
              onChange={handleChange}
              style={{ minHeight: "80px" }}
            />
          </div>
          </div>

          <div className={styles.stepFields} hidden={step !== 3} aria-labelledby="form-step-3-heading">
            <h3 id="form-step-3-heading" className={styles.stepHeading} tabIndex={-1}>
              Review your request
            </h3>
            <dl className={styles.reviewList}>
              <div className={styles.reviewItem}>
                <dt>Name</dt><dd>{formData.fullName || "Not provided"}</dd>
              </div>
              <div className={styles.reviewItem}>
                <dt>Email</dt><dd>{formData.workEmail || "Not provided"}</dd>
              </div>
              <div className={styles.reviewItem}>
                <dt>Website</dt><dd>{formData.companyWebsite || "Not provided"}</dd>
              </div>
              <div className={styles.reviewItem}>
                <dt>Role</dt><dd>{formData.role || "Not provided"}</dd>
              </div>
              <div className={styles.reviewItem}>
                <dt>Source</dt><dd>{formData.sourceLink || "Not provided"}</dd>
              </div>
              <div className={styles.reviewItem}>
                <dt>Audience</dt><dd>{formData.targetAudience || "Not provided"}</dd>
              </div>
              <div className={styles.reviewItem}>
                <dt>Content goal</dt><dd>{formData.contentGoal || "Not provided"}</dd>
              </div>
              {formData.linkedinUrl && (
                <div className={styles.reviewItem}>
                  <dt>LinkedIn profile</dt><dd>{formData.linkedinUrl}</dd>
                </div>
              )}
              {formData.voiceReferences && (
                <div className={styles.reviewItem}>
                  <dt>Voice references</dt><dd>{formData.voiceReferences}</dd>
                </div>
              )}
              {formData.anythingElse && (
                <div className={styles.reviewItem}>
                  <dt>Additional context</dt><dd>{formData.anythingElse}</dd>
                </div>
              )}
            </dl>

          {/* Acknowledgement */}
          <div
            className={styles.checkboxGroup}
            style={{ borderColor: errors.acknowledged ? "#b94040" : undefined }}
          >
            <input
              id="field-acknowledged"
              name="acknowledged"
              type="checkbox"
              className={styles.checkbox}
              checked={formData.acknowledged}
              onChange={handleChange}
              aria-required="true"
              required
              aria-describedby={errors.acknowledged ? "err-acknowledged" : undefined}
            />
            <label htmlFor="field-acknowledged" className={styles.checkboxLabel}>
              I understand Mara Content Lab will review this request personally and may decline sources that are not a fit.
            </label>
          </div>
          {errors.acknowledged && (
            <span id="err-acknowledged" className={styles.fieldError} role="alert">
              {errors.acknowledged}
            </span>
          )}
          </div>

          <div className={styles.draftStatus}>
            <p className={styles.submitNote} role="status">
              {!draftReady
                ? "Restoring saved progress..."
                : draftSaveFailed
                  ? "This browser could not save your draft. Keep this page open while completing the form."
                  : "Your progress saves automatically in this browser and is only sent when you submit."}
            </p>
            {hasDraft && (
              <button
                type="button"
                className={styles.clearDraftBtn}
                onClick={() => {
                  setFormData(initialData);
                  setErrors({});
                  setStep(1);
                  setSubmitError(null);
                }}
              >
                Clear saved draft
              </button>
            )}
          </div>
          {step === 3 && (
            <p className={styles.submitNote}>
              Submitting sends your request through FormSubmit. First delivery may require one-time email activation.
            </p>
          )}
          {submitError && (
            <p className={styles.fieldError} role="alert">
              Your request could not be sent. {draftSaveFailed
                ? "Your browser could not save the draft, so keep this page open while you try again."
                : "Your request details are saved in this browser."} Try again, or email{" "}
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> directly.
            </p>
          )}
          <div className={styles.submitRow}>
            {step > 1 && (
              <button
                type="button"
                className={styles.backBtn}
                onClick={() => setStep(step - 1)}
              >
                Back
              </button>
            )}
            <button
              type="submit"
              id="submit-request"
              className={styles.submitBtn}
              disabled={submitting}
            >
              {submitting ? "Sending…" : step === 3 ? "Submit request" : step === 2 ? "Review request" : "Continue"}
            </button>
            <p className={styles.reviewNote}>
              {step === 3
                ? "Mara reviews every request personally. Not every source will be a fit."
                : "You can go back and change your answers at any time."}
            </p>
          </div>
        </form>
        )}
      </div>
    </section>
  );
}
