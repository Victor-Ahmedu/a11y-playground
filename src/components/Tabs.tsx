import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";

export interface TabItem {
  id: string;
  label: string;
  content: ReactNode;
}

interface TabsProps {
  tabs: TabItem[];
  label: string; // accessible name for the tablist
}

/**
 * Tabs following the WAI-ARIA APG "Tabs" pattern (automatic activation).
 *  - role="tablist" > role="tab" buttons, role="tabpanel" panels
 *  - aria-selected, aria-controls, aria-labelledby wire tabs to panels
 *  - Roving tabindex: only the active tab is in the Tab order
 *  - ArrowLeft/ArrowRight move (and wrap), Home/End jump to first/last
 *  - Tab from the tablist moves into the active panel
 */
export function Tabs({ tabs, label }: TabsProps) {
  const baseId = useId();
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  function activate(index: number) {
    setActiveIndex(index);
    tabRefs.current[index]?.focus();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const count = tabs.length;
    let next: number | null = null;

    switch (event.key) {
      case "ArrowRight":
        next = (activeIndex + 1) % count;
        break;
      case "ArrowLeft":
        next = (activeIndex - 1 + count) % count;
        break;
      case "Home":
        next = 0;
        break;
      case "End":
        next = count - 1;
        break;
      default:
        return;
    }

    event.preventDefault();
    activate(next);
  }

  return (
    <div className="tabs">
      <div role="tablist" aria-label={label} onKeyDown={handleKeyDown}>
        {tabs.map((tab, index) => {
          const selected = index === activeIndex;
          return (
            <button
              key={tab.id}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              type="button"
              role="tab"
              id={`${baseId}-tab-${tab.id}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${tab.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => activate(index)}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {tabs.map((tab, index) => (
        <div
          key={tab.id}
          role="tabpanel"
          id={`${baseId}-panel-${tab.id}`}
          aria-labelledby={`${baseId}-tab-${tab.id}`}
          hidden={index !== activeIndex}
          tabIndex={0}
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
}
