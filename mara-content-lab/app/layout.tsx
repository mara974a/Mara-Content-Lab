import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mara Content Lab — Source-Grounded LinkedIn Content for Independent B2B Experts",
  description:
    "Mara Content Lab turns one approved podcast, webinar, or interview into a focused LinkedIn authority sprint—carefully grounded in what you actually said. A human-led, AI-assisted editorial service for fractional B2B operators and expert consultants.",
  keywords: [
    "LinkedIn content",
    "fractional B2B operator",
    "editorial service",
    "source-grounded content",
    "independent consultant",
    "content writing",
  ],
  authors: [{ name: "Parth Tiwari" }],
  openGraph: {
    title: "Mara Content Lab — Source-Grounded LinkedIn Content for Independent B2B Experts",
    description:
      "Turn one approved conversation into clear LinkedIn content. Human-led, AI-assisted. $297 USD.",
    type: "website",
    locale: "en_US",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <a className="skip-link" href="#main-content">Skip to content</a>
        {children}
      </body>
    </html>
  );
}
