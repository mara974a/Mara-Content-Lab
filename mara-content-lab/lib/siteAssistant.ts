interface AssistantFaq {
  question: string;
  keywords: readonly string[];
  answer: string;
}

const assistantFaqs: readonly AssistantFaq[] = [
  {
    question: "What is included in the sprint?",
    keywords: ["included", "deliverables", "what do i get", "sprint includes"],
    answer:
      "The sprint includes one 180–250 word LinkedIn authority post, one text-only document-post outline with 4–6 sections, three future content angles, three hook options, and one consolidated revision round. Design, Canva files, publishing, unlimited revisions, and guaranteed outcomes are not included.",
  },
  {
    question: "What kinds of sources work best?",
    keywords: ["what kinds of sources", "source types", "podcast", "webinar", "long form source"],
    answer:
      "Interviews, webinars, podcasts, talks, and other long-form conversations with a clear point of view can work. The source needs enough substance for a focused, evidence-backed post; Parth reviews each source for fit.",
  },
  {
    question: "What happens after I request a project?",
    keywords: ["after i request", "request a project", "submit a request", "project request form"],
    answer:
      "Use the project request form to share your contact details, source, audience, and goal. Parth reviews requests manually and replies within 2 business days. If the source and scope are a fit, he confirms the scope and shares payment instructions privately. Work begins after the source, scope, and payment are confirmed.",
  },
  {
    question: "What is the editorial process?",
    keywords: ["process", "how does it work", "editorial steps"],
    answer:
      "The process is source review and fit check, evidence selection, angle choice, drafting, then human review and delivery. The work stays grounded in the approved source.",
  },
  {
    question: "Is the sprint a good fit for me?",
    keywords: ["good fit", "fit for me", "suitable", "founder", "operator"],
    answer:
      "The sprint is for founders, operators, and professionals with a substantive long-form source and a clear audience. Requests are reviewed for source fit, scope, and capacity; not every request is accepted.",
  },
  {
    question: "Can you guarantee reach, engagement, leads, or sales?",
    keywords: ["guarantee", "reach", "engagement", "leads", "sales", "views", "results"],
    answer:
      "No. Mara does not guarantee reach, engagement, leads, sales, or other business outcomes. The work focuses on careful, source-grounded editorial decisions.",
  },
  {
    question: "Do you design LinkedIn carousels?",
    keywords: ["carousel", "graphic design", "canva", "pdf export"],
    answer:
      "No. The sprint includes a text-only document-post outline. Graphic design, Canva files, carousel design, and PDF export are not included.",
  },
  {
    question: "Do you use AI?",
    keywords: ["ai", "artificial intelligence", "human led"],
    answer:
      "AI may assist with research, transcript analysis, and early drafting. Source-accuracy checks, editorial judgment, angle selection, final edits, and delivery remain human-led and human-accountable.",
  },
  {
    question: "How do revisions work?",
    keywords: ["revision", "consolidated feedback", "feedback round"],
    answer:
      "One consolidated revision round is included. Collect all feedback into one clear response; additional revisions or a new direction need separate agreement.",
  },
  {
    question: "Do you offer ongoing monthly work?",
    keywords: ["ongoing", "monthly work", "retainer"],
    answer:
      "Ongoing support may be discussed after an initial project, but it is not offered as a public fixed package. The sprint is a standalone, scoped engagement.",
  },
  {
    question: "Who owns or may use the final content?",
    keywords: ["ownership", "who owns", "commercial use", "business use", "usage rights"],
    answer:
      "After payment is complete, you may use the final approved deliverables for your own professional and business content. This does not transfer rights to the original source or third-party material. See /terms for details.",
  },
  {
    question: "What does five business days mean?",
    keywords: ["five business days", "5 business days", "timeline", "how long", "delivery time"],
    answer:
      "Business days are Monday through Friday; weekends and public holidays are not counted. Delivery is within five business days after the source, scope, and payment are confirmed.",
  },
  {
    question: "How is payment handled?",
    keywords: ["payment", "pay", "wise", "payment link"],
    answer:
      "The sprint is $297 USD. Parth shares the Wise payment link privately after reviewing your request and confirming fit and scope. There is no public payment link.",
  },
  {
    question: "What if my source is not a fit?",
    keywords: ["not a fit", "source fit", "suitable source", "decline my source"],
    answer:
      "Requests are reviewed manually for source fit, scope, and capacity; not every request is accepted. If Mara determines after payment but before work begins that the source is not a fit, you receive a full refund.",
  },
  {
    question: "What is the full sprint price?",
    keywords: ["price", "pricing", "cost", "how much", "$297"],
    answer:
      "The Source-to-Authority Sprint is $297 USD, delivered within 5 business days after source, scope, and payment are confirmed. Payment instructions are shared privately after Parth reviews the request and confirms fit.",
  },
  {
    question: "What file formats do you deliver?",
    keywords: ["file format", "file formats", "format"],
    answer:
      "The deliverables are text-first: a LinkedIn post and a text-only document-post outline, plus angles and hooks. A specific file format is not documented here; please confirm your preferred format when Parth reviews the request.",
  },
  {
    question: "Are discounts available?",
    keywords: ["discount", "discounts", "reduced rate"],
    answer:
      "No discounts or alternate rates are listed as a standard offer. Email mara974a@gmail.com with a specific scope or pricing question before submitting a request.",
  },
  {
    question: "What is the cancellation and refund policy?",
    keywords: ["refund", "refunds", "cancellation", "cancel"],
    answer:
      "Before work begins, cancellation receives a full refund. After work begins but before first-draft delivery, the refund is 50%; after first-draft delivery, no refund is available. If Mara determines after payment but before work begins that the source is not a fit, the refund is full. See /terms for details.",
  },
  {
    question: "Where can I find Privacy and Terms?",
    keywords: ["privacy", "personal data", "terms", "legal"],
    answer:
      "The Privacy and Terms pages are linked in the site footer. Form details are used to review requests, confirm scope, deliver work, and meet legal or tax obligations; they are not sold.",
  },
];

export const suggestedAssistantQuestions = [
  "What is included in the sprint?",
  "How much does it cost?",
  "How do I submit a request?",
  "Do you guarantee results?",
];

function normalize(value: string): string {
  return value
    .toLowerCase()
    .replace(/[’]/g, "'")
    .replace(/[^a-z0-9$]+/g, " ")
    .trim();
}

export function answerSiteQuestion(question: string): string {
  const query = normalize(question);
  let bestMatch: AssistantFaq | undefined;
  let bestScore = 0;

  for (const entry of assistantFaqs) {
    let score = 0;
    for (const keyword of entry.keywords) {
      const normalizedKeyword = normalize(keyword);
      if (normalizedKeyword && query.includes(normalizedKeyword)) {
        score += normalizedKeyword.length + 1;
      }
    }
    if (score > bestScore) {
      bestMatch = entry;
      bestScore = score;
    }
  }

  return (
    bestMatch?.answer ??
    "I don’t have a documented answer for that. Please email mara974a@gmail.com or submit a request through the form on this page."
  );
}
