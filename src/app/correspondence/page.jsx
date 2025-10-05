// pages/correspondence.jsx
"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInbox,
  faEnvelopeOpenText,
  faDownload,
  faReply,
  faShare,
  faUserTie,
  faGlobe,
} from "@fortawesome/free-solid-svg-icons";

import styles from "./correspondence.module.css";

/**
 * Correspondence page:
 * - First choose Internal or External
 * - Shows lists and content for each
 * - Mock content provided
 */

const INTERNAL = [
  {
    id: "i-001",
    subject: "Inter-office memo: Liaison duties Q4",
    date: "2025-09-05",
    from: "Chief Liaison Officer",
    to: "Operations Team",
    body: "Team — Please prepare the devolution briefing packs for county visits scheduled in October. Ensure all attachments are compiled and cleared by legal.",
    file: "/correspondence/internal-memo-q4.pdf",
  },
  {
    id: "i-002",
    subject: "Staff circular: Security protocols",
    date: "2025-08-18",
    from: "Administrative Head",
    to: "All Staff",
    body: "All staff are reminded to wear official badges while on site visits. Any anomalies should be reported to the security desk immediately.",
    file: "/correspondence/security-circular-2025.pdf",
  },
  {
    id: "i-003",
    subject: "Staff circular: Security protocols",
    date: "2025-08-18",
    from: "Administrative Head",
    to: "All Staff",
    body: "All staff are reminded to wear official badges while on site visits. Any anomalies should be reported to the security desk immediately.",
    file: "/correspondence/security-circular-2025.pdf",
  },
  {
    id: "i-004",
    subject: "Staff circular: Security protocols",
    date: "2025-08-18",
    from: "Administrative Head",
    to: "All Staff",
    body: "All staff are reminded to wear official badges while on site visits. Any anomalies should be reported to the security desk immediately.",
    file: "/correspondence/security-circular-2025.pdf",
  },
  {
    id: "i-005",
    subject: "Staff circular: Security protocols",
    date: "2025-08-18",
    from: "Administrative Head",
    to: "All Staff",
    body: "All staff are reminded to wear official badges while on site visits. Any anomalies should be reported to the security desk immediately.",
    file: "/correspondence/security-circular-2025.pdf",
  },
];

const EXTERNAL = [
  {
    id: "e-001",
    subject: "Invitation: County Stakeholder Forum",
    date: "2025-09-20",
    from: "Kisumu County Secretary",
    to: "Senate Liaison Office",
    body: "You are cordially invited to attend the County Stakeholder Forum on October 7. The agenda includes updates on devolved projects and citizen engagement sessions.",
    file: "/correspondence/invitation-kisumu.pdf",
  },
  {
    id: "e-002",
    subject: "Citizen petition: Water access improvements",
    date: "2025-09-12",
    from: "Residents Association — Ward 6",
    to: "Senate Liaison Office",
    body: "We submit this petition requesting urgent attention to water supply interruptions affecting multiple villages. Please advise on next steps.",
    file: "/correspondence/petition-water-ward6.pdf",
  },
  {
    id: "e-003",
    subject: "Invitation: County Stakeholder Forum",
    date: "2025-09-20",
    from: "Kisumu County Secretary",
    to: "Senate Liaison Office",
    body: "You are cordially invited to attend the County Stakeholder Forum on October 7. The agenda includes updates on devolved projects and citizen engagement sessions.",
    file: "/correspondence/invitation-kisumu.pdf",
  },
  {
    id: "e-004",
    subject: "Citizen petition: Water access improvements",
    date: "2025-09-12",
    from: "Residents Association — Ward 6",
    to: "Senate Liaison Office",
    body: "We submit this petition requesting urgent attention to water supply interruptions affecting multiple villages. Please advise on next steps.",
    file: "/correspondence/petition-water-ward6.pdf",
  },
  {
    id: "e-005",
    subject: "Invitation: County Stakeholder Forum",
    date: "2025-09-20",
    from: "Kisumu County Secretary",
    to: "Senate Liaison Office",
    body: "You are cordially invited to attend the County Stakeholder Forum on October 7. The agenda includes updates on devolved projects and citizen engagement sessions.",
    file: "/correspondence/invitation-kisumu.pdf",
  },
  {
    id: "e-006",
    subject: "Citizen petition: Water access improvements",
    date: "2025-09-12",
    from: "Residents Association — Ward 6",
    to: "Senate Liaison Office",
    body: "We submit this petition requesting urgent attention to water supply interruptions affecting multiple villages. Please advise on next steps.",
    file: "/correspondence/petition-water-ward6.pdf",
  },
];

