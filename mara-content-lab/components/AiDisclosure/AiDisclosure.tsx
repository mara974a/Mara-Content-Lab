import styles from "./AiDisclosure.module.css";

const aiAssists = [
  "Initial transcript review",
  "Research and source mapping",
  "Early drafting and structural exploration",
];

const humanLed = [
  "Editorial judgment and angle selection",
  "Source-accuracy checks",
  "Final editing and voice decisions",
  "Accountability for the finished work",
];

export default function AiDisclosure() {
  return (
    <section
      id="ai-disclosure"
      className={styles.aiSection}
      aria-labelledby="ai-heading"
    >
      <div className={`container ${styles.aiInner}`}>
        <div>
          <p className="section-index">
            04 / HUMAN ACCOUNTABILITY
          </p>
          <h2 id="ai-heading" className={styles.aiLabel}>
            AI-assisted. Human-accountable.
          </h2>
        </div>

        <div>
          <p className={styles.aiBody}>
            AI assists with research, transcript analysis, and early drafting. Editorial judgment, source-accuracy checks, angle selection, and final editing remain human-led.
          </p>

          <div className={styles.aiBreakdown}>
            <div className={styles.aiColumn}>
              <p className={styles.aiColumnLabel}>AI assists with</p>
              <ul className={styles.aiColumnItems} aria-label="What AI assists with">
                {aiAssists.map((item, i) => (
                  <li key={i} className={styles.aiColumnItem}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.aiColumn}>
              <p className={styles.aiColumnLabel}>Human-led</p>
              <ul className={styles.aiColumnItems} aria-label="What remains human-led">
                {humanLed.map((item, i) => (
                  <li key={i} className={styles.aiColumnItem}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
