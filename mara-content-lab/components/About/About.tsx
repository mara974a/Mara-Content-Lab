"use client";

import { CONTACT_EMAIL, LINKEDIN_URL } from "@/lib/constants";
import styles from "./About.module.css";

export default function About() {
  return (
    <section id="about" className={styles.about} aria-labelledby="about-heading">
      <div className="container">
        <div className={styles.aboutCard}>
          {/* Executive Profile Avatar & Details */}
          <div className={styles.aboutProfile}>
            <div className={styles.monogramRing} aria-hidden="true">
              <span className={styles.monogramLetters}>PT</span>
            </div>
            <h2 id="about-heading" className={styles.authorName}>
              Parth Tiwari
            </h2>
            <p className={styles.authorRole}>Lead Editor & Founder</p>
            <div className={styles.statusBeacon}>
              <span className={styles.statusDot} />
              <span>Accepting Sprint Bookings</span>
            </div>
          </div>

          {/* Manifesto & Context */}
          <div className={styles.aboutBody}>
            <div className="section-tag">
              <span className="section-tag-pulse" />
              <span>07 / Editorial Leadership</span>
            </div>

            <p className={styles.leadPara}>
              &ldquo;I built Mara Content Lab to solve a quiet crisis in professional services:
              exceptional operators have brilliant conversations on podcasts and calls, but their
              public writing either turns into generic AI boilerplate or remains completely unwritten.&rdquo;
            </p>

            <p className={styles.aboutPara}>
              I&apos;m Parth Tiwari, an independent editor based in India. I help fractional B2B executives,
              technical founders, and specialized consultants transform their richest spoken thinking
              into high-conviction LinkedIn thought leadership that withstands peer scrutiny.
            </p>

            <p className={styles.aboutPara}>
              I believe in radical focus: one source, one defensible angle, a LinkedIn post, a text-only
              document outline, three hooks, and three future content angles. I listen to your recording
              personally, map out the underlying commercial thesis, and handle the editorial drafting
              myself. AI accelerates research and indexing; I remain 100% accountable for every sentence delivered.
            </p>

            <div className={styles.aboutFooter}>
              <a
                href={LINKEDIN_URL}
                className={styles.socialLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>Connect on LinkedIn</span>
                <span aria-hidden="true">↗</span>
              </a>
              <a href={`mailto:${CONTACT_EMAIL}`} className={styles.socialLink}>
                <span>{CONTACT_EMAIL}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
