import styles from "./Problem.module.css";

const points = [
  {
    heading: "A transcript is not automatically useful content.",
    body: "Every minute transcribed is not every minute worth publishing. A raw recording contains dead ends, filler, context that won't land for readers, and a few genuine insights worth isolating.",
  },
  {
    heading: "Generic AI summaries flatten real thinking.",
    body: "Running a transcript through a summariser tends to produce averaged output that could belong to anyone. It loses the specific point, the concrete example, the reason the idea is actually useful.",
  },
  {
    heading: "The right prospective client needs to recognise the problem you understand.",
    body: "The service focuses on making a useful point clear for the founders or operators it is intended for. Who sees it and what they do next remain outside Mara's control.",
  },
  {
    heading: "Editorial judgment cannot be automated away.",
    body: "Choosing which point is worth making, how to connect it to a reader's actual business problem, and how to write it clearly in someone's public voice — these require decisions that are human by nature.",
  },
];

export default function Problem() {
  return (
    <section
      id="problem"
      className={`${styles.problem}`}
      aria-labelledby="problem-heading"
    >
      <div className={`container ${styles.problemInner}`}>
        <div className={styles.problemLeft}>
          <p className="section-index">
            01 / THE PROBLEM
          </p>
          <h2 id="problem-heading" className={styles.problemHeading}>
            Your best thinking should not stay trapped in a transcript.
          </h2>
          <p className={styles.problemIntro}>
            Mara does not summarise every minute or generate content from every recording. It identifies one useful, supported point from an approved source and makes it clear for the right prospective client.
          </p>
        </div>

        <div className={styles.problemPoints}>
          {points.map((point, i) => (
            <div key={i} className={styles.problemPoint}>
              <h3>{point.heading}</h3>
              <p>{point.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
