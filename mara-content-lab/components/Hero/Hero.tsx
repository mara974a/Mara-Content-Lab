import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={`${styles.hero} section--lg`} aria-labelledby="hero-heading">
      <div className={`container ${styles.heroGrid}`}>
        {/* Left: Copy */}
        <div>
          <p className={`eyebrow ${styles.heroEyebrow}`}>
            Source-grounded LinkedIn content for independent B2B experts
          </p>
          <h1 id="hero-heading" className={styles.heroHeadline}>
            Turn one strong conversation into a clearer case for hiring you.
          </h1>
          <p className={styles.heroBody}>
            I turn an approved podcast, webinar, or interview into a focused LinkedIn authority sprint—carefully grounded in what you actually said.
          </p>
          <div className={styles.heroActions}>
            <a href="#request" className={styles.heroCta}>
              Request a project
            </a>
            <a href="#process" className={styles.heroSecondary}>
              See how it works
            </a>
          </div>
        </div>

        <figure className={styles.editorialVisual} aria-label="Illustrative workflow showing abstract source notes edited into a refined LinkedIn paragraph">
          <div className={styles.docSheet}>
            <figcaption className={styles.docLabel}>Illustrative workflow</figcaption>
            <div className={styles.sourceSheet} aria-hidden="true">
              <span className={styles.sourceLine} />
              <span className={`${styles.sourceLine} ${styles.sourceLineShort}`} />
              <span className={`${styles.sourceLine} ${styles.sourceLineHighlight}`} />
              <span className={`${styles.sourceLine} ${styles.sourceLineMedium}`} />
              <span className={styles.sourceLine} />
              <span className={`${styles.sourceLine} ${styles.sourceLineShort}`} />
            </div>
            <p className={styles.marginNote}>Supported idea</p>
            <div className={styles.transition} aria-hidden="true">
              <span />
            </div>
            <div className={styles.docResult}>
              <p className={styles.docResultLabel}>Refined paragraph</p>
              <p className={styles.resultText}>
                One clear, source-grounded point, shaped for the intended reader.
              </p>
            </div>
          </div>
        </figure>
      </div>
    </section>
  );
}
