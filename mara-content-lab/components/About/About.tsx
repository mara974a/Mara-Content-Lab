import styles from "./About.module.css";

export default function About() {
  return (
    <section id="about" className={styles.about} aria-labelledby="about-heading">
      <div className={`container ${styles.aboutInner}`}>
        <div>
          <p className="section-index">
            07 / ABOUT
          </p>
          <h2 id="about-heading" className={styles.aboutLabel}>
            Parth Tiwari
          </h2>
        </div>

        <div className={styles.aboutBody}>
          <p className={styles.aboutPara}>
            Hi, I&apos;m Parth Tiwari, the independent builder behind Mara Content Lab.
          </p>
          <p className={styles.aboutPara}>
            I&apos;m building a source-grounded editorial workflow for experts whose best thinking already exists in long-form conversations but is not yet easy for the right readers to find and understand.
          </p>
          <p className={styles.aboutPara}>
            I care about accurate claims, useful angles, clear writing, and content that does not turn real expertise into generic AI summaries.
          </p>

          <div className={styles.aboutSig}>
            <span className={styles.aboutSigName}>Parth Tiwari</span>
            <span className={styles.aboutSigRole}>Independent builder, Mara Content Lab</span>
          </div>
        </div>
      </div>
    </section>
  );
}
