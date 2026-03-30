export function markdownToPlain(markdown: string): string {
  return markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]+`/g, " ")
    .replace(/!\[[^\]]*]\([^)]*\)/g, " ")
    .replace(/\[[^\]]*]\([^)]*\)/g, " ")
    .replace(/^#+\s.*/gm, " ")
    .replace(/[*_~>#|]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function extractBulletLines(markdown: string): string[] {
  const bullets: string[] = [];
  for (const line of markdown.split(/\r?\n/)) {
    const m = line.match(/^\s*[-*]\s+(.+)/);
    if (m) bullets.push(m[1].trim());
  }
  return bullets;
}

export function extractDoubleQuotedSnippets(markdown: string): string[] {
  const out: string[] = [];
  const re = /"([^"]{10,})"/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(markdown)) !== null) {
    out.push(m[1]);
    if (out.length >= 4) break;
  }
  return out;
}

export function clampText(text: string, maxLen: number): string {
  if (text.length <= maxLen) return text;
  const cut = text.slice(0, maxLen);
  const lastSpace = cut.lastIndexOf(" ");
  return (lastSpace > 40 ? cut.slice(0, lastSpace) : cut).trimEnd() + "…";
}