function ChoiceCard({ label, icon, onChoose, desc, variant }) {
  return (
    <button
      className={`${styles.choice} ${
        variant === "internal" ? styles.int : styles.ext
      }`}
      onClick={onChoose}
      aria-label={label}
    >
      <div className={styles.choiceIcon}>
        <FontAwesomeIcon icon={icon} />
      </div>
      <div className={styles.choiceText}>
        <strong>{label}</strong>
        <div className={styles.choiceDesc}>{desc}</div>
      </div>
    </button>
  );
}

function MessageList({ items, onOpen }) {
  if (!items.length)
    return (
      <div className={styles.empty}>No correspondence in this folder.</div>
    );

  return (
    <ul className={styles.list}>
      {items.map((m) => (
        <li key={m.id} className={styles.listItem}>
          <div className={styles.left}>
            <div className={styles.msgMeta}>
              <div className={styles.subject}>{m.subject}</div>
              <div className={styles.small}>
                <span>{m.from}</span>
                <span className={styles.sep}>•</span>
                <time>{new Date(m.date).toLocaleDateString()}</time>
              </div>
            </div>
          </div>

          <div className={styles.actions}>
            <button className={styles.iconBtn} onClick={() => onOpen(m)}>
              <FontAwesomeIcon icon={faInbox} />{" "}
              <span className={styles.iconLabel}>Open</span>
            </button>
            <a className={styles.iconBtn} href={m.file} download>
              <FontAwesomeIcon icon={faDownload} />{" "}
              <span className={styles.iconLabel}>Download</span>
            </a>
          </div>
        </li>
      ))}
    </ul>
  );
}

function MessageView({ message, onClose }) {
  if (!message) return null;
  return (
    <div className={styles.viewer}>
      <div className={styles.viewerHeader}>
        <div>
          <h3 className={styles.viewTitle}>{message.subject}</h3>
          <div className={styles.small}>
            <strong>{message.from}</strong>
            <span className={styles.sep}>•</span>
            <time>{new Date(message.date).toLocaleDateString()}</time>
          </div>
        </div>

        <div className={styles.viewerActions}>
          <button
            className={styles.btn}
            onClick={() => alert("Reply (placeholder)")}
          >
            <FontAwesomeIcon icon={faReply} /> Reply
          </button>
          <button
            className={styles.btn}
            onClick={() => alert("Forward (placeholder)")}
          >
            <FontAwesomeIcon icon={faShare} /> Forward
          </button>
          <button
            className={styles.btn}
            onClick={() => (window.location.href = message.file)}
          >
            <FontAwesomeIcon icon={faDownload} /> Download
          </button>
        </div>
      </div>

      <div className={styles.viewBody}>
        <p>{message.body}</p>
      </div>

      <div className={styles.viewerFooter}>
        <button className={styles.btnGhost} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

export default function CorrespondencePage() {
  const [mode, setMode] = useState(null); // 'internal' | 'external'
  const [selected, setSelected] = useState(null);

  const items =
    mode === "internal" ? INTERNAL : mode === "external" ? EXTERNAL : [];

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.h1}>Correspondence</h1>
        <p className={styles.lead}>
          Select Internal or External correspondence to proceed.
        </p>
      </header>

      {!mode ? (
        <section className={styles.choices}>
          <ChoiceCard
            label="Internal Correspondence"
            desc="Memos, circulars and internal requests"
            icon={faUserTie}
            variant="internal"
            onChoose={() => setMode("internal")}
          />
          <ChoiceCard
            label="External Correspondence"
            desc="Invitations, petitions, official letters"
            icon={faGlobe}
            variant="external"
            onChoose={() => setMode("external")}
          />
        </section>
      ) : (
        <section className={styles.content}>
          <div className={styles.leftCol}>
            <div className={styles.toolbar}>
              <button
                className={styles.back}
                onClick={() => {
                  setMode(null);
                  setSelected(null);
                }}
              >
                ← Back
              </button>
              <div className={styles.folderLabel}>
                {mode === "internal" ? "Internal" : "External"} Correspondence
              </div>
            </div>

            <MessageList items={items} onOpen={(m) => setSelected(m)} />
          </div>

          <aside className={styles.rightCol}>
            {selected ? (
              <MessageView
                message={selected}
                onClose={() => setSelected(null)}
              />
            ) : (
              <div className={styles.placeholder}>
                {/* <div className={styles.placeholderIcon}>
                  <FontAwesomeIcon icon={faEnvelopeOpenText} size="2x" />
                </div> */}
                {/* <div>Select a message to read its content.</div> */}
              </div>
            )}
          </aside>
        </section>
      )}
    </main>
  );
}
