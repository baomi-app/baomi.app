import React from "react";

export function Markdown({ text, className }: { text: string; className?: string }) {
  if (!text) return null;

  // Split into paragraphs by double newlines or more
  const paragraphs = text.split(/\n\n+/);

  return (
    <div className={className}>
      {paragraphs.map((p, idx) => {
        return (
          <p key={idx} className="mt-4 first:mt-0 leading-relaxed text-white/70">
            {parseInline(p)}
          </p>
        );
      })}
    </div>
  );
}

function parseInline(text: string): React.ReactNode[] {
  // Matches **bold**, *italic*, `code`, and [link](url)
  const regex = /(\*\*.*?\*\*|\*.*?\*|`.*?`|\[.*?\]\(.*?\))/g;
  const parts = text.split(regex);

  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index} className="font-semibold text-white">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("*") && part.endsWith("*")) {
      return <em key={index} className="italic text-white/95">{part.slice(1, -1)}</em>;
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={index}
          className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-sm text-white/90 border border-white/5"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    if (part.startsWith("[") && part.includes("](")) {
      const match = part.match(/\[(.*?)\]\((.*?)\)/);
      if (match) {
        return (
          <a
            key={index}
            href={match[2]}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white underline underline-offset-4 decoration-white/30 hover:decoration-white transition-colors"
          >
            {match[1]}
          </a>
        );
      }
    }
    // Also convert simple single newlines to br tags inside a paragraph
    if (part.includes("\n")) {
      const subParts = part.split("\n");
      return (
        <React.Fragment key={index}>
          {subParts.map((sub, sIdx) => (
            <React.Fragment key={sIdx}>
              {sIdx > 0 && <br />}
              {sub}
            </React.Fragment>
          ))}
        </React.Fragment>
      );
    }
    return part;
  });
}
