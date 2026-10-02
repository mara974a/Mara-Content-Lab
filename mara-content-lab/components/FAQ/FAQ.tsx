"use client";

import { useState } from "react";
import styles from "./FAQ.module.css";

const faqs = [
  {
    id: "faq-1",
    question: "What kinds of sources work best?",
    answer:
      "Interviews, webinars, podcasts, talks, and other long-form conversations with a clear point of view. The source must be approved by you and contain enough substance for a standalone post. Sources that are primarily promotional or mostly small talk are unlikely to yield a focused, evidence-backed post.",
  },
  {
    id: "faq-2",
    question: "What happens after I request a project?",
    answer:
      "Mara reviews each request and replies within two business days. If the source is a fit, she confirms the scope and shares payment instructions privately. Work begins after the source, scope, and payment are confirmed. Not every source is accepted.",
  },
  {
    id: "faq-3",
    question: "Can you guarantee reach, engagement, leads, or sales?",
    answer:
      "No. Mara Content Lab provides carefully prepared content. Distribution, audience response, and business outcomes depend on many factors outside the scope of this service. No guarantees are made about performance.",
  },
  {
    id: "faq-4",
    question: "Do you design LinkedIn carousels?",
    answer:
      "No. The sprint includes a slide-by-slide text outline only. Graphic design, Canva files, and visual exports are not included. The outline gives you a clear content structure you can take to a designer or use as a reference.",
  },
  {
    id: "faq-5",
    question: "Do you use AI?",
    answer:
      "AI assists with research, transcript analysis, and early drafting. Final editorial choices, source-accuracy checks, and edits remain human-led. The goal is accurate, well-grounded content — not the fastest possible output.",
  },
  {
    id: "faq-6",
    question: "How do revisions work?",
    answer:
      "One consolidated revision round is included. You collect all feedback into one clear response so the revision remains focused and efficient. Piecemeal or open-ended revision requests are outside the scope of the sprint.",
  },
  {
    id: "faq-7",
    question: "Do you offer ongoing monthly work?",
    answer:
      "Ongoing support may be discussed after an initial project. It is not currently offered as a public fixed package. The sprint is designed as a standalone, scoped engagement.",
  },
  {
    id: "faq-8",
    question: "Who owns the final content?",
    answer:
      "You may use final approved materials for your own business content. Final usage terms should be confirmed before work begins. Nothing in the sprint grants rights to the original source material or third-party recordings.",
  },
];

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className={styles.faq} aria-labelledby="faq-heading">
      <div className="container--wide">
        <p className="eyebrow" style={{ marginBottom: "var(--space-4)" }}>
          Questions
        </p>
        <h2 id="faq-heading" className={styles.faqHeading}>
          Frequently asked
        </h2>

        <dl className={styles.faqList}>
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div key={faq.id} className={styles.faqItem}>
                <dt>
                  <button
                    id={`${faq.id}-btn`}
                    className={styles.faqButton}
                    aria-expanded={isOpen}
                    aria-controls={`${faq.id}-answer`}
                    onClick={() => toggle(faq.id)}
                  >
                    {faq.question}
                    <svg
                      className={styles.faqIcon}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                  </button>
                </dt>
                <dd
                  id={`${faq.id}-answer`}
                  role="region"
                  aria-labelledby={`${faq.id}-btn`}
                  className={`${styles.faqAnswer} ${isOpen ? styles.faqAnswerOpen : ""}`}
                >
                  <div className={styles.faqAnswerInner}>
                    <p>{faq.answer}</p>
                  </div>
                </dd>
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
