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
              <Link href="/" className={styles.footerWordmark} aria-label="Mara Content Lab">
                Mara Content Lab
              </Link>
              <p className={styles.footerTagline}>
                Built by Parth Tiwari. Source-grounded LinkedIn content for independent B2B experts.
              </p>
            </div>

            <nav className={styles.footerLinks} aria-label="Footer navigation">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className={styles.footerLink}
              >
                {CONTACT_EMAIL}
              </a>
              <a
                href={LINKEDIN_URL}
                className={styles.footerLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
              <a href="#request" className={styles.footerLink}>
                Request a project
              </a>
            </nav>
          </div>

          <div className={styles.footerBottom}>
            <p className={styles.footerCopy}>
              © {currentYear} Mara Content Lab. Built by Parth Tiwari.
            </p>
            <div className={styles.footerLegal}>
              <a href={PRIVACY_URL} className={styles.footerLegalLink}>Privacy</a>
              <a href={TERMS_URL} className={styles.footerLegalLink}>Terms</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
