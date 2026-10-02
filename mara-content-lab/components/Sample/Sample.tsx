import styles from "./Sample.module.css";

const sampleComponents = [
  "Source: publicly available long-form conversation",
  "Evidence selection: specific points identified from the source",
  "Angle: the chosen editorial framing and reader connection",
  "Finished draft: the completed LinkedIn post",
];

export default function Sample() {
  return (
    <section id="sample" className={styles.sample} aria-labelledby="sample-heading">
      <div className="container">
        <div className={styles.sampleInner}>
          <p className="section-index">
            05 / EDITORIAL STANDARD
          </p>
          <h2 id="sample-heading" className={styles.sampleHeading}>
            See the editorial standard
          </h2>
          <p className={styles.sampleBody}>
            An independent sample is being prepared from a publicly available long-form source. It will show the source, evidence selection, chosen angle, and finished draft.
          </p>

          <div className={styles.samplePlaceholder} aria-label="Sample in preparation">
            <div className={styles.samplePlaceholderLeft}>
              <p className={styles.sampleTag}>In preparation</p>
              <div className={styles.sampleSteps}>
                {sampleComponents.map((step, i) => (
                  <div key={i} className={styles.sampleStep}>
                    <div className={styles.sampleStepDot} aria-hidden="true" />
                    <p className={styles.sampleStepText}>{step}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.samplePlaceholderRight}>
              <p className={styles.sampleNotice}>
                The sample will be clearly labelled as uncommissioned and not affiliated with the original guest or organisation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
