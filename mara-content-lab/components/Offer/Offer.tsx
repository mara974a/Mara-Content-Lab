import { OFFER_NAME, OFFER_PRICE, OFFER_DELIVERY } from "@/lib/constants";
import styles from "./Offer.module.css";

const included = [
  {
    title: "1. LinkedIn authority post",
    details: [
      "Approximately 180–250 words",
      "Built around one evidence-backed idea from the approved source",
      "Edited for clarity and your public voice",
    ],
  },
  {
    title: "2. LinkedIn document-post outline",
    details: [
      "Six to eight slide-by-slide content ideas",
      "Based on the same core insight",
      "Text outline only — no Canva file, no design file",
    ],
  },
  {
    title: "3. Three future content angles",
    details: [
      "Each drawn from a different supported point in the same source",
      "Each includes the intended reader and business problem addressed",
    ],
  },
  {
    title: "4. Three hook options",
    details: ["For the primary LinkedIn post"],
  },
  {
    title: "5. One consolidated revision round",
    details: [
      "All feedback collected and sent together in one clear response",
    ],
  },
];

const clientProvides = [
  "One approved podcast, webinar, interview, long-form conversation, or video",
  "A short description of the audience you want to reach",
  "Optional: three to five public LinkedIn posts for voice reference",
];

const notIncluded = [
  "Video editing",
  "Video clips",
  "Graphic design",
  "Canva files",
  "Carousel design",
  "PDF export",
  "Publishing or scheduling",
  "X/Twitter threads by default",
  "Daily social-media management",
  "Full marketing strategy",
  "Rewriting an entire transcript",
  "Unlimited revisions",
  "Guaranteed business outcomes",
  "Free completed custom drafts",
  "Calls unless separately agreed",
];

const offerMetadata = [
  "One approved source",
  "Five business days",
  "One consolidated revision",
  "Text-first delivery",
];

export default function Offer() {
  return (
    <section id="offer" className={styles.offer} aria-labelledby="offer-heading">
      <div className="container--wide">
        <p className="section-index">
          02 / THE SPRINT
        </p>
        <div className={styles.offerHeader}>
          <div className={styles.offerMeta}>
            <h2 id="offer-heading" className={styles.offerName}>
              {OFFER_NAME}
            </h2>
            <span className={styles.offerPrice}>{OFFER_PRICE}</span>
          </div>
          <p className={styles.offerDelivery}>{OFFER_DELIVERY}.</p>
          <ul className={styles.offerMetadata} aria-label="Sprint details">
            {offerMetadata.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className={styles.offerGrid}>
          <section className={styles.offerColumn} aria-labelledby="included-heading">
            <h3 id="included-heading" className={styles.offerColLabel}>Included</h3>
            {included.map((item, i) => (
              <div key={i} className={styles.deliverable}>
                <p className={styles.deliverableTitle}>{item.title}</p>
                <ul className={styles.deliverableDetail}>
                  {item.details.map((d, j) => (
                    <li key={j}>{d}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          <section className={styles.offerColumn} aria-labelledby="excluded-heading">
            <h3 id="excluded-heading" className={styles.offerColLabel}>Not included</h3>
            <ul className={styles.notIncludedList}>
              {notIncluded.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className={styles.threadNote}>
              X/Twitter threads are not included by default and may only be discussed separately when they fit the client’s actual publishing strategy.
            </p>
          </section>
        </div>

        <div className={styles.clientInputs}>
          <h3 className={styles.offerColLabel}>What you provide</h3>
          <ul className={styles.clientInputList}>
            {clientProvides.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <p className={styles.paymentNote}>
          After a request is reviewed and the source is confirmed as a fit, Mara shares scope confirmation and a Wise payment link for $297 USD. Work begins only after payment and source approval are confirmed. The Wise link is single-use and tied to the agreed scope.
        </p>
      </div>
    </section>
  );
}
