"use client";

import { useState } from "react";
import styles from "./Process.module.css";

const steps = [
  {
    number: "01",
    name: "Source",
    tagline: "Approved Recording Intake",
    title: "1. Intake & Source Verification",
    body: "You share one approved public or private long-form source—a podcast episode, webinar recording, keynote speech, or expert interview—along with optional writing samples to calibrate your public voice.",
    checklist: [
      "Confirm source audio/video clarity",
      "Check intellectual property permission",
      "Scan voice samples for vocabulary & tone",
    ],
  },
  {
    number: "02",
    name: "Evidence",
    tagline: "Insight & Signal Mapping",
    title: "2. Evidence Extraction & Noise Filtering",
    body: "Mara reviews the source directly, isolating substantiated arguments from casual tangents and conversational filler. We construct an evidence map connecting what you actually said to defensible points of view.",
    checklist: [
      "Separate core thesis from small talk",
      "Verify factual claims against the transcript",
      "Pinpoint exact memorable quotes and timestamps",
    ],
  },
  {
    number: "03",
    name: "Angle",
    tagline: "Audience Dilemma Calibration",
    title: "3. Strategic Editorial Angle Selection",
    body: "Rather than regurgitating the whole interview, Mara selects one high-leverage editorial angle engineered for a specific buyer persona and an expensive business dilemma they actively face.",
    checklist: [
      "Calibrate for target buyer persona",
      "Target an active budget or operational priority",
      "Ensure contrarian or distinctive framing",
    ],
  },
  {
    number: "04",
    name: "Draft",
    tagline: "Asset Suite Crafting",
    title: "4. Editorial Drafting & Narrative Framework",
    body: "Mara authors the core LinkedIn authority post (180–250 words), constructs the 4–6 slide document outline, writes the 3 high-conversion hooks, and outlines 3 future angles for your ongoing pipeline.",
    checklist: [
      "180–250 word authority post",
      "Slide-by-slide document framework",
      "3 Contrarian / curiosity hooks",
      "3 Future content roadmap angles",
    ],
  },
  {
    number: "05",
    name: "Review",
    tagline: "Consolidated Calibration",
    title: "5. Consolidated Review & Polish",
    body: "You review the complete draft suite and send one consolidated round of revisions. We fine-tune nuance, company-specific terminology, and pacing, delivering final publish-ready text directly into your inbox.",
    checklist: [
      "Single consolidated feedback cycle",
      "Fast turnaround on edits",
      "Delivery in clean, markdown / copyable format",
    ],
  },
];

export default function Process() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const currentStep = steps[activeStepIndex];

  return (
    <section id="process" className={styles.process} aria-labelledby="process-heading">
      <div className="container">
        <div className={styles.processHeader}>
          <div className="section-tag">
            <span className="section-tag-pulse" />
            <span>03 / Five-Stage Pipeline</span>
          </div>
          <h2 id="process-heading" className={styles.processHeading}>
            From raw conversation to publishable clarity.
          </h2>
          <p className={styles.processSubtitle}>
            A rigorous 5-step editorial methodology that extracts high-conviction
            thought leadership while respecting your time and intellectual accuracy.
          </p>
        </div>

        {/* Interactive Pipeline Steps */}
        <div
          className={styles.pipelineTrack}
          role="tablist"
          aria-label="Process pipeline stages"
        >
          {steps.map((step, idx) => {
            const isActive = activeStepIndex === idx;
            return (
              <button
                key={step.number}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`${styles.pipelineStepBtn} ${
                  isActive ? styles.pipelineStepActive : ""
                }`}
                onClick={() => setActiveStepIndex(idx)}
              >
                <div
                  className={`${styles.stepNode} ${
                    isActive ? styles.stepNodeActive : ""
                  }`}
                >
                  {step.number}
                </div>
                <div className={styles.stepBtnTitle}>{step.name}</div>
                <div className={styles.stepBtnTagline}>{step.tagline}</div>
              </button>
            );
          })}
        </div>

        {/* Active Stage Deep Dive */}
        <div className={styles.activeInspectionCard}>
          <div className={styles.inspectionMain}>
            <div className={styles.inspectionStepBadge}>
              <span>STAGE {currentStep.number} SPECIFICATION</span>
            </div>
            <h3 className={styles.inspectionTitle}>{currentStep.title}</h3>
            <p className={styles.inspectionBody}>{currentStep.body}</p>
          </div>

          <aside className={styles.inspectionSidebar}>
            <h4 className={styles.sidebarHeading}>Quality Criteria</h4>
            <div className={styles.sidebarList}>
              {currentStep.checklist.map((item, idx) => (
                <div key={idx} className={styles.sidebarItem}>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
