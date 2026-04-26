"use client";

import { useState } from "react";

type IntegrationSnippetProps = {
  snippet: string;
};

export function IntegrationSnippet({ snippet }: IntegrationSnippetProps) {
  const [status, setStatus] = useState("Copiar snippet");

  async function handleCopy() {
    await navigator.clipboard.writeText(snippet);
    setStatus("Snippet copiado");
  }

  return (
    <div className="space-y-3">
      <pre className="overflow-x-auto rounded-[24px] bg-[#111827] p-5 text-sm leading-7 text-white/80">{snippet}</pre>
      <button type="button" onClick={handleCopy} className="button-secondary">
        {status}
      </button>
    </div>
  );
}
