// pages/upcoming-events.jsx

"use client";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faClock,
  faMapMarkerAlt,
  faUsers,
  faFileLines,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";

import styles from "./calendar.module.css";

/**
 * Upcoming events demo for Senate Liaison Office.
 * - Mobile-first responsive layout
 * - Icons (Font Awesome)
 * - Industrial white + blue aesthetic via CSS module
 *
 * NOTE: install FontAwesome packages if you haven't:
 *   npm install @fortawesome/react-fontawesome @fortawesome/free-solid-svg-icons
 *
 * Drop this into pages/ and the CSS module into styles/
 */

const EVENTS = [
  {
    id: 1,
    title: "County Stakeholder Forum",
    date: "2025-10-07",
    time: "09:00",
    location: "Nairobi County Hall",
    type: "Public",
    icon: faUsers,
    note: "Open floor for county devolution updates and Q&A.",
  },
  {
    id: 2,
    title: "Senate Briefing: Budget 2026",
    date: "2025-10-11",
    time: "14:30",
    location: "Senate Committee Room A",
    type: "Internal",
    icon: faFileLines,
    note: "Closed session for committee members and invited partners.",
  },
  {
    id: 3,
    title: "Digital Outreach Webinar",
    date: "2025-10-15",
    time: "11:00",
    location: "Online — Zoom",
    type: "Online",
    icon: faVideo,
    note: "Webinar on citizen engagement and digital platforms.",
  },
  {
    id: 4,
    title: "Site Visit: Devolution Project",
    date: "2025-10-20",
    time: "07:30",
    location: "Kisumu — Project Site B",
    type: "Field Visit",
    icon: faMapMarkerAlt,
    note: "On-site progress review; PPE required.",
  },
  {
    id: 5,
    title: "Morning Brief — Liaison Office",
    date: "2025-10-23",
    time: "08:00",
    location: "Liaison Office Boardroom",
    type: "Internal",
    icon: faClock,
    note: "Daily operations briefing and tasking.",
  },
];

function EventCard({ ev }) {
  return (
    <article className={styles.card} aria-labelledby={`ev-${ev.id}-title`}>
      <div className={styles.cardHeader}>
        <div className={styles.iconWrap}>
          <FontAwesomeIcon icon={ev.icon} className={styles.icon} />
        </div>

        <div className={styles.meta}>
          <h3 id={`ev-${ev.id}-title`} className={styles.title}>
            {ev.title}
          </h3>
          <div className={styles.sub}>
            <time className={styles.time} dateTime={`${ev.date}T${ev.time}`}>
              <FontAwesomeIcon icon={faCalendarAlt} />{" "}
              {new Date(ev.date).toLocaleDateString(undefined, {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
              {" • "} {ev.time}
            </time>
            <div className={styles.location}>
              <FontAwesomeIcon icon={faMapMarkerAlt} /> {ev.location}
            </div>
          </div>
        </div>
      </div>

      <p className={styles.note}>{ev.note}</p>

      <div className={styles.actions}>
        {/* <button
          className={`${styles.btn} ${styles.primary}`}
          onClick={() => {
            // Example action: open details — replace with modal or router push
            window.alert(`Open details for: ${ev.title}`);
          }}
        >
          View details
        </button> */}
        {/* <button
          className={`${styles.btn} ${styles.ghost}`}
          onClick={() => {
            // Example secondary action (add to calendar)
            window.alert(`Add to calendar: ${ev.title}`);
          }}
        >
          Add to calendar
        </button> */}
      </div>
    </article>
  );
}

export default function UpcomingEventsPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.h1}>Senate Liaison Office — Upcoming Events</h1>
          <p className={styles.lead}>
            Upcoming meetings, briefings and public outreach — stay prepared.
          </p>
        </div>
        {/* <div className={styles.headerRight}>
          <div className={styles.tag}>Public</div>
          <div className={styles.tagSecondary}>Internal</div>
        </div> */}
      </header>

      <section className={styles.grid}>
        {EVENTS.map((ev) => (
          <EventCard ev={ev} key={ev.id} />
        ))}
      </section>

      <footer className={styles.footer}>
        <small>
          Senate Liaison Office • Updated {new Date().toLocaleDateString()}
        </small>
      </footer>
    </main>
  );
}
