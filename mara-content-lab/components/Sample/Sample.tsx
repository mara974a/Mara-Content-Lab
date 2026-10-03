"use client";

import { useState } from "react";
import styles from "./Sample.module.css";

const sampleParagraphs = [
  "Companies often respond to cross-functional breakdown by urging people to be 'better teammates.'",
  "That advice skips a much harder question: what enables a group to coordinate effectively when it is not a permanent team?",
  "In Amy C. Edmondson’s TED talk on teaming, she analyzes the 2010 Chilean mine rescue to demonstrate how specialists from competing organizations converged to extract 33 trapped miners. This isn't a suggestion that your product launch resembles a subterranean disaster. The parallel is structural: temporary initiatives require deliberate coordination mechanisms.",
  "For an executive operator, that completely reframes the challenge. Instead of measuring whether people are 'committed,' examine what lets them contribute across departmental borders. Who owns the next decision handoff? What operational data needs to travel? Where can someone flag an escalating risk before it impacts the P&L?",
  "Those are operating conditions, not personality traits. A concise brief, explicit decision rights, and a disciplined check-in rhythm cannot force mutual affection. But they ensure cross-functional leaders see the same problem and act decisively.",
  "When a team is temporary, design the handoffs with the same obsessive care as the outcome. The handoff is part of the work—not an administrative afterthought.",
];

const documentSlides = [
  {
    num: "Slide 01",
    title: "The Teaming Myth",
    body: "Why telling people to 'collaborate better' fails when cross-functional groups lack stable organizational ties.",
  },
  {
    num: "Slide 02",
    title: "The Structural Parallel",
    body: "Lessons from high-stakes coordination: temporary projects need operational conditions, not pep talks.",
  },
  {
    num: "Slide 03",
    title: "Operating Conditions vs Traits",
    body: "Shifting focus from emotional commitment to concrete decision rights and information travel paths.",
  },
  {
    num: "Slide 04",
    title: "The 3 Handoff Rules",
    body: "1. Explicit decision ownership. 2. Low-friction escalation channels. 3. Short, focused rhythm.",
  },
  {
    num: "Slide 05",
    title: "Executive Takeaway",
    body: "Design the handoffs as rigorously as the outcome. The handoff is the work.",
  },
];

const hooks = [
  {
    type: "Contrarian Angle",
    text: "Stop telling cross-functional teams to 'build trust.' Design the handoffs instead.",
  },
  {
    type: "Curiosity / High Stakes",
    text: "How 33 trapped Chilean miners teach us why high-priority corporate projects stall.",
  },
  {
    type: "Problem-First Framing",
    text: "Why do cross-functional initiatives fail even when everyone involved is exceptionally smart and motivated?",
  },
];

