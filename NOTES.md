# NOTES.md: Hand-built components versus shadcn/ui

> DRAFT. Before submitting, install shadcn/ui, open the generated files
> in `components/ui/`, and confirm or correct every claim below using what
> you actually see. Replace the bracketed parts with your own findings.

## What I built
Three components in React + TypeScript with no component libraries:
a Modal, Tabs, and a Disclosure, each following its W3C APG pattern.
I tested all three using only the keyboard (Tab, Shift+Tab, Escape, arrows, Home, End, Enter, Space).

## What shadcn handled that I missed

1. **Hiding the rest of the page from screen readers.**
   My modal sets `aria-modal="true"` and traps Tab, but some assistive
   technology can still reach the page behind it. shadcn's dialog is built on
   Radix, which marks the outside content as hidden while the dialog is open.

2. **Scroll locking and layered dismissal.**
   I only set `overflow: hidden` on `body`. That causes layout shift when the
   scrollbar disappears, and it breaks with nested overlays. Radix handles
   scrollbar compensation and nested layers, so Escape closes only the top layer.

3. **Accessible description and dev warnings.**
   shadcn provides `DialogTitle` and `DialogDescription`, which wire up
   `aria-labelledby` and `aria-describedby` and warn if they are missing.
   My version only supports a title and nothing warns a developer who forgets it.

4. **Tabs: controlled state, manual activation, orientation, and RTL.**
   Mine supports only automatic activation, horizontal layout, and internal state.
   Radix tabs support `value`/`onValueChange`, `activationMode="manual"`,
   `orientation="vertical"` (Up/Down arrows), and right-to-left direction.

5. **Animation and state hooks.**
   shadcn exposes `data-state="open|closed"` for CSS transitions and keeps
   content mounted long enough to animate out. Mine unmounts instantly.

## What I did that shadcn does not hide from me
[Write your own observation: for example, how much code the focus trap needed
and what that taught you about why a tested primitive is worth using.]

## Takeaway
[One or two sentences in your own words: when you would hand-write a
component versus when you would adopt a tested primitive.]
