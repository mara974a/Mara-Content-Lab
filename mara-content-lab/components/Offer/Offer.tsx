"use client";

import { useState } from "react";
import { OFFER_NAME, OFFER_PRICE } from "@/lib/constants";
import styles from "./Offer.module.css";

const includedDeliverables = [
  {
    num: "01",
    title: "LinkedIn Authority Post",
    details: [
      "180–250 words calibrated for executive dwell time",
      "Anchored to 1 source-verified operational thesis",
      "Tailored meticulously to your genuine public voice",
      "Includes precise evidence & quote attribution",
    ],
  },
  {
    num: "02",
    title: "Document-Post Outline",
    details: [
      "4–6 section slide-by-slide narrative structure",
      "Ready to hand directly to your designer or self-publish",
      "Focuses on visual framework & breakdown logic",
      "Text outline only — no Canva or design files",
    ],
  },
  {
    num: "03",
    title: "Three Future Content Angles",
    details: [
      "Each drawn from a distinct supported point in your source",
      "Defines the exact target buyer persona",
      "Identifies the specific business bottleneck resolved",
      "Prepares your pipeline for upcoming weeks",
    ],
  },
  {
    num: "04",
    title: "Three High-Conviction Hooks",
    details: [
      "Contrarian opening, curiosity framing, problem-first variant",
      "Engineered to stop the mobile LinkedIn feed scroll",
      "A/B testable for maximum decision-maker engagement",
    ],
  },
  {
    num: "05",
    title: "One Consolidated Revision",
    details: [
      "Comprehensive feedback loop collected in 1 response",
      "Refines tone, nuance, and company-specific vocabulary",
      "Ensures zero endless friction or scope confusion",
    ],
  },
];

const notIncluded = [
  "Video editing or audio clip extraction",
  "Graphic design, PDF export, Canva templates",
  "Account publishing, scheduling, or DM outreach",
  "Daily social media management",
  "Rewriting an entire raw transcript verbatim",
  "Guaranteed viral reach or lead quotas",
  "Calls unless separately scheduled and agreed",
  "Unlimited open-ended revision cycles",
  "X/Twitter threads by default",
];

const timeline = [
  { day: "Day 1–2", desc: "Source deep-dive, evidence extraction & strategic angle mapping" },
  { day: "Day 3–4", desc: "Drafting authority post, document outline & hook triad" },
  { day: "Day 5", desc: "Consolidated delivery, client review & final calibration" },
];

export default function Offer() {
  const [activeTab, setActiveTab] = useState<"included" | "excluded">("included");

  return (
    <section id="offer" className={styles.offer} aria-labelledby="offer-heading">
      <div className="container">
        <div className={styles.offerHeader}>
          <div className={styles.offerMeta}>
            <div className="section-tag">
              <span className="section-tag-pulse" />
              <span>02 / Fixed-Scope Specification</span>
            </div>
            <h2 id="offer-heading" className={styles.offerTitle}>
              {OFFER_NAME}
            </h2>
            <p className={styles.offerSubtitle}>
              A 5-business-day editorial engagement that turns 1 approved source
              into a LinkedIn post, text-only document outline, 3 hooks, and 3 future content angles.
            </p>
          </div>

          <div className={styles.pricePill}>
            <span className={styles.priceAmount}>{OFFER_PRICE}</span>
            <span className={styles.priceNote}>5-Day Delivery · Human-Led Rigor</span>
          </div>
        </div>

        {/* 5 3D Deliverable Cards */}
        <div className={styles.deliverablesGrid}>
          {includedDeliverables.map((item) => (
            <article key={item.num} className={styles.deliverableCard}>
              <span className={styles.cardIndex}>{item.num} / Deliverable</span>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <ul className={styles.cardList}>
                {item.details.map((detail, idx) => (
                  <li key={idx} className={styles.cardListItem}>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        {/* Scope Matrix */}
        <div className={styles.scopeContainer}>
          <div className={styles.scopeTabs}>
            <button
              type="button"
              className={`${styles.scopeTabBtn} ${
                activeTab === "included" ? styles.scopeTabActive : ""
              }`}
              onClick={() => setActiveTab("included")}
            >
              ✓ What You Receive (Guaranteed Scope)
            </button>
            <button
              type="button"
              className={`${styles.scopeTabBtn} ${
                activeTab === "excluded" ? styles.scopeTabActive : ""
              }`}
              onClick={() => setActiveTab("excluded")}
            >
              × Deliberately Excluded (No Fluff)
            </button>
          </div>

          {activeTab === "included" ? (
            <div className={styles.exclusionsGrid}>
              <div className={styles.exclusionItem}>
                <span style={{ color: "var(--emerald-bright)" }}>✓</span>
                <span>1 Core LinkedIn Authority Post (180–250 words)</span>
              </div>
              <div className={styles.exclusionItem}>
                <span style={{ color: "var(--emerald-bright)" }}>✓</span>
                <span>1 Document-Post Slide Framework (4–6 slides)</span>
              </div>
              <div className={styles.exclusionItem}>
                <span style={{ color: "var(--emerald-bright)" }}>✓</span>
                <span>3 Future Content Angles with buyer personas</span>
              </div>
              <div className={styles.exclusionItem}>
                <span style={{ color: "var(--emerald-bright)" }}>✓</span>
                <span>3 High-Conversion Hook Options</span>
              </div>
              <div className={styles.exclusionItem}>
                <span style={{ color: "var(--emerald-bright)" }}>✓</span>
                <span>1 Consolidated Revision Round included</span>
              </div>
              <div className={styles.exclusionItem}>
                <span style={{ color: "var(--emerald-bright)" }}>✓</span>
                <span>Text-first delivery directly into your inbox</span>
              </div>
            </div>
          ) : (
            <div className={styles.exclusionsGrid}>
              {notIncluded.map((item, idx) => (
                <div key={idx} className={styles.exclusionItem}>
                  <span className={styles.exclusionIcon}>×</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Client Roadmap & Turnaround Planner */}
        <div className={styles.clientRoadmap}>
          <div className={styles.roadmapLeft}>
            <h3>Ready in 5 Business Days</h3>
            <p>
              Work begins the moment your source, scope, and payment are confirmed.
              Mara reviews your recording directly—extracting signal, discarding conversational
              filler, and delivering finished assets ready for review.
            </p>
            <div style={{ marginTop: "1.5rem" }}>
              <a href="#request" className="btn-primary">
                <span>Request This Sprint ($297 USD)</span>
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>

          <div className={styles.roadmapTimeline}>
            {timeline.map((step, idx) => (
              <div key={idx} className={styles.timelineStep}>
                <span className={styles.timelineDay}>{step.day}</span>
                <span className={styles.timelineDesc}>{step.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
