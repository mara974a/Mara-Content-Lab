"use client";

import styles from "./AiDisclosure.module.css";

const aiAssists = [
  "High-speed transcript digestion & timestamp indexing",
  "Thematic pattern extraction & topic clustering",
  "Early structural exploration & hook permutation ideation",
  "Keyword & audience resonance scanning",
];

const humanLed = [
  "Discerning taste & contrarian editorial angle selection",
  "Rigorous source-accuracy checks against what you actually said",
  "Nuanced voice tuning, cadence control, and prose polishing",
  "100% Personal accountability for the finished intellectual property",
];

export default function AiDisclosure() {
  return (
    <section id="ai-disclosure" className={styles.aiSection} aria-labelledby="ai-heading">
      <div className="container">
        <div className={styles.aiHeader}>
          <div className="section-tag" style={{ marginInline: "auto" }}>
            <span className="section-tag-pulse" />
            <span>04 / Transparent Editorial Protocol</span>
          </div>
          <h2 id="ai-heading" className={styles.aiTitle}>
            AI-assisted speed. Human-accountable precision.
          </h2>
          <p className={styles.aiSubtitle}>
            We reject both extremes: we do not dump raw transcripts into automated generic
            bots, nor do we ignore modern tools. We deploy AI for computational speed and
            anchor every single published sentence in human editorial judgment.
          </p>
        </div>

        {/* 3D Duality Matrix */}
        <div className={styles.dualityMatrix}>
          {/* AI Chamber */}
          <div className={`${styles.chamber} ${styles.chamberAi}`}>
            <span className={`${styles.chamberBadge} ${styles.badgeAi}`}>
              01 / Computational Engine
            </span>
            <h3 className={styles.chamberHeading}>Where AI Assists</h3>
            <p className={styles.chamberDesc}>
              Accelerating research, mapping long-form conversations, and surfacing
              latent thematic patterns across hours of source audio.
            </p>
            <div className={styles.chamberList}>
              {aiAssists.map((item, idx) => (
                <div key={idx} className={styles.chamberListItem}>
                  <span className={styles.checkAi}>⚡</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Center Catalyst Icon */}
          <div className={styles.catalyst} aria-hidden="true">
            <div className={styles.catalystIcon}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="12 2 2 7 12 12 22 7 12 2" />
                <polyline points="2 17 12 22 22 17" />
                <polyline points="2 12 12 17 22 12" />
              </svg>
            </div>
          </div>

          {/* Human Chamber */}
          <div className={`${styles.chamber} ${styles.chamberHuman}`}>
            <span className={`${styles.chamberBadge} ${styles.badgeHuman}`}>
              02 / Editorial Craft
            </span>
            <h3 className={styles.chamberHeading}>Where Humans Lead</h3>
            <p className={styles.chamberDesc}>
              Filtering noise, protecting your reputational integrity, and ensuring
              every word reflects genuine executive discernment.
            </p>
            <div className={styles.chamberList}>
              {humanLed.map((item, idx) => (
                <div key={idx} className={styles.chamberListItem}>
                  <span className={styles.checkHuman}>✓</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.guaranteeBox}>
          <p>
            <strong>The Mara Standard:</strong> You will never receive generic AI filler,
            hallucinated citations, or unverified claims. Parth Tiwari Personally verifies
            every deliverable against your source recording before it reaches your inbox.
          </p>
        </div>
      </div>
    </section>
  );
}
