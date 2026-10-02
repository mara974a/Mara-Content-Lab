import styles from "./Process.module.css";

const steps = [
  {
    number: "01",
    title: "Source",
    body: "You share one approved long-form source — a podcast, webinar, interview, or conversation — and optional public writing examples to help with voice.",
  },
  {
    number: "02",
    title: "Evidence",
    body: "Mara reviews the source directly, separates supported ideas from generic filler, and maps the strongest usable insights from the actual material.",
  },
  {
    number: "03",
    title: "Angle",
    body: "Mara selects one practical editorial angle connected to a specific reader and a relevant business problem. Only angles grounded in the source are considered.",
  },
  {
    number: "04",
    title: "Draft",
    body: "Mara develops the LinkedIn post, document-post outline, future angles, and hook options — all tied to the approved source material.",
  },
  {
    number: "05",
    title: "Review",
    body: "You send one consolidated revision round. All feedback is collected together so the revision stays focused and efficient. Final materials are delivered within the agreed scope.",
  },
];

export default function Process() {
  return (
    <section id="process" className={styles.process} aria-labelledby="process-heading">
      <div className="container--wide">
        <p className="section-index">
          03 / THE PROCESS
        </p>
        <h2 id="process-heading" className={styles.processHeading}>
          From source to publishable clarity.
        </h2>
        <ol className={styles.steps} aria-label="Five-step editorial process">
          {steps.map((step) => (
            <li key={step.number} className={styles.step}>
              <span className={styles.stepNumber} aria-hidden="true">
                {step.number}
              </span>
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepBody}>{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
