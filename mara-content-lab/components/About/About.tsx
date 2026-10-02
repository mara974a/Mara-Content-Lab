import styles from "./About.module.css";

export default function About() {
  return (
    <section id="about" className={styles.about} aria-labelledby="about-heading">
      <div className={`container ${styles.aboutInner}`}>
        <div className={styles.aboutIdentity}>
          <p className="section-index">07 / ABOUT</p>
          <h2 id="about-heading" className={styles.aboutLabel}>
            Parth Tiwari
          </h2>
          <div
            className={styles.headshotSlot}
            role="img"
            aria-label="Headshot photo slot for Parth Tiwari"
          >
            <span aria-hidden="true">PT</span>
          </div>
        </div>

        <div className={styles.aboutBody}>
          <p className={styles.aboutPara}>
            I&apos;m Parth Tiwari, an independent editor based in India and the person behind Mara Content Lab.
          </p>
          <p className={styles.aboutPara}>
            Mara exists to help independent B2B experts turn strong long-form conversations into clear, source-grounded writing their prospective clients can understand.
          </p>
          <p className={styles.aboutPara}>
            I built the sprint around one useful point, not an automatic summary of everything said.
          </p>
          <p className={styles.aboutPara}>
            AI can help with early research and drafting. I remain responsible for checking the source, choosing the angle, and editing the final work.
          </p>
        </div>
      </div>
    </section>
  );
}
