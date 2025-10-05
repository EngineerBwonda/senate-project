"use client";

import React, { useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileAlt,
  faDownload,
  faEye,
  faSearch,
  faFilter,
} from "@fortawesome/free-solid-svg-icons";

import styles from "./report.module.css";

/**
 * Reports page — mobile-first
 * Filter by: Quarterly | Annual | Half-Year
 * Search, view, download actions included (mock data)
 *
 * Install FontAwesome if needed:
 * npm install @fortawesome/react-fontawesome @fortawesome/free-solid-svg-icons
 */

const ALL_REPORTS = [
  {
    id: "r-annual-2024",
    title: "Annual Devolution Report 2024",
    date: "2024-12-15",
    summary:
      "Comprehensive assessment of devolution implementation across counties, fiscal transfers and performance metrics.",
    fileUrl: "/reports/annual-devolution-2024.pdf",
    type: "Annual",
  },
  {
    id: "r-q1-2025",
    title: "Quarterly Report Q1 2025",
    date: "2025-04-10",
    summary: "First quarter update on budget oversight and county performance.",
    fileUrl: "/reports/quarterly-q1-2025.pdf",
    type: "Quarterly",
  },
  {
    id: "r-q2-2025",
    title: "Quarterly Report Q2 2025",
    date: "2025-07-10",
    summary: "Second quarter assessment and recommendations.",
    fileUrl: "/reports/quarterly-q2-2025.pdf",
    type: "Quarterly",
  },
  {
    id: "r-half-2025-h1",
    title: "Half-Year Review — H1 2025",
    date: "2025-07-20",
    summary: "Mid-year review summarizing progress and key indicators.",
    fileUrl: "/reports/half-h1-2025.pdf",
    type: "Half-Year",
  },
  {
    id: "r-sector-2025-health",
    title: "Sectoral Review: Health Services 2025",
    date: "2025-09-01",
    summary:
      "County-level health initiatives review and recommended interventions for improvement.",
    fileUrl: "/reports/sector-health-2025.pdf",
    type: "Annual",
  },
];

const FILTERS = ["All", "Quarterly", "Half-Year", "Annual"];

function ReportCard({ r }) {
  return (
    <article className={styles.card} aria-labelledby={`rep-${r.id}-title`}>
      <div className={styles.top}>
        <div className={styles.iconWrap}>
          <FontAwesomeIcon icon={faFileAlt} className={styles.icon} />
        </div>

        <div className={styles.meta}>
          <h3 id={`rep-${r.id}-title`} className={styles.title}>
            {r.title}
          </h3>
          <div className={styles.small}>
            <span className={styles.date}>
              {new Date(r.date).toLocaleDateString()}
            </span>
            <span className={styles.sep}>•</span>
            <span className={styles.type}>{r.type}</span>
          </div>
        </div>
      </div>

      <p className={styles.summary}>{r.summary}</p>

      <div className={styles.actions}>
        <button
          className={`${styles.btn} ${styles.view}`}
          onClick={() =>
            window.open(r.fileUrl, "_blank", "noopener,noreferrer")
          }
          aria-label={`View ${r.title}`}
        >
          <FontAwesomeIcon icon={faEye} />{" "}
          <span className={styles.btnText}>View</span>
        </button>

        <a
          className={`${styles.btn} ${styles.download}`}
          href={r.fileUrl}
          download
          aria-label={`Download ${r.title}`}
        >
          <FontAwesomeIcon icon={faDownload} />{" "}
          <span className={styles.btnText}>Download</span>
        </a>
      </div>
    </article>
  );
}

export default function ReportsPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ALL_REPORTS.filter((r) => {
      if (activeFilter !== "All" && r.type !== activeFilter) return false;
      if (!q) return true;
      return (
        r.title.toLowerCase().includes(q) ||
        r.summary.toLowerCase().includes(q) ||
        r.type.toLowerCase().includes(q)
      );
    });
  }, [activeFilter, query]);

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.h1}>Senate Liaison Office — Reports</h1>
          <p className={styles.lead}>
            Browse and download official reports. Choose a type to filter
            quickly.
          </p>
        </div>

        <div className={styles.controlsRow}>
          <div className={styles.search}>
            <FontAwesomeIcon icon={faSearch} className={styles.searchIcon} />
            <input
              className={styles.searchInput}
              type="search"
              placeholder="Search reports..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search reports"
            />
            {query && (
              <button
                className={styles.clear}
                onClick={() => setQuery("")}
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          <div className={styles.filterSelect}>
            <FontAwesomeIcon icon={faFilter} className={styles.filterIcon} />
            <select
              className={styles.select}
              value={activeFilter}
              onChange={(e) => setActiveFilter(e.target.value)}
              aria-label="Filter reports by type"
            >
              {FILTERS.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>
          </div>
        </div>

        <nav className={styles.tabs} role="tablist" aria-label="Report types">
          {FILTERS.map((f) => (
            <button
              key={f}
              role="tab"
              aria-selected={activeFilter === f}
              className={`${styles.tab} ${
                activeFilter === f ? styles.activeTab : ""
              }`}
              onClick={() => setActiveFilter(f)}
            >
              {f}
            </button>
          ))}
        </nav>
      </header>

      <section className={styles.grid}>
        {visible.length === 0 ? (
          <div className={styles.empty}>
            No reports match your search / filter.
          </div>
        ) : (
          visible.map((r) => <ReportCard r={r} key={r.id} />)
        )}
      </section>

      <footer className={styles.footer}>
        <small>Reports updated: {new Date().toLocaleDateString()}</small>
      </footer>
    </main>
  );
}
