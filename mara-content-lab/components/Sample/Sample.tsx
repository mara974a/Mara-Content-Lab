import styles from "./Sample.module.css";

const sampleDraft = [
  "Companies often respond to cross-functional work by asking people to be better teammates.",
  "That advice skips a harder question: what lets a group work together when it is not a stable team?",
  "In Amy C. Edmondson’s TED talk on teaming, she uses the Chilean mine rescue to show how people with different expertise and organizational ties coordinated toward one outcome. This is not a claim that a normal project resembles an emergency. The useful parallel is structural: temporary work still needs deliberate coordination.",
  "For an operator, that changes the question. Instead of asking only whether people are committed, ask what lets them contribute across boundaries. Who owns the next decision? What information needs to travel? Where can someone flag a risk before it becomes expensive?",
  "Those are operating conditions, not personality traits. A clear brief, decision rights, and a short check-in rhythm cannot guarantee trust. They can help people who do not work together every day see the same problem and act on it.",
  "When a team is temporary, design the handoffs as carefully as the outcome. The handoff is part of the work, not an administrative afterthought.",
];

export default function Sample() {
  return (
    <section id="sample" className={styles.sample} aria-labelledby="sample-heading">
      <div className="container">
        <div className={styles.sampleInner}>
          <p className="section-index">05 / INDEPENDENT SAMPLE</p>
          <h2 id="sample-heading" className={styles.sampleHeading}>
            A useful idea, carried from source to draft.
          </h2>

          <div className={styles.sampleSource}>
            <div>
              <p className={styles.sampleLabel}>Source</p>
              <h3 className={styles.sourceTitle}>
                How to turn a group of strangers into a team
              </h3>
              <p className={styles.sourceMeta}>
                Amy C. Edmondson · TED Salon: Brightline Initiative · October 2017
              </p>
            </div>
            <a
              className={styles.sourceLink}
              href="https://www.ted.com/talks/amy_edmondson_how_to_turn_a_group_of_strangers_into_a_team"
              target="_blank"
              rel="noreferrer"
            >
              View public source <span aria-hidden="true">↗</span>
            </a>
          </div>

          <div className={styles.sampleAnalysis}>
            <section className={styles.analysisBlock} aria-labelledby="sample-evidence">
              <h3 id="sample-evidence" className={styles.sampleLabel}>
                Evidence selected
              </h3>
              <p>
                Edmondson presents “teaming” as collaboration across expertise and
                organizational boundaries without relying on a stable team. Her
                central case is the 2010 Chilean mine rescue, where 33 trapped
                miners were eventually rescued amid uncertainty about their
                location, survival, and who was in charge.
              </p>
            </section>
            <section className={styles.analysisBlock} aria-labelledby="sample-angle">
              <h3 id="sample-angle" className={styles.sampleLabel}>
                Why this angle
              </h3>
              <p>
                The point is not to compare a normal project with an emergency.
                It is to notice that temporary work still needs deliberate
                coordination. For operators, that makes clear handoffs, decision
                ownership, and useful check-ins a practical place to start.
              </p>
            </section>
          </div>

          <section className={styles.sampleWhy} aria-labelledby="sample-ai-difference">
            <h3 id="sample-ai-difference" className={styles.sampleLabel}>
              Why this differs from a generic summary
            </h3>
            <p>
              A recap could retell the rescue. This draft selects one source-supported
              idea, makes the limit of the analogy explicit, and connects it to
              decisions an operator can examine in ordinary project work.
            </p>
          </section>

          <article className={styles.sampleDraft} aria-labelledby="sample-draft-heading">
            <h3 id="sample-draft-heading" className={styles.sampleLabel}>
              The draft
            </h3>
            <div className={styles.draftBody}>
              {sampleDraft.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </article>

          <p className={styles.sampleNote}>
            Independent editorial example. Uncommissioned and unaffiliated.
          </p>
        </div>
      </div>
    </section>
  );
}
