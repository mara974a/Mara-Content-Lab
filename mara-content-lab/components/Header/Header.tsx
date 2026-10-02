"use client";

import Link from "next/link";
import { useState } from "react";
import styles from "./Header.module.css";

const navItems = [
  { label: "Process", href: "#process" },
  { label: "What you receive", href: "#offer" },
  { label: "Fit", href: "#fit" },
  { label: "About", href: "#about" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNavClick = () => {
    setMobileOpen(false);
  };

  return (
    <header className={styles.header} role="banner">
      <div className={`container ${styles.headerInner}`}>
        <Link href="/" className={styles.wordmark} aria-label="Mara Content Lab — home">
          Mara Content Lab
        </Link>

        {/* Desktop navigation */}
        <nav aria-label="Primary navigation" className={styles.nav}>
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className={styles.navLink}>
              {item.label}
            </a>
          ))}
          <a href="#request" className={styles.navCta}>
            Request a project
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
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile navigation */}
      <div
        id="mobile-nav"
        className={`container ${styles.mobileNav} ${mobileOpen ? styles.mobileNavOpen : ""}`}
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
          Request a project
        </a>
      </div>
    </header>
  );
}
