import React from "react";

export function Markdown({ text, className }: { text: string; className?: string }) {
  if (!text) return null;

  const blocks = text.trim().split(/\n\n+/);

  return (
    <div className={className}>
      {blocks.map((block, idx) => renderBlock(block.trim(), idx))}
    </div>
  );
}

function renderBlock(block: string, index: number): React.ReactNode {
  if (!block) return null;

  const heading = block.match(/^(#{1,3})\s+(.+)$/);
  if (heading) {
    const level = heading[1].length;
    const className =
      level === 1
        ? "mt-8 first:mt-0 text-2xl font-bold tracking-tight text-[var(--foreground)]"
        : level === 2
          ? "mt-8 first:mt-0 text-lg font-semibold text-[var(--foreground)]"
          : "mt-6 first:mt-0 text-base font-semibold text-[var(--foreground)]";

    if (level === 1) {
      return (
        <h1 key={index} className={className}>
          {parseInline(heading[2])}
        </h1>
      );
    }
    if (level === 2) {
      return (
        <h2 key={index} className={className}>
          {parseInline(heading[2])}
        </h2>
      );
    }
    return (
      <h3 key={index} className={className}>
        {parseInline(heading[2])}
      </h3>
    );
  }

  const lines = block.split("\n");
  const isList = lines.every((line) => /^\s*[-*]\s+/.test(line));
  if (isList) {
    return (
      <ul
        key={index}
        className="mt-4 first:mt-0 list-disc space-y-2 pl-5 leading-relaxed text-[var(--ink-muted)]"
      >
        {lines.map((line, lineIndex) => (
          <li key={`${index}-${lineIndex}`}>
            {parseInline(line.replace(/^\s*[-*]\s+/, ""))}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <p key={index} className="mt-4 first:mt-0 leading-relaxed text-[var(--ink-muted)]">
      {parseInline(block)}
    </p>
  );
}

function parseInline(text: string): React.ReactNode[] {
  // Matches **bold**, *italic*, `code`, and [link](url)
  const regex = /(\*\*.*?\*\*|\*.*?\*|`.*?`|\[.*?\]\(.*?\))/g;
  const parts = text.split(regex);

  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index} className="font-semibold text-[var(--foreground)]">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("*") && part.endsWith("*")) {
      return <em key={index} className="italic text-[var(--foreground)]">{part.slice(1, -1)}</em>;
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={index}
          className="rounded-lg border border-[var(--rule)] bg-[var(--surface-strong)] px-1.5 py-0.5 font-mono text-sm text-[var(--foreground)]"
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
            className="text-[var(--accent)] underline decoration-[var(--rule)] underline-offset-4 transition-colors hover:decoration-[var(--accent)]"
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
