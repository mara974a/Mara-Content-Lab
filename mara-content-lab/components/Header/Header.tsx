"use client";

import Link from "next/link";
import { useState } from "react";
import styles from "./Header.module.css";

const navItems = [
  { label: "The Sprint", href: "#offer" },
  { label: "Process", href: "#process" },
  { label: "Sample", href: "#sample" },
  { label: "Fit", href: "#fit" },
  { label: "About", href: "#about" },
  { label: "FAQ", href: "#faq" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNavClick = () => {
    setMobileOpen(false);
  };

  return (
    <div className={styles.headerWrapper}>
      <header className={styles.header} role="banner">
        <div className={styles.headerInner}>
          <Link href="/" className={styles.brand} aria-label="Mara Content Lab — home">
            <div className={styles.brandLogo} aria-hidden="true">
              <svg
                className={styles.brandLogoIcon}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" />
                <line x1="12" y1="22" x2="12" y2="15.5" />
                <polyline points="22 8.5 12 15.5 2 8.5" />
                <polyline points="2 15.5 12 8.5 22 15.5" />
              </svg>
            </div>
            <div className={styles.brandText}>
              <span className={styles.brandName}>Mara Content Lab</span>
              <span className={styles.brandSub}>Editorial Laboratory</span>
            </div>
          </Link>

          {/* Desktop navigation */}
          <nav aria-label="Primary navigation" className={styles.nav}>
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className={styles.navLink}>
                {item.label}
              </a>
            ))}
            <a href="#request" className={styles.navCta}>
              <span>Build Brief</span>
              <span aria-hidden="true">→</span>
            </a>
          </nav>

          {/* Mobile toggle */}
          <button
            className={styles.menuToggle}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            onClick={() => setMobileOpen((prev) => !prev)}
          >
            {mobileOpen ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile navigation */}
        <div
          id="mobile-nav"
          className={`${styles.mobileNav} ${mobileOpen ? styles.mobileNavOpen : ""}`}
          role="navigation"
          aria-label="Mobile navigation"
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={styles.mobileNavLink}
              onClick={handleNavClick}
            >
              {item.label}
            </a>
          ))}
          <a href="#request" className={styles.mobileNavCta} onClick={handleNavClick}>
            Build Brief →
          </a>
        </div>
      </header>
    </div>
  );
}
