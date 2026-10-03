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
  {
    id: "faq-9",
    question: "What does five business days mean?",
    answer:
      "Business days are Monday through Friday; weekends and public holidays are not counted. Delivery is within five business days after the source, scope, and payment are confirmed.",
  },
  {
    id: "faq-10",
    question: "How is payment handled?",
    answer:
      "The sprint is $297 USD and payment is by Wise. Parth shares the payment link privately after reviewing your request, confirming the source is a fit, and agreeing the scope. There is no public payment link.",
  },
  {
    id: "faq-11",
    question: "What if my source is not a fit?",
    answer:
      "Parth reviews requests manually and will let you know if the source is not suitable. If payment has already been made and Mara declines the source before work begins, the terms provide for a full refund. You can also submit another source.",
  },
  {
    id: "faq-12",
    question: "What counts as one consolidated revision?",
    answer:
      "Collect your feedback into one clear response and send it together. That single, consolidated set of changes is the included revision round; additional revisions or a new direction need separate agreement.",
  },
  {
    id: "faq-13",
    question: "Is $297 USD the price for the full sprint?",
    answer:
      "Yes. $297 USD covers the sprint as described on this page. Work beyond the agreed deliverables is not included and would need to be agreed separately before it begins.",
  },
  {
    id: "faq-14",
    question: "What file formats do you deliver?",
    answer:
      "The deliverables are text-first: a LinkedIn post and a text-only document-post outline, plus angles and hooks. A specific file format is not documented here; please confirm your preferred format when Parth reviews the request.",
  },
  {
    id: "faq-15",
    question: "Can I use the final content commercially?",
    answer:
      "After payment is complete, you may use the final approved deliverables for your own professional and business content. This does not transfer rights to the original source or third-party material. See the Terms page for details.",
  },
  {
    id: "faq-16",
    question: "Do you offer discounts?",
    answer:
      "No discounts or alternate rates are listed as a standard offer. If you have a specific question about scope or pricing, email mara974a@gmail.com before submitting a request.",
  },
  {
    id: "faq-17",
    question: "What is the cancellation and refund policy?",
    answer:
      "Before work begins, a cancellation receives a full refund. After work begins but before the first draft is delivered, the refund is 50%; after first-draft delivery, there is no refund. If Mara determines after payment but before work starts that the source is not a fit, you receive a full refund. The Terms page has the full policy.",
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
        <p className="section-index">
          08 / QUESTIONS
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
