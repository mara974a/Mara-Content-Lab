"use client";

import { useState } from "react";
import styles from "./Problem.module.css";

const points = [
  {
    num: "01",
    heading: "A transcript is not automatically useful content.",
    body: "Every minute transcribed is not every minute worth publishing. A raw recording contains dead ends, conversational filler, and tangents that don't land for busy decision-makers. Mara isolates the exact underlying breakthrough.",
  },
  {
    num: "02",
    heading: "Generic AI summaries flatten real thinking.",
    body: "Running a transcript through standard LLMs produces homogeneous, averaged summaries stripped of your contrarian edge, concrete case studies, and distinct operational voice. It ends up reading like everyone else.",
  },
  {
    num: "03",
    heading: "Prospective clients must recognise the exact problem you solve.",
    body: "The sprint isn't about chasing viral vanity metrics. It centers on articulating a high-conviction thesis that causes prospective buyers to think: 'This person understands our exact bottleneck better than anyone.'",
  },
  {
    num: "04",
    heading: "Editorial judgment cannot be automated away.",
    body: "Isolating which point is worth making, selecting how to connect it to an operator's active budget priority, and calibrating your voice require human discernment and accountability.",
  },
];

export default function Problem() {
  const [activeTab, setActiveTab] = useState<"noise" | "signal">("signal");

  return (
    <section id="problem" className={styles.problem} aria-labelledby="problem-heading">
      <div className={`container ${styles.problemInner}`}>
        <div className={styles.problemLeft}>
          <div className="section-tag">
            <span className="section-tag-pulse" />
            <span>01 / The Editorial Reality</span>
          </div>

          <h2 id="problem-heading" className={styles.problemHeading}>
            Your best thinking should not stay trapped in a transcript.
          </h2>

          <p className={styles.problemIntro}>
            Mara does not dump an unedited transcript into an automated summarizer.
            We pinpoint the single most defensible, valuable thesis from your approved
            source and forge it into authoritative LinkedIn assets.
          </p>

          {/* Interactive Signal vs Noise Comparison Visualizer */}
          <div className={styles.signalComparison}>
            <div className={styles.comparisonTabs}>
              <button
                type="button"
                className={`${styles.tabBtn} ${
                  activeTab === "noise" ? styles.tabBtnActiveNoise : ""
                }`}
                onClick={() => setActiveTab("noise")}
              >
                <span>⚠ Raw Noise / Generic AI</span>
              </button>
              <button
                type="button"
                className={`${styles.tabBtn} ${
                  activeTab === "signal" ? styles.tabBtnActiveSignal : ""
                }`}
                onClick={() => setActiveTab("signal")}
              >
                <span>✦ Mara Prismatic Signal</span>
              </button>
            </div>

            {activeTab === "noise" ? (
              <div className={`${styles.comparisonContent} ${styles.noiseBox}`}>
                <div className={styles.boxHeader}>
                  <span>Generic AI Recap (Averaged Output)</span>
                </div>
                <p>
                  &ldquo;In this episode, we talk about operational alignment and teamwork.
                  Here are 7 tips: 1. Communicate often, 2. Build trust, 3. Align cross-functional goals.
                  Teaming is important when building startups...&rdquo;
                </p>
                <p style={{ marginTop: "0.5rem", fontSize: "0.78rem", opacity: 0.8 }}>
                  Result: Flat, predictable, generic advice that fails to establish authority or attract buyers.
                </p>
              </div>
            ) : (
              <div className={`${styles.comparisonContent} ${styles.signalBox}`}>
                <div className={styles.boxHeader}>
                  <span style={{ color: "var(--emerald-bright)" }}>
                    Source-Grounded Thesis (High-Leverage)
                  </span>
                </div>
                <p>
                  &ldquo;When a team is temporary, stop preaching trust and start designing the handoffs.
                  Decision rights, information travel paths, and pre-mortem checkpoints are operating
                  conditions, not personality traits.&rdquo;
                </p>
                <p style={{ marginTop: "0.5rem", fontSize: "0.78rem", color: "var(--emerald)" }}>
                  Result: Razor-sharp framing that demonstrates operational mastery to prospective clients.
                </p>
              </div>
            )}
          </div>
        </div>

        <div className={styles.problemPoints}>
          {points.map((point) => (
            <article key={point.num} className={styles.problemCard}>
              <div className={styles.cardTop}>
                <span className={styles.cardNumber}>{point.num}</span>
                <h3 className={styles.cardHeading}>{point.heading}</h3>
              </div>
              <p className={styles.cardBody}>{point.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
