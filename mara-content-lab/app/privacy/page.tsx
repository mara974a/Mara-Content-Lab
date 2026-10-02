import type { Metadata } from "next";
import Link from "next/link";
import { CONTACT_EMAIL } from "@/lib/constants";
import styles from "../policy.module.css";

export const metadata: Metadata = {
  title: "Privacy Policy | Mara Content Lab",
  description: "How Mara Content Lab handles information submitted through this website and during editorial projects.",
};

export default function PrivacyPage() {
  return (
    <main id="main-content" className={styles.page}>
      <article className={styles.article}>
        <Link className={styles.backLink} href="/">← Mara Content Lab</Link>
        <p className="section-index">POLICY</p>
        <h1 className={styles.heading}>Privacy policy</h1>
        <p className={styles.updated}>Last updated: October 2, 2026</p>
        <p className={styles.intro}>
          Mara Content Lab is operated by Parth Tiwari, an independent builder based in India. This policy explains how information is handled when you visit this site, submit a project request, or work with Mara Content Lab.
        </p>

        <section className={styles.section}>
          <h2>1. Information collected</h2>
          <p>When you submit a project request, the form collects your name, work email, company or professional website, role, source link, intended audience, and what you want the content to clarify. It also collects your acknowledgement that requests are reviewed personally and may be declined.</p>
          <p>If you choose to provide them, the form also collects your LinkedIn profile URL, links to writing references, and any additional context. If a project proceeds, information needed to confirm the scope, process payment, and deliver the work may also be handled.</p>
          <p>The form is processed by FormSubmit and delivered to the contact email shown on this site. FormSubmit and the site host may process technical information such as IP address, browser details, and request logs as part of operating and protecting their services. This site does not currently integrate analytics.</p>
        </section>

        <section className={styles.section}>
          <h2>2. How information is used</h2>
          <ul>
            <li>To review project requests and respond about fit, scope, and next steps.</li>
            <li>To perform agreed editorial work and communicate about delivery and revisions.</li>
            <li>To process payment through the payment provider shared for an accepted project.</li>
            <li>To maintain records and meet applicable legal, tax, and security obligations.</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>3. Legal grounds for processing</h2>
          <p>For people in the EEA, UK, and other places with similar data-protection laws, information may be processed to take steps you request before a contract, perform a contract, pursue legitimate interests in reviewing and operating the service, comply with legal obligations, or on consent where consent is required.</p>
        </section>

        <section className={styles.section}>
          <h2>4. Service providers and sharing</h2>
          <p>Personal information is not sold. It may be shared only as reasonably needed with providers supporting this service, including FormSubmit for request delivery, email and website hosting providers, AI-assisted research or drafting tools when needed for project work, and Wise or another payment provider for an accepted project. Each provider handles information under its own terms and privacy practices.</p>
          <p>Information may also be disclosed where required by law or reasonably necessary to protect the rights, security, or property of the people involved.</p>
        </section>

        <section className={styles.section}>
          <h2>5. International transfers</h2>
          <p>Mara Content Lab is operated from India, and service providers may process information in other countries. Where a transfer is subject to legal restrictions, appropriate transfer protections will be used as required by the applicable law. You may contact Mara for further information about relevant providers and transfer arrangements.</p>
        </section>

        <section className={styles.section}>
          <h2>6. Retention</h2>
          <p>Project inquiries that do not proceed are generally kept for up to 12 months after the last substantive contact, then deleted unless a longer period is reasonably needed to resolve a dispute or comply with law. Records relating to paid work may be kept for the period required by tax, accounting, or other legal obligations. Source and working materials are kept only as needed to complete the project and handle the agreed revision, unless a different period is agreed.</p>
        </section>

        <section className={styles.section}>
          <h2>7. Your choices and rights</h2>
          <p>Depending on where you live, you may have rights to request access to, correction or deletion of your information, restriction or objection to certain processing, or a copy of information you provided. Some US state laws provide additional rights, which may include knowing what personal information is held, requesting correction or deletion, and opting out of certain processing. Mara does not sell personal information or use it for targeted advertising. You may also complain to your local data-protection authority. To make a request, contact Mara at <a className={styles.contact} href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. A request may need to be verified, and some information may need to be retained where the law requires it.</p>
        </section>

        <section className={styles.section}>
          <h2>8. Security and third-party material</h2>
          <p>Reasonable measures are used to protect information, but no online transmission or storage system can be guaranteed completely secure. Please share only source material you are authorized to provide. Avoid including sensitive personal information or confidential third-party material unless you have the necessary permission and it is needed for the project.</p>
        </section>

        <section className={styles.section}>
          <h2>9. Children and changes</h2>
          <p>This service is intended for professionals and is not directed to children under 18. This policy may be updated when the service or its providers change. The latest version and revision date will be published on this page.</p>
        </section>

        <section className={styles.section}>
          <h2>10. Contact</h2>
          <p>For privacy questions or requests, contact Parth Tiwari at <a className={styles.contact} href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.</p>
        </section>
      </article>
    </main>
  );
}