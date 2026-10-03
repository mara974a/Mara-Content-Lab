import Link from "next/link";
import { CONTACT_EMAIL, LINKEDIN_URL, PRIVACY_URL, TERMS_URL } from "@/lib/constants";
import styles from "./Footer.module.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className="container">
        <div className={styles.footerInner}>
          <div className={styles.footerTop}>
            <div className={styles.footerBrand}>
              <Link href="/" className={styles.brandHeading} aria-label="Mara Content Lab">
                <div className={styles.brandLogo} aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" />
                  </svg>
                </div>
                <span className={styles.footerWordmark}>Mara Content Lab</span>
              </Link>
              <p className={styles.footerTagline}>
                Source-grounded LinkedIn thought leadership for independent B2B experts,
                fractional operators, and specialized consultants. Built by Parth Tiwari.
              </p>
            </div>

            <nav className={styles.footerLinks} aria-label="Footer navigation">
              <a href="#offer" className={styles.footerLink}>
                The Sprint ($297)
              </a>
              <a href="#process" className={styles.footerLink}>
                Process
              </a>
              <a href="#sample" className={styles.footerLink}>
                Editorial Studio
              </a>
              <a href={`mailto:${CONTACT_EMAIL}`} className={styles.footerLink}>
                {CONTACT_EMAIL}
              </a>
              <a
                href={LINKEDIN_URL}
                className={styles.footerLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn ↗
              </a>
            </nav>
          </div>

          <div className={styles.footerBottom}>
            <p className={styles.footerCopy}>
              © {currentYear} Mara Content Lab. All rights reserved. Human-led editorial craft.
            </p>
            <div className={styles.footerLegal}>
              <a href={PRIVACY_URL} className={styles.footerLegalLink}>
                Privacy Policy
              </a>
              <a href={TERMS_URL} className={styles.footerLegalLink}>
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
