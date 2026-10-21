# Accessible Components Playground

Three interactive React and TypeScript components built from scratch, with no component libraries. Each one follows its pattern in the W3C WAI-ARIA Authoring Practices Guide (APG). The project also includes a written comparison against shadcn/ui.

## Components

| Component | File | APG pattern |
|---|---|---|
| Modal dialog | `src/components/Modal.tsx` | Dialog (Modal) |
| Tabs | `src/components/Tabs.tsx` | Tabs (automatic activation) |
| Disclosure | `src/components/Disclosure.tsx` | Disclosure |

## Getting started

Requirements: Node.js 18 or later.

```bash
npm install
npm run dev
```

Open the local address that Vite prints, usually `http://localhost:5173`. The demo page in `src/App.tsx` shows all three components.

To check types:

```bash
npm run typecheck
```

## Keyboard behavior

**Modal**
- Focus moves into the dialog when it opens.
- Tab and Shift+Tab cycle inside the dialog and never reach the page behind it.
- Escape closes the dialog.
- Focus returns to the button that opened it.

**Tabs**
- Left and Right arrows move between tabs and wrap at the ends.
- Home and End jump to the first and last tab.
- Only the active tab is in the Tab order (roving tabindex).
- Tab from the tab list moves focus into the active panel.

**Disclosure**
- Enter and Space toggle the content.
- Collapsed content is removed from the Tab order and the accessibility tree.

## Accessibility implementation

- Correct roles and relationships: `dialog`, `tablist`, `tab`, `tabpanel`, `aria-modal`, `aria-labelledby`, `aria-selected`, `aria-controls`, and `aria-expanded`.
- Unique ids are generated with `useId`, so several instances can exist on one page.
- Focus management is handled explicitly in the modal through a focus trap and focus restoration.
- Visible focus styles use `:focus-visible`.
- All component props use explicit TypeScript interfaces, with no `any` escapes.

## Comparison with shadcn/ui

`NOTES.md` lists the concrete gaps between these hand-built components and the shadcn/ui dialog and tabs. Topics include hiding background content from screen readers, scroll locking, nested layers, and extra tab options.

## Known limitations

- The modal does not hide the background content from screen readers, and it does not support nested modals.
- Tabs support only horizontal layout and automatic activation.
- There are no enter or exit animations.

## Project structure

```
src/
  components/
    Modal.tsx
    Tabs.tsx
    Disclosure.tsx
  App.tsx
  main.tsx
  index.css
NOTES.md
```