export default function Sample() {
  const [activeTab, setActiveTab] = useState<"post" | "analysis" | "slides" | "hooks">("post");
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(sampleParagraphs.join("\n\n"));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="sample" className={styles.sample} aria-labelledby="sample-heading">
      <div className="container">
        <div className={styles.sampleHeader}>
          <div className="section-tag">
            <span className="section-tag-pulse" />
            <span>05 / Interactive Editorial Studio</span>
          </div>
          <h2 id="sample-heading" className={styles.sampleHeading}>
            A useful idea, carried from source to draft.
          </h2>
          <p className={styles.sampleSubtitle}>
            Inspect an uncommissioned, real-world transformation. See how a 12-minute
            public TED talk becomes a high-conviction LinkedIn authority suite.
          </p>
        </div>

        <div className={styles.studioContainer}>
          {/* Source Header */}
          <div className={styles.sourceBar}>
            <div className={styles.sourceInfo}>
              <span className={styles.sourceBadge}>Public Source</span>
              <div>
                <h3 className={styles.sourceTitle}>
                  How to turn a group of strangers into a team
                </h3>
                <p className={styles.sourceMeta}>
                  Amy C. Edmondson · TED Salon: Brightline Initiative
                </p>
              </div>
            </div>
            <a
              className={styles.sourceExternalLink}
              href="https://www.ted.com/talks/amy_edmondson_how_to_turn_a_group_of_strangers_into_a_team"
              target="_blank"
              rel="noreferrer"
            >
              <span>View Source Recording</span>
              <span aria-hidden="true">↗</span>
            </a>
          </div>

          {/* Studio Navigation Tabs */}
          <div className={styles.studioTabs} role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "post"}
              className={`${styles.studioTabBtn} ${
                activeTab === "post" ? styles.studioTabActive : ""
              }`}
              onClick={() => setActiveTab("post")}
            >
              <span>📄 Finished Post</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "analysis"}
              className={`${styles.studioTabBtn} ${
                activeTab === "analysis" ? styles.studioTabActive : ""
              }`}
              onClick={() => setActiveTab("analysis")}
            >
              <span>🔍 Evidence & Angle Analysis</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "slides"}
              className={`${styles.studioTabBtn} ${
                activeTab === "slides" ? styles.studioTabActive : ""
              }`}
              onClick={() => setActiveTab("slides")}
            >
              <span>📑 Document Slides (5)</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "hooks"}
              className={`${styles.studioTabBtn} ${
                activeTab === "hooks" ? styles.studioTabActive : ""
              }`}
              onClick={() => setActiveTab("hooks")}
            >
              <span>🎣 Hook Triad</span>
            </button>
          </div>

          {/* Studio Body */}
          <div className={styles.studioBody}>
            {activeTab === "post" && (
              <div>
                <div className={styles.postHeader}>
                  <div className={styles.postStats}>
                    <span>LENGTH: <strong className={styles.statHighlight}>224 WORDS</strong></span>
                    <span>READ TIME: <strong className={styles.statHighlight}>1.2 MIN</strong></span>
                    <span>TONE: <strong className={styles.statHighlight}>EXECUTIVE OPERATOR</strong></span>
                  </div>
                  <button type="button" className={styles.copyBtn} onClick={handleCopy}>
                    {copied ? (
                      <>
                        <span style={{ color: "var(--emerald-bright)" }}>✓</span>
                        <span>Copied to Clipboard!</span>
                      </>
                    ) : (
                      <>
                        <span>📋</span>
                        <span>Copy Draft</span>
                      </>
                    )}
                  </button>
                </div>

                <article className={styles.draftCard}>
                  {sampleParagraphs.map((para, idx) => (
                    <p key={idx}>{para}</p>
                  ))}
                </article>
              </div>
            )}

            {activeTab === "analysis" && (
              <div className={styles.analysisGrid}>
                <div className={styles.analysisBlock}>
                  <h4 className={styles.analysisLabel}>1. Specific Evidence Selected</h4>
                  <p>
                    Edmondson presents &ldquo;teaming&rdquo; as active collaboration across
                    technical expertise and organizational silos without the luxury of a
                    stable, long-standing team. Her anchor case study is the 2010 Chilean
                    mine rescue, where dozens of disparate entities coordinated under extreme
                    fog of war.
                  </p>
                </div>
                <div className={styles.analysisBlock}>
                  <h4 className={styles.analysisLabel}>2. Why This Editorial Angle</h4>
                  <p>
                    Rather than retelling the rescue as an emotional drama, Mara extracts the
                    operational mechanism: temporary work requires intentional handoff design.
                    For operators and fractional leaders, this translates directly to decision
                    rights, data transparency, and pre-mortems.
                  </p>
                </div>
              </div>
            )}

            {activeTab === "slides" && (
              <div className={styles.slidesGrid}>
                {documentSlides.map((slide) => (
                  <div key={slide.num} className={styles.slideCard}>
                    <span className={styles.slideNumber}>{slide.num}</span>
                    <h4 className={styles.slideTitle}>{slide.title}</h4>
                    <p className={styles.slideBody}>{slide.body}</p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "hooks" && (
              <div className={styles.hooksGrid}>
                {hooks.map((h, idx) => (
                  <div key={idx} className={styles.hookCard}>
                    <span className={styles.hookType}>{h.type}</span>
                    <p className={styles.hookText}>&ldquo;{h.text}&rdquo;</p>
                  </div>
                ))}
              </div>
            )}

            <p className={styles.disclaimerNote}>
              Independent editorial demonstration. Uncommissioned and unaffiliated with TED or Amy C. Edmondson.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
