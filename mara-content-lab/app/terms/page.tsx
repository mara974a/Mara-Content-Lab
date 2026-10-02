import type { Metadata } from "next";
import Link from "next/link";
import { CONTACT_EMAIL } from "@/lib/constants";
import styles from "../policy.module.css";

export const metadata: Metadata = {
  title: "Terms of Service | Mara Content Lab",
  description: "Terms for using the Mara Content Lab website and editorial services.",
};

export default function TermsPage() {
  return (
    <main id="main-content" className={styles.page}>
      <article className={styles.article}>
        <Link className={styles.backLink} href="/">← Mara Content Lab</Link>
        <p className="section-index">SERVICE TERMS</p>
        <h1 className={styles.heading}>Terms of service</h1>
        <p className={styles.updated}>Last updated: October 2, 2026</p>
        <p className={styles.intro}>
          These terms apply to this website and editorial services provided by Mara Content Lab, operated by Parth Tiwari as an independent builder based in India. By requesting or purchasing a project, you agree to the terms below. If you request work for an organization, you confirm that you are authorized to do so.
        </p>

        <section className={styles.section}>
          <h2>1. Requests and acceptance</h2>
          <p>A request submitted through this website is an inquiry, not an accepted project or contract. Mara Content Lab may decline a request or source. Work begins only after Mara confirms the source and scope in writing, the client approves them, and payment is confirmed.</p>
        </section>

        <section className={styles.section}>
          <h2>2. The Source-to-Authority Sprint</h2>
          <p>The current public sprint is $297 USD and includes one LinkedIn post of approximately 180–250 words, one six-to-eight-part text outline for a LinkedIn document post, three future content angles with an intended reader and business problem for each, three hook options, and one consolidated revision round. The agreed scope and the public offer description control if details need clarification.</p>
          <p>Video editing, video clips, graphic design, Canva files, carousel design, PDF export, publishing or scheduling, X/Twitter threads by default, daily social-media management, full marketing strategy, rewriting an entire transcript, unlimited revisions, free completed custom drafts, guaranteed business outcomes, and calls unless separately agreed are not included. X/Twitter threads may only be discussed separately when they fit the client’s actual publishing strategy.</p>
        </section>

        <section className={styles.section}>
          <h2>3. Timing and client inputs</h2>
          <p>Delivery is within five business days after the source, scope, and payment are confirmed. The client is responsible for providing one approved source, audience context, and any optional voice references they want considered. Delays in receiving necessary information or consolidated feedback may affect timing; any revised delivery date will be discussed directly.</p>
        </section>

        <section className={styles.section}>
          <h2>4. Payment</h2>
          <p>The sprint price is $297 USD. After a request is reviewed and the source is confirmed as a fit, Mara shares scope confirmation and a Wise payment link privately. Payment is due before work begins. Any bank, exchange, or payment-provider fees charged to the client are the client’s responsibility unless applicable law requires otherwise.</p>
        </section>

        <section className={styles.section}>
          <h2>5. Cancellation and refunds</h2>
          <ul>
            <li>Before work begins: full refund.</li>
            <li>After work begins but before first draft delivery: 50% refund.</li>
            <li>After first draft delivery: no refund.</li>
            <li>Full refund if Mara determines the source is not a fit after payment but before work begins.</li>
          </ul>
          <p>Requests to pause or extend a project will be considered case by case and do not automatically create a right to a refund. Nothing in this section limits non-waivable rights under applicable consumer law, including any statutory cancellation or withdrawal period that applies to a client in the United States, EEA, or United Kingdom.</p>
        </section>

        <section className={styles.section}>
          <h2>6. Revisions and scope changes</h2>
          <p>One consolidated revision round is included. The client should collect feedback into one clear response. Additional revisions, new directions, or work outside the confirmed scope require separate written agreement and may involve additional fees.</p>
        </section>

        <section className={styles.section}>
          <h2>7. Client materials and source rights</h2>
          <p>The client is responsible for having the rights and permissions needed to share source recordings, transcripts, links, and other materials with Mara. The client must not ask Mara to reproduce or use material in a way that infringes another person’s rights or violates a confidentiality obligation. The client remains responsible for the original source material and any permissions required to publish from it.</p>
        </section>

        <section className={styles.section}>
          <h2>8. Editorial work, AI, and outcomes</h2>
          <p>AI may assist with research, transcript analysis, and early drafting. Source-accuracy checks, editorial judgment, angle selection, and final editing remain human-led. The service does not guarantee reach, engagement, leads, sales, revenue, followers, or any other business outcome. The client is responsible for reviewing and approving content before publication.</p>
        </section>

        <section className={styles.section}>
          <h2>9. Use of final materials</h2>
          <p>Once payment is complete, the client may use the final approved deliverables for their own professional and business content. The client does not receive rights to the underlying source or third-party material. Mara may refer to non-confidential work in a portfolio or case study unless the client and Mara agree otherwise in writing; no confidential information or private source material will be disclosed as part of such a reference.</p>
        </section>

        <section className={styles.section}>
          <h2>10. Liability</h2>
          <p>To the extent permitted by applicable law, neither party is liable to the other for indirect or consequential loss arising from a project. Mara’s total liability for a project will not exceed the amount paid for that project. Nothing in these terms excludes liability that cannot legally be excluded or limited.</p>
        </section>

        <section className={styles.section}>
          <h2>11. Governing law and disputes</h2>
          <p>These terms are governed by the laws of India. Courts located in India will have jurisdiction, subject to any mandatory consumer protections or jurisdiction rights that apply to a client under the law where they live. These terms do not remove rights that cannot legally be waived, including applicable rights for clients in the United States, the EEA, or the United Kingdom.</p>
        </section>

        <section className={styles.section}>
          <h2>12. Updates and contact</h2>
          <p>These terms may be updated as the service changes. The current version and revision date will be published here. Questions may be sent to Parth Tiwari at <a className={styles.contact} href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.</p>
        </section>
      </article>
    </main>
  );
}