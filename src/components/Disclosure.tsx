import { useId, useState, type ReactNode } from "react";

interface DisclosureProps {
  summary: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

/**
 * Disclosure following the WAI-ARIA APG "Disclosure" pattern.
 *  - A real <button> (Enter and Space work for free)
 *  - aria-expanded reflects state, aria-controls points at the content
 *  - The `hidden` attribute removes collapsed content from the
 *    accessibility tree and the Tab order
 */
export function Disclosure({ summary, children, defaultOpen = false }: DisclosureProps) {
  const contentId = useId();
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="disclosure">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={contentId}
        onClick={() => setOpen((value) => !value)}
      >
        <span aria-hidden="true">{open ? "▾" : "▸"}</span> {summary}
      </button>
      <div id={contentId} hidden={!open}>
        {children}
      </div>
    </div>
  );
}
