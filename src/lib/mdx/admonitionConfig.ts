export const ADMONITION_CONFIG: Record<
  string,
  { label: string; border: string; icon: string; bg: string }
> = {
  tip: { label: "Tip", border: "border-brand", icon: "text-brand", bg: "bg-brand/5" },
  info: { label: "Info", border: "border-brand", icon: "text-brand", bg: "bg-brand/5" },
  note: { label: "Note", border: "border-brand", icon: "text-brand", bg: "bg-brand/5" },
  warning: { label: "Warning", border: "border-accent", icon: "text-accent", bg: "bg-accent/5" },
  caution: { label: "Caution", border: "border-accent", icon: "text-accent", bg: "bg-accent/5" },
  danger: { label: "Danger", border: "border-red-500/70", icon: "text-red-400", bg: "bg-red-500/5" },
};

export function convertAdmonitionJsx(source: string): string {
  return source
    .replace(
      /<Admonition\s+type="(\w+)"(?:\s+title="([^"]*)")?>/g,
      (_, type: string, title?: string) => {
        const cfg = ADMONITION_CONFIG[type] ?? ADMONITION_CONFIG.info;
        const label = title || cfg.label;
        return (
          `<div class="my-6 rounded-r-md border-l-4 px-4 py-3 not-prose ${cfg.border} ${cfg.bg}">` +
          `<div class="mb-1 font-sans text-xs font-semibold uppercase tracking-widest ${cfg.icon}">${label}</div>` +
          `<div class="text-sm text-muted [&>p]:mb-1 [&>p:last-child]:mb-0">`
        );
      }
    )
    .replace(/<\/Admonition>/g, "</div></div>");
}
