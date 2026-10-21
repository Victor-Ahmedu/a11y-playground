import { useState } from "react";
import { Modal } from "./components/Modal";
import { Tabs } from "./components/Tabs";
import { Disclosure } from "./components/Disclosure";

export function App() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <main>
      <h1>Accessible Components Playground</h1>

      <section>
        <h2>Modal</h2>
        <button type="button" onClick={() => setModalOpen(true)}>
          Open modal
        </button>
        <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Confirm action">
          <p>Press Tab to cycle focus. Press Escape to close.</p>
          <input type="text" aria-label="Your name" placeholder="Your name" />
          <div className="actions">
            <button type="button" onClick={() => setModalOpen(false)}>
              Cancel
            </button>
            <button type="button" onClick={() => setModalOpen(false)}>
              Confirm
            </button>
          </div>
        </Modal>
      </section>

      <section>
        <h2>Tabs</h2>
        <Tabs
          label="Project sections"
          tabs={[
            { id: "overview", label: "Overview", content: <p>Overview content.</p> },
            { id: "details", label: "Details", content: <p>Details content.</p> },
            { id: "history", label: "History", content: <p>History content.</p> },
          ]}
        />
      </section>

      <section>
        <h2>Disclosure</h2>
        <Disclosure summary="Show more information">
          <p>This content is hidden until the button is activated.</p>
        </Disclosure>
      </section>
    </main>
  );
}
