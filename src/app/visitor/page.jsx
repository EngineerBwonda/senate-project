// pages/visitors.jsx
"use client";

import React, { useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGlobe,
  faCalendarAlt,
  faEnvelope,
  faPhone,
  faMapMarkerAlt,
  faSearch,
  faFilter,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

import styles from "./visitor.module.css";

/**
 * International Visiting Delegates page
 * - Mobile-first responsive layout
 * - Search + filter by region (Africa, Europe, Americas, Asia, Oceania)
 * - Card list + detail modal/pane
 *
 * Notes:
 * - Place delegate photos in /public/visitors/ (or use remote URLs)
 * - Install FontAwesome if not present:
 *   npm install @fortawesome/react-fontawesome @fortawesome/free-solid-svg-icons
 */

const VISITORS = [
  {
    id: "v-ken-001",
    name: "Hon. Alex Cooper",
    title: "Chair, Security Committee",
    country: "South Africa",
    region: "Africa",
    photo: "/image1.jpg",
    arrival: "2025-10-04",
    departure: "2025-10-09",
    purpose: "Exchange on county governance & fiscal transfers",
    email: "alex@ parliament.za",
    phone: "+27 21 000 0000",
    bio: "Hon. Cooper has led parliamentary oversight on national security and local government issues, with a focus on intergovernmental relations and service delivery.",
    schedule: [
      { date: "2025-10-05", activity: "Briefing with Liaison Office" },
      { date: "2025-10-06", activity: "County visit — Nairobi" },
      { date: "2025-10-08", activity: "Public forum — devolution outcomes" },
    ],
  },
  {
    id: "v-uk-001",
    name: "Lord Marcus Ashby",
    title: "Parliamentary Delegate",
    country: "United Kingdom",
    region: "Europe",
    photo: "/image2.jpg",
    arrival: "2025-10-03",
    departure: "2025-10-07",
    purpose: "Comparative legislative oversight study",
    email: "m.ashby@parliament.uk",
    phone: "+44 20 0000 0000",
    bio: "Lord Ashby chairs the Oversight and Governance Committee, with two decades of experience in legislative review and public policy evaluation.",
    schedule: [
      { date: "2025-10-04", activity: "Roundtable: budget oversight" },
      { date: "2025-10-05", activity: "Visit to county governance projects" },
    ],
  },
  {
    id: "v-us-001",
    name: "Dr. Sofia Martinez",
    title: "Senior Policy Advisor",
    country: "United States",
    region: "Americas",
    photo: "/image3.jpg",
    arrival: "2025-10-10",
    departure: "2025-10-14",
    purpose: "Technical assistance on monitoring & evaluation",
    email: "s.martinez@policyinst.org",
    phone: "+1 202-000-0000",
    bio: "Dr. Martinez specialises in public sector monitoring and performance measurement, and leads programs linking data with policy decisions.",
    schedule: [
      { date: "2025-10-11", activity: "M&E workshop" },
      { date: "2025-10-12", activity: "County data clinic" },
    ],
  },
  // add more delegates as needed...
];

const REGIONS = ["All", "Africa", "Europe", "Americas", "Asia", "Oceania"];

function DelegateCard({ d, onOpen }) {
  return (
    <article className={styles.card} aria-labelledby={`del-${d.id}-name`}>
      <button
        className={styles.thumbBtn}
        onClick={() => onOpen(d)}
        aria-label={`Open details for ${d.name}`}
      >
        <img
          src={d.photo}
          alt={`${d.name} photo`}
          className={styles.photo}
          loading="lazy"
        />
      </button>

      <div className={styles.cardBody}>
        <h3 id={`del-${d.id}-name`} className={styles.name}>
          {d.name}
        </h3>
        <div className={styles.small}>
          <span className={styles.title}>{d.title}</span>
          <span className={styles.sep}>•</span>
          <span className={styles.country}>
            <FontAwesomeIcon icon={faGlobe} /> {d.country}
          </span>
        </div>

        <div className={styles.meta}>
          <div className={styles.purpose}>{d.purpose}</div>
          <div className={styles.range}>
            <FontAwesomeIcon icon={faCalendarAlt} />{" "}
            {new Date(d.arrival).toLocaleDateString()} —{" "}
            {new Date(d.departure).toLocaleDateString()}
          </div>
        </div>

        <div className={styles.cardActions}>
          <button className={styles.btn} onClick={() => onOpen(d)}>
            View
          </button>
          <a className={styles.btnGhost} href={`mailto:${d.email}`}>
            <FontAwesomeIcon icon={faEnvelope} /> Email
          </a>
        </div>
      </div>
    </article>
  );
}

export default function VisitorsPage() {
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState("All");
  const [selected, setSelected] = useState(null);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return VISITORS.filter((v) => {
      if (region !== "All" && v.region !== region) return false;
      if (!q) return true;
      return (
        v.name.toLowerCase().includes(q) ||
        v.title.toLowerCase().includes(q) ||
        v.country.toLowerCase().includes(q) ||
        v.purpose.toLowerCase().includes(q)
      );
    });
  }, [query, region]);

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.h1}>International Visiting Delegates</h1>
          <p className={styles.lead}>
            Current and upcoming official delegations visiting the Senate.
          </p>
        </div>

        <div className={styles.controls}>
          <div className={styles.search}>
            <FontAwesomeIcon icon={faSearch} className={styles.iconSmall} />
            <input
              type="search"
              placeholder="Search name, country, purpose..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className={styles.searchInput}
              aria-label="Search delegates"
            />
          </div>

          <div className={styles.filter}>
            <FontAwesomeIcon icon={faFilter} className={styles.iconSmall} />
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className={styles.select}
            >
              {REGIONS.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>
        </div>
      </header>

      <section className={styles.grid} aria-live="polite">
        {visible.length === 0 ? (
          <div className={styles.empty}>No delegates match your criteria.</div>
        ) : (
          visible.map((d) => (
            <DelegateCard key={d.id} d={d} onOpen={setSelected} />
          ))
        )}
      </section>

      <footer className={styles.footer}>
        <small>Updated: {new Date().toLocaleDateString()}</small>
      </footer>

      {/* Detail modal/pane */}
      {selected && (
        <div
          className={styles.modalBackdrop}
          role="dialog"
          aria-modal="true"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelected(null);
          }}
        >
          <div className={styles.modal}>
            <button
              className={styles.modalClose}
              onClick={() => setSelected(null)}
              aria-label="Close"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>

            <div className={styles.modalHeader}>
              <img
                src={selected.photo}
                alt={`${selected.name} photo`}
                className={styles.modalPhoto}
              />
              <div>
                <h2 className={styles.modalName}>{selected.name}</h2>
                <div className={styles.modalSub}>
                  {selected.title} • {selected.country}
                </div>
                <div className={styles.modalRange}>
                  <FontAwesomeIcon icon={faCalendarAlt} />{" "}
                  {new Date(selected.arrival).toLocaleDateString()} —{" "}
                  {new Date(selected.departure).toLocaleDateString()}
                </div>
              </div>
            </div>

            <div className={styles.modalBody}>
              <h3>Purpose</h3>
              <p>{selected.purpose}</p>

              <h3>Bio</h3>
              <p>{selected.bio}</p>

              <h3>Planned schedule</h3>
              <ul className={styles.schedule}>
                {selected.schedule.map((s, i) => (
                  <li key={i}>
                    <strong>{new Date(s.date).toLocaleDateString()}</strong> —{" "}
                    {s.activity}
                  </li>
                ))}
              </ul>

              <h3>Contact</h3>
              <p>
                <FontAwesomeIcon icon={faEnvelope} />{" "}
                <a href={`mailto:${selected.email}`}>{selected.email}</a>
              </p>
              <p>
                <FontAwesomeIcon icon={faPhone} /> {selected.phone}
              </p>
              <p>
                <FontAwesomeIcon icon={faMapMarkerAlt} /> {selected.country}
              </p>
            </div>

            <div className={styles.modalActions}>
              <a className={styles.btn} href={`mailto:${selected.email}`}>
                <FontAwesomeIcon icon={faEnvelope} /> Email
              </a>
              <button
                className={styles.btnGhost}
                onClick={() => alert("Add to calendar (placeholder)")}
              >
                Add to calendar
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
