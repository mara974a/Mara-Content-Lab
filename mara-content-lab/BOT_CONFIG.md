# Site assistant configuration

## Current implementation

The site includes a small, rule-based FAQ assistant in `components/Assistant/SiteAssistant.tsx`. Its fixed Q&A list and suggested prompts are in `lib/siteAssistant.ts`. The widget is dynamically loaded through `components/Assistant/SiteAssistantLoader.tsx` and does not delay static page rendering.

This is a local FAQ helper, not an AI chatbot. Matching runs in the browser; messages exist only in the widget's in-memory session and are not sent to a third party or persisted. No external provider, widget ID, API route, API key, or secret is used.

## Supported answers

- **Offer:** $297 USD; delivery within five business days after the source, scope, and payment are confirmed.
- **Payment:** Wise instructions are shared privately after a manual fit check; never display or invent a payment URL.
- **Deliverables:** one 180–250 word LinkedIn post, one text-only 4–6 section document-post outline, three future angles, three hooks, and one consolidated revision.
- **Request flow:** the visitor submits the site form; Parth reviews source, scope, and capacity and replies within two business days.
- **Process:** source review, evidence selection, angle choice, drafting, human review, and delivery.
- **Fit:** founders, operators, and professionals with a substantive source and a clear audience; acceptance is not guaranteed.
- **Outcomes:** never guarantee reach, engagement, leads, sales, or other business results.
- **AI use:** AI may assist research, transcript analysis, and early drafting; source accuracy and final editorial work remain human-accountable.
- **Fallback:** for unknown questions, direct visitors to `mara974a@gmail.com` or the request form.

Suggested prompts cover the deliverables, price, request flow, and outcome guarantees. The answer matcher also covers sources, revisions, timing, fit, payment, file formats, commercial use, discounts, refunds, AI use, and Privacy/Terms.

Unknown questions receive the email and request-form fallback. Do not add a hosted AI provider unless the owner explicitly approves it and its data processing is reflected in the privacy policy.
