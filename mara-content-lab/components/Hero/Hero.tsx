import styles from "./Hero.module.css";
import PrismAngleReadout from "./PrismAngleReadout";

export default function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-heading">
      <div className={`container ${styles.heroGrid}`}>
        <div className={styles.heroCopy}>
          <p className={`eyebrow ${styles.heroEyebrow}`}>
            Source-grounded editorial work for founders and operators
          </p>
          <h1 id="hero-heading" className={styles.heroHeadline}>
            Turn one raw idea into multiple angles.
          </h1>
          <p className={styles.heroBody}>
            The Source-to-Authority Sprint turns a public conversation into clear, evidence-backed LinkedIn content, with every editorial choice reviewed by a human.
          </p>
          <div className={styles.heroActions}>
            <a href="#request" className={styles.heroCta}>
              Request a project
            </a>
            <a href="#process" className={styles.heroSecondary}>
              See how it works
            </a>
          </div>
          <ul className={styles.angleLegend} aria-label="Four possible content angles">
            <li>Authority</li>
            <li>Buyer education</li>
            <li>Recruitment</li>
            <li>Speaking</li>
          </ul>
          <PrismAngleReadout />
        </div>
      </div>
    </section>
  );
}
