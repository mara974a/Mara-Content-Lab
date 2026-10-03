"use client";

import dynamic from "next/dynamic";

const SiteAssistant = dynamic(() => import("./SiteAssistant"), {
  ssr: false,
  loading: () => null,
});

export default function SiteAssistantLoader() {
  return <SiteAssistant />;
}
