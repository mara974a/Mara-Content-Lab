"use client";

import { useEffect, useState } from "react";
import styles from "./Hero.module.css";

const angleDescriptions = [
  {
    label: "Authority",
    description: "Show the depth of understanding behind a useful point of view.",
  },
  {
    label: "Buyer education",
    description: "Make a business problem clearer for a prospective client.",
  },
  {
    label: "Recruitment",
    description: "Show prospective teammates how the work gets done.",
  },
  {
    label: "Speaking opportunity",
    description: "Develop a source-backed topic that could support a future talk.",
  },
];

export default function PrismAngleReadout() {
  const [activeAngle, setActiveAngle] = useState<number | null>(null);

  useEffect(() => {
    const updateAngle = (event: Event) => {
      const index = (event as CustomEvent<number>).detail;
      if (Number.isInteger(index) && index >= 0 && index < angleDescriptions.length) {
        setActiveAngle(index);
      }
    };

    window.addEventListener("mara:prism-angle", updateAngle);
    return () => window.removeEventListener("mara:prism-angle", updateAngle);
  }, []);

  const selectedAngle =
    activeAngle === null ? null : angleDescriptions[activeAngle];

  return (
    <div className={styles.angleReadout} aria-live="polite" aria-atomic="true">
      {selectedAngle ? (
        <>
          <p className={styles.angleReadoutLabel}>{selectedAngle.label} angle</p>
          <p className={styles.angleReadoutText}>{selectedAngle.description}</p>
        </>
      ) : (
        <p className={styles.angleReadoutText}>
          One source can support different audience angles.
        </p>
      )}
    </div>
  );
}
