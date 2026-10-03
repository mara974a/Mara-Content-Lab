"use client";

import { useState, useRef } from "react";
import styles from "./Hero.module.css";

const angles = [
  {
    id: 0,
    num: "01",
    label: "Authority",
    color: "#10b981",
    hint: "Show the deep operational insight behind your POV.",
  },
  {
    id: 1,
    num: "02",
    label: "Buyer Education",
    color: "#06b6d4",
    hint: "Make an expensive business problem crystal clear to buyers.",
  },
  {
    id: 2,
    num: "03",
    label: "Recruitment",
    color: "#f59e0b",
    hint: "Signal your culture, craft, and how work actually gets done.",
  },
  {
    id: 3,
    num: "04",
    label: "Keynote Speaking",
    color: "#a855f7",
    hint: "Transform spoken ideas into keynote-grade thought leadership.",
  },
];

export default function Hero() {
  const [selectedAngle, setSelectedAngle] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleAngleSelect = (index: number) => {
    setSelectedAngle(index);
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent<number>("mara:set-angle", { detail: index })
      );
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateX = (-y / rect.height) * 12;
    const rotateY = (x / rect.width) * 12;
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
  };

  return (
    <section className={styles.hero} aria-labelledby="hero-heading">
      <div className={`container ${styles.heroGrid}`}>
        <div className={styles.heroCopy}>
          <div className="section-tag">
            <span className="section-tag-pulse" />
            <span>Mara Content Lab · Source-Grounded Editorial Sprint</span>
          </div>

          <h1 id="hero-heading" className={styles.headline}>
            Make your best conversations{" "}
            <span className={styles.headlineGradient}>work harder.</span>
          </h1>

          <p className={styles.subheadline}>
            One thoughtful podcast, webinar, or interview becomes a focused{" "}
            <strong>LinkedIn authority sprint</strong>—shaped for prospective clients and
            rigorously grounded in what you actually said.
          </p>

          <div className={styles.heroActions}>
            <a href="#request" className="btn-primary">
              <span>Build Your Project Brief</span>
              <span aria-hidden="true">→</span>
            </a>
            <a href="#offer" className="btn-secondary">
              <span>See the 5-Day Sprint</span>
            </a>
          </div>

          {/* Interactive 3D Refraction Angle Matrix */}
          <div className={styles.angleMatrixContainer}>
            <div className={styles.angleMatrixHeader}>
              <span className={styles.angleMatrixLabel}>
                Interactive 3D Refraction Angles
              </span>
              <span className={styles.angleMatrixHint}>
                Hover / click to refocus 3D prism
              </span>
            </div>

            <div
              className={styles.angleGrid}
              role="tablist"
              aria-label="Editorial angle selector"
            >
              {angles.map((angle) => {
                const isActive = selectedAngle === angle.id;
                return (
                  <button
                    key={angle.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    className={`${styles.angleCard} ${
                      isActive ? styles.angleCardActive : ""
                    }`}
                    onClick={() => handleAngleSelect(angle.id)}
                    onMouseEnter={() => handleAngleSelect(angle.id)}
                  >
                    <span className={styles.angleNumber}>{angle.num}</span>
                    <span className={styles.angleTitle}>{angle.label}</span>
                  </button>
                );
              })}
            </div>

            <div className={styles.angleDetailBox}>
              <svg
                className={styles.angleDetailIcon}
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
              <p className={styles.angleDetailText}>
                <strong>{angles[selectedAngle].label} Angle:</strong>{" "}
                {angles[selectedAngle].hint}
              </p>
            </div>
          </div>
        </div>

        {/* 3D Holographic Card on the Right */}
        <aside
          ref={cardRef}
          className={styles.holographicCard}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          aria-label="Sprint pass overview"
        >
          <div className={styles.cardHeader}>
            <span className={styles.cardTag}>Sprint Pass</span>
            <div className={styles.cardBatch}>
              <span className={styles.cardBatchDot} />
              <span>Next Batch Open</span>
            </div>
          </div>

          <div className={styles.cardPriceGroup}>
            <p className={styles.cardPriceLabel}>Fixed Sprint Scope</p>
            <div className={styles.cardPrice}>
              $297 <span className={styles.cardCurrency}>USD</span>
            </div>
          </div>

          {/* Audio-to-Signal Waveform Simulation */}
          <div className={styles.waveformContainer}>
            <div className={styles.waveformHeader}>
              <span>INPUT: 60M RAW AUDIO</span>
              <span>OUTPUT: POST + OUTLINE + 3 HOOKS + 3 ANGLES</span>
            </div>
            <div className={styles.waveBars} aria-hidden="true">
              {[25, 45, 80, 60, 35, 95, 70, 50, 85, 40, 65, 90, 75, 55, 30, 85, 60, 45].map(
                (h, idx) => (
                  <span
                    key={idx}
                    className={styles.waveBar}
                    style={{
                      height: `${h}%`,
                      animationDelay: `${idx * 0.08}s`,
                    }}
                  />
                )
              )}
            </div>
          </div>

          <div className={styles.cardPerks}>
            <div className={styles.cardPerk}>
              <svg className={styles.cardPerkIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>5 Business Days turnaround</span>
            </div>
            <div className={styles.cardPerk}>
              <svg className={styles.cardPerkIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>1 Approved long-form source</span>
            </div>
            <div className={styles.cardPerk}>
              <svg className={styles.cardPerkIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>Human-led editorial judgment</span>
            </div>
            <div className={styles.cardPerk}>
              <svg className={styles.cardPerkIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>1 Consolidated revision round</span>
            </div>
          </div>

          <a href="#request" className={`btn-primary ${styles.cardCta}`}>
            <span>Request This Sprint</span>
            <span aria-hidden="true">→</span>
          </a>
        </aside>
      </div>
    </section>
  );
}
