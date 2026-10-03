"use client";

import { useState } from "react";
import styles from "./FAQ.module.css";

interface FAQItem {
  id: string;
  category: "scope" | "pricing" | "editorial" | "policy";
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    id: "faq-1",
    category: "editorial",
    question: "What kinds of sources work best?",
    answer:
      "Podcasts, webinars, recorded talks, client interviews, and other long-form conversations where you express substantive operational thinking. Sources that are mostly promotional fluff or small talk rarely yield high-conviction posts.",
  },
  {
    id: "faq-2",
    category: "scope",
    question: "What happens after I submit a project request?",
    answer:
      "Parth reviews your request personally and replies within two business days. If the source is a good fit, he confirms the scope and shares payment instructions privately via Wise. Work begins only after the source, scope, and payment are confirmed.",
  },
  {
    id: "faq-3",
    category: "scope",
    question: "Can you guarantee viral reach, leads, or sales?",
    answer:
      "No. Mara Content Lab produces rigorous, source-grounded editorial assets. Distribution algorithms, audience response, and commercial conversions depend on external market dynamics. We guarantee intellectual clarity and accuracy, not vanity reach.",
  },
  {
    id: "faq-4",
    category: "scope",
    question: "Do you design LinkedIn carousels or Canva files?",
    answer:
      "No. The sprint includes a structured 4–6 slide text outline and narrative framework. Visual design, Canva files, and PDF graphic exports are not included, keeping the sprint focused purely on high-leverage intellectual capital.",
  },
  {
    id: "faq-5",
    category: "editorial",
    question: "How is AI used in the process?",
    answer:
      "AI assists with computational parsing, indexing transcripts, and exploring hook permutations. All editorial judgment, angle selection, factual verification against the recording, and final polish remain 100% human-crafted by Parth.",
  },
  {
    id: "faq-6",
    category: "policy",
    question: "How do revisions work?",
    answer:
      "One consolidated revision round is included. You compile all feedback into one clear message so edits are addressed coherently and efficiently. Endless open-ended revisions are outside the sprint scope.",
  },
  {
    id: "faq-7",
    category: "pricing",
    question: "How is payment handled?",
    answer:
      "The sprint is fixed at $297 USD and invoiced via Wise. Parth shares the payment details privately after verifying that your source is a fit. There are no public checkout links or hidden recurring retainers.",
  },
  {
    id: "faq-8",
    category: "pricing",
    question: "What does five business days mean?",
    answer:
      "Business days run Monday through Friday. Delivery is completed within five business days after source approval, scope confirmation, and payment receipt.",
  },
  {
    id: "faq-9",
    category: "policy",
    question: "Who owns the final intellectual property?",
    answer:
      "You own full commercial usage rights to all final delivered copy for your professional content. Nothing in the sprint transfers rights to your original recording or third-party assets.",
  },
  {
    id: "faq-10",
    category: "policy",
    question: "What is your refund policy?",
    answer:
      "If Mara declines your source before work begins, you receive a 100% full refund. If you cancel after work begins but before first-draft delivery, the refund is 50%. After draft delivery, all fees are earned.",
  },
];

const categories = [
  { id: "all", label: "All Questions" },
  { id: "scope", label: "Sprint Scope" },
  { id: "pricing", label: "Pricing & Wise" },
  { id: "editorial", label: "Editorial & AI" },
  { id: "policy", label: "Revisions & Terms" },
];

export default function FAQ() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [openId, setOpenId] = useState<string | null>("faq-1");

  const filteredFaqs =
    selectedCategory === "all"
      ? faqs
      : faqs.filter((faq) => faq.category === selectedCategory);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className={styles.faq} aria-labelledby="faq-heading">
      <div className="container">
        <div className={styles.faqHeader}>
          <div className="section-tag">
            <span className="section-tag-pulse" />
            <span>08 / Frequently Asked</span>
          </div>
          <h2 id="faq-heading" className={styles.faqHeading}>
            Frequently asked questions.
          </h2>
          <p className={styles.faqSubtitle}>
            Everything you need to know about the sprint scope, timeline, payment,
            and editorial standards.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className={styles.filterPills} role="tablist" aria-label="FAQ categories">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              role="tab"
              aria-selected={selectedCategory === cat.id}
              className={`${styles.pillBtn} ${
                selectedCategory === cat.id ? styles.pillBtnActive : ""
              }`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Accordion */}
        <dl className={styles.faqList}>
          {filteredFaqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`${styles.faqItem} ${isOpen ? styles.faqItemOpen : ""}`}
              >
                <dt>
                  <button
                    id={`${faq.id}-btn`}
                    className={styles.faqButton}
                    aria-expanded={isOpen}
                    aria-controls={`${faq.id}-answer`}
                    onClick={() => toggle(faq.id)}
                  >
                    <span>{faq.question}</span>
                    <svg
                      className={`${styles.faqIcon} ${isOpen ? styles.faqIconRotated : ""}`}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
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
