"use client";

import { useState } from "react";
import styles from "./Fit.module.css";

const goodFit = [
  "Independent fractional B2B operator, strategic consultant, or founder",
  "Has 1 approved long-form source ready (podcast, webinar, talk, interview, or essay)",
  "Wants careful, source-grounded LinkedIn thought leadership that withstands peer scrutiny",
  "Can review a complete draft and return 1 consolidated, focused feedback round",
  "Values high-conviction positioning over meaningless vanity posting volume",
];

const notFit = [
  "Needs video editing, TikTok/Reel clips, graphic design, or daily social-media management",
  "Expects overnight viral algorithms, guaranteed follower quotas, or automated cold DMs",
  "Wants cheap bulk AI content churned out indiscriminately from every recording",
  "Requires a full 360 agency retainer or multi-channel marketing department",
  "Requests indefinite, open-ended revision cycles or free custom work before committing",
];

export default function Fit() {
  const [checks, setChecks] = useState({
    source: false,
    quality: false,
    role: false,
  });

  const toggleCheck = (key: keyof typeof checks) => {
    setChecks((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const isFullFit = checks.source && checks.quality && checks.role;

  return (
    <section id="fit" className={styles.fit} aria-labelledby="fit-heading">
      <div className="container">
        <div className={styles.fitHeader}>
          <div className="section-tag" style={{ marginInline: "auto" }}>
            <span className="section-tag-pulse" />
            <span>06 / Strategic Fit Diagnostic</span>
          </div>
          <h2 id="fit-heading" className={styles.fitHeading}>
            A careful match matters more than a quick yes.
          </h2>
          <p className={styles.fitSubtitle}>
            Mara is deliberately not a high-volume content factory. We partner exclusively
            with experts whose spoken thinking contains real substance.
          </p>
        </div>

        {/* 2-Column Luxury Fit Cards */}
        <div className={styles.fitGrid}>
          {/* Good Fit */}
          <div className={`${styles.fitCard} ${styles.fitCardGood}`}>
            <div className={styles.fitCardHeader}>
              <h3 className={`${styles.fitCardTitle} ${styles.fitTitleGood}`}>
                <span>✦ Ideal Alignment</span>
              </h3>
              <span className={`${styles.fitTag} ${styles.tagGood}`}>High Impact</span>
            </div>
            <div className={styles.fitList}>
              {goodFit.map((item, idx) => (
                <div key={idx} className={styles.fitItem}>
                  <div className={styles.fitIconGood}>✓</div>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Not Fit */}
          <div className={`${styles.fitCard} ${styles.fitCardNot}`}>
            <div className={styles.fitCardHeader}>
              <h3 className={`${styles.fitCardTitle} ${styles.fitTitleNot}`}>
                <span>✕ Out of Scope</span>
              </h3>
              <span className={`${styles.fitTag} ${styles.tagNot}`}>Deliberate Limit</span>
            </div>
            <div className={styles.fitList}>
              {notFit.map((item, idx) => (
                <div key={idx} className={styles.fitItem}>
                  <div className={styles.fitIconNot}>✕</div>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Interactive 30-Second Fit Check Widget */}
        <div className={styles.diagnosticWidget}>
          <h3 className={styles.diagnosticHeading}>Interactive Fit Check</h3>
          <p className={styles.diagnosticPrompt}>
            Select the conditions that apply to your current situation:
          </p>

          <div className={styles.diagnosticChecks}>
            <div
              className={`${styles.checkOption} ${
                checks.source ? styles.checkOptionChecked : ""
              }`}
              onClick={() => toggleCheck("source")}
            >
              <div
                className={`${styles.checkboxIndicator} ${
                  checks.source ? styles.checkboxIndicatorActive : ""
                }`}
              >
                {checks.source && "✓"}
              </div>
              <span className={styles.checkOptionText}>
                I have 1 approved public or private recording (podcast, interview, webinar, keynote, essay) ready to review.
              </span>
            </div>

            <div
              className={`${styles.checkOption} ${
                checks.quality ? styles.checkOptionChecked : ""
              }`}
              onClick={() => toggleCheck("quality")}
            >
              <div
                className={`${styles.checkboxIndicator} ${
                  checks.quality ? styles.checkboxIndicatorActive : ""
                }`}
              >
                {checks.quality && "✓"}
              </div>
              <span className={styles.checkOptionText}>
                I care about intellectual precision, nuance, and defending my reputation over generic posting volume.
              </span>
            </div>

            <div
              className={`${styles.checkOption} ${
                checks.role ? styles.checkOptionChecked : ""
              }`}
              onClick={() => toggleCheck("role")}
            >
              <div
                className={`${styles.checkboxIndicator} ${
                  checks.role ? styles.checkboxIndicatorActive : ""
                }`}
              >
                {checks.role && "✓"}
              </div>
              <span className={styles.checkOptionText}>
                I am an independent fractional operator, executive consultant, or technical B2B founder.
              </span>
            </div>
          </div>

          {isFullFit ? (
            <div className={styles.diagnosticResult}>
              <span className={styles.resultText}>
                <span style={{ fontSize: "1.2rem" }}>🎯</span>
                <span>Perfect Match: Your profile aligns 100% with the Source-to-Authority Sprint.</span>
              </span>
              <a href="#request" className="btn-primary" style={{ padding: "0.6rem 1.25rem", fontSize: "0.88rem" }}>
                <span>Build Brief Now</span>
                <span aria-hidden="true">→</span>
              </a>
            </div>
          ) : (
            <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", textAlign: "center" }}>
              Check all three criteria above to verify your sprint compatibility.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
