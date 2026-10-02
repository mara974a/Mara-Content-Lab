import styles from "./Fit.module.css";

const goodFit = [
  "Independent fractional B2B operator or expert consultant",
  "Has a useful public source ready (podcast, talk, interview, essay, or similar)",
  "Wants careful, source-grounded LinkedIn content",
  "Can review a draft and send consolidated feedback",
  "Values clarity and accuracy over content volume",
];

const notFit = [
  "Needs clips, video editing, graphic design, or daily social-media management",
  "Wants guaranteed reach, leads, sales, or viral results",
  "Wants bulk AI content generated from every transcript",
  "Needs a full marketing strategy or agency relationship",
  "Wants unlimited revisions",
  "Wants free completed custom work before committing",
];

export default function Fit() {
  return (
    <section id="fit" className={styles.fit} aria-labelledby="fit-heading">
      <div className="container--wide">
        <p className="section-index">
          06 / FIT
        </p>
        <h2 id="fit-heading" className={styles.fitHeading}>
          A careful match matters more than a quick yes.
        </h2>

        <div className={styles.fitGrid}>
          <div className={styles.fitCol}>
            <p className={`${styles.fitColLabel} ${styles["fitColLabel--good"]}`}>
              Good fit
            </p>
            <ul className={styles.fitList} aria-label="Good fit criteria">
              {goodFit.map((item, i) => (
                <li key={i} className={styles.fitItem}>
                  <span className={`${styles.fitMarker} ${styles["fitMarker--good"]}`} aria-hidden="true">✓</span>
                  <p className={styles.fitText}>{item}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.fitCol}>
            <p className={`${styles.fitColLabel} ${styles["fitColLabel--not"]}`}>
              Not a fit
            </p>
            <ul className={styles.fitList} aria-label="Not a fit criteria">
              {notFit.map((item, i) => (
                <li key={i} className={styles.fitItem}>
                  <span className={`${styles.fitMarker} ${styles["fitMarker--not"]}`} aria-hidden="true">×</span>
                  <p className={styles.fitText}>{item}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
