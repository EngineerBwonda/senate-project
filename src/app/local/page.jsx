// pages/local-delegation.jsx
"use client";

import React, { useMemo, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSchool,
  faUserCheck,
  faUserTie,
  faUsers,
  faSearch,
  faDownload,
  faTimes,
  faCalendarAlt,
  faMapMarkerAlt,
  faFileCsv,
} from "@fortawesome/free-solid-svg-icons";

import styles from "./local.module.css";

/**
 * Local Visiting Delegation monitoring page
 * - Mobile-first, industrial white + blue theme
 * - Tabs: Schools | Attachees & Interns | Groups | Volunteers
 * - Mock data included: 5 schools, 6 attachés, 6 interns, 5 groups, volunteers
 * - Actions: Search, filter, view details, toggle check-in, export visible list to CSV
 */

// ---------- MOCK DATA ----------

const SCHOOLS = [
  {
    id: "s1",
    name: "Nairobi High School",
    county: "Nairobi",
    contact: "head@nairobihs.sch",
    visits: 3,
  },
  {
    id: "s2",
    name: "Kisumu Girls' Academy",
    county: "Kisumu",
    contact: "principal@kgacademy.sch",
    visits: 2,
  },
  {
    id: "s3",
    name: "Mombasa Technical Institute",
    county: "Mombasa",
    contact: "admin@mti.ac.ke",
    visits: 4,
  },
  {
    id: "s4",
    name: "Eldoret Preparatory",
    county: "Uasin Gishu",
    contact: "info@eldoretprep.sch",
    visits: 1,
  },
  {
    id: "s5",
    name: "Nyeri County Secondary",
    county: "Nyeri",
    contact: "office@nyeri-sec.sch",
    visits: 2,
  },
];

const ATTACHEES = [
  {
    id: "a1",
    name: "Grace Wanjiru",
    department: "Policy & Research",
    expiry: "2025-12-20",
    school: "Nairobi High School",
    checkedIn: false,
  },
  {
    id: "a2",
    name: "John Mwangi",
    department: "Communications",
    expiry: "2025-11-30",
    school: "Kisumu Girls' Academy",
    checkedIn: false,
  },
  {
    id: "a3",
    name: "Mary Atieno",
    department: "Finance",
    expiry: "2026-01-15",
    school: "Mombasa Technical Institute",
    checkedIn: false,
  },
  {
    id: "a4",
    name: "Samuel Kariuki",
    department: "Monitoring & Evaluation",
    expiry: "2025-10-31",
    school: "Eldoret Preparatory",
    checkedIn: false,
  },
  {
    id: "a5",
    name: "Fatima Noor",
    department: "Legal",
    expiry: "2026-02-28",
    school: "Nyeri County Secondary",
    checkedIn: false,
  },
  {
    id: "a6",
    name: "Peter Otieno",
    department: "IT & Data",
    expiry: "2025-12-05",
    school: "Nairobi High School",
    checkedIn: false,
  },
];

const INTERNS = [
  {
    id: "i1",
    name: "Alice Njeri",
    department: "Communications",
    expiry: "2025-11-15",
    school: "Nairobi High School",
    checkedIn: false,
  },
  {
    id: "i2",
    name: "Brian Ouma",
    department: "Logistics",
    expiry: "2025-12-01",
    school: "Kisumu Girls' Academy",
    checkedIn: false,
  },
  {
    id: "i3",
    name: "Catherine B.",
    department: "Research",
    expiry: "2026-03-10",
    school: "Mombasa Technical Institute",
    checkedIn: false,
  },
  {
    id: "i4",
    name: "David Kimani",
    department: "Admin",
    expiry: "2025-10-25",
    school: "Eldoret Preparatory",
    checkedIn: false,
  },
  {
    id: "i5",
    name: "Evelyn W.",
    department: "Finance",
    expiry: "2026-01-05",
    school: "Nyeri County Secondary",
    checkedIn: false,
  },
  {
    id: "i6",
    name: "Frankline S.",
    department: "IT",
    expiry: "2026-02-20",
    school: "Nairobi High School",
    checkedIn: false,
  },
];

const GROUPS = [
  {
    id: "g1",
    name: "County Youth Coalition",
    leader: "Ms. A. Karanja",
    contact: "youth@coalition.org",
    purpose: "Youth empowerment and civic engagement",
  },
  {
    id: "g2",
    name: "Farmers' Cooperative Network",
    leader: "Mr. J. Odhiambo",
    contact: "contact@fcnet.org",
    purpose: "Agriculture best practices and policy briefs",
  },
  {
    id: "g3",
    name: "Women in Devolution",
    leader: "Ms. Z. Kamau",
    contact: "women@devolution.org",
    purpose: "Gender lens in county governance",
  },
  {
    id: "g4",
    name: "County Health Alliance",
    leader: "Dr. M. Ouma",
    contact: "health@alliance.org",
    purpose: "Public health advocacy and review",
  },
  {
    id: "g5",
    name: "Local Business Association",
    leader: "Mr. P. Njoroge",
    contact: "business@lba.org",
    purpose: "SME engagement and local economy",
  },
];

const VOLUNTEERS = [
  {
    id: "v1",
    name: "Angela M.",
    role: "Event Support",
    phone: "+254700000001",
    assigned: "Nairobi High School",
  },
  {
    id: "v2",
    name: "Brian K.",
    role: "Logistics",
    phone: "+254700000002",
    assigned: "Kisumu Girls' Academy",
  },
  {
    id: "v3",
    name: "Cynthia R.",
    role: "Registration",
    phone: "+254700000003",
    assigned: "Mombasa Technical Institute",
  },
  {
    id: "v4",
    name: "Dennis N.",
    role: "Security Liaison",
    phone: "+254700000004",
    assigned: "Eldoret Preparatory",
  },
  {
    id: "v5",
    name: "Esther W.",
    role: "Media",
    phone: "+254700000005",
    assigned: "Nyeri County Secondary",
  },
  {
    id: "v6",
    name: "Francis O.",
    role: "Transport",
    phone: "+254700000006",
    assigned: "Nairobi High School",
  },
];

// ---------- HELPER UTILITIES ----------

function exportToCsv(filename, rows) {
  if (!rows || !rows.length) return;
  const keys = Object.keys(rows[0]);
  const csv = [keys.join(",")]
    .concat(
      rows.map((r) =>
        keys
          .map((k) => {
            const cell =
              r[k] === null || r[k] === undefined
                ? ""
                : `${r[k]}`.replace(/"/g, '""');
            return `"${cell}"`;
          })
          .join(",")
      )
    )
    .join("\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

// ---------- COMPONENTS ----------

function SmallHeader({ title, subtitle, onExport, exportLabel }) {
  return (
    <div className={styles.header}>
      <div>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.subtitle}>{subtitle}</p>
      </div>
      <div className={styles.headerActions}>
        <button
          className={styles.iconBtn}
          onClick={onExport}
          aria-label={exportLabel}
        >
          <FontAwesomeIcon icon={faFileCsv} />{" "}
          <span className={styles.iconLabel}>{exportLabel}</span>
        </button>
      </div>
    </div>
  );
}

function SchoolCard({ s }) {
  return (
    <article className={styles.card}>
      <div className={styles.cardLeft}>
        <div className={styles.iconWrap}>
          <FontAwesomeIcon icon={faSchool} />
        </div>
      </div>

      <div className={styles.cardBody}>
        <h3 className={styles.cardTitle}>{s.name}</h3>
        <div className={styles.cardMeta}>
          <span>{s.county}</span>
          <span className={styles.sep}>•</span>
          <span>{s.visits} visits</span>
        </div>
        <div className={styles.cardContact}>{s.contact}</div>
      </div>
    </article>
  );
}

function PersonRow({ p, onToggle }) {
  return (
    <li className={styles.personRow}>
      <div className={styles.personInfo}>
        <div className={styles.personName}>{p.name}</div>
        <div className={styles.personMeta}>
          <span>{p.department}</span>
          <span className={styles.sep}>•</span>
          <time>{new Date(p.expiry).toLocaleDateString()}</time>
        </div>
        <div className={styles.personSub}>{p.school}</div>
      </div>

      <div className={styles.personActions}>
        <button className={styles.checkBtn} onClick={() => onToggle(p.id)}>
          <FontAwesomeIcon icon={p.checkedIn ? faUserCheck : faUserTie} />
          <span className={styles.checkLabel}>
            {p.checkedIn ? "Checked-in" : "Check in"}
          </span>
        </button>
      </div>
    </li>
  );
}

// ---------- MAIN PAGE ----------

export default function LocalDelegationPage() {
  const [tab, setTab] = useState("schools"); // schools | attachments | interns | groups | volunteers
  const [query, setQuery] = useState("");
  const [attachList, setAttachList] = useState(ATTACHEES);
  const [internList, setInternList] = useState(INTERNS);
  const [selectedPerson, setSelectedPerson] = useState(null);

  useEffect(() => {
    // cleanup on unmount: ensure no body lock
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Combined list used when viewing attach/interns together
  const combined = useMemo(() => {
    return [
      ...attachList.map((a) => ({ ...a, role: "Attachment" })),
      ...internList.map((i) => ({ ...i, role: "Internship" })),
    ];
  }, [attachList, internList]);

  const visiblePersons = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return combined;
    return combined.filter((p) =>
      (p.name + p.department + p.school + (p.role || ""))
        .toLowerCase()
        .includes(q)
    );
  }, [combined, query]);

  function toggleCheckedIn(id) {
    setAttachList((prev) =>
      prev.map((p) => (p.id === id ? { ...p, checkedIn: !p.checkedIn } : p))
    );
    setInternList((prev) =>
      prev.map((p) => (p.id === id ? { ...p, checkedIn: !p.checkedIn } : p))
    );
  }

  function handleExportVisible() {
    if (tab === "schools") {
      exportToCsv("schools.csv", SCHOOLS);
    } else if (tab === "groups") {
      exportToCsv("groups.csv", GROUPS);
    } else if (tab === "volunteers") {
      exportToCsv("volunteers.csv", VOLUNTEERS);
    } else {
      // attachments and interns combined
      exportToCsv(
        "members.csv",
        combined.map(({ id, name, department, expiry, school, role }) => ({
          id,
          name,
          department,
          expiry,
          school,
          role,
        }))
      );
    }
  }

  return (
    <main className={styles.page}>
      <SmallHeader
        title="Local Visiting Delegation — Monitoring"
        subtitle="Schools, attachments & interns, organised groups and volunteers"
        onExport={handleExportVisible}
        exportLabel="Export CSV"
      />

      <div className={styles.tabBar} role="tablist" aria-label="Main sections">
        <button
          className={tab === "schools" ? styles.tabActive : styles.tab}
          onClick={() => setTab("schools")}
        >
          Schools
        </button>
        <button
          className={tab === "attachments" ? styles.tabActive : styles.tab}
          onClick={() => setTab("attachments")}
        >
          Attachees
        </button>
        <button
          className={tab === "interns" ? styles.tabActive : styles.tab}
          onClick={() => setTab("interns")}
        >
          Interns
        </button>
        <button
          className={tab === "groups" ? styles.tabActive : styles.tab}
          onClick={() => setTab("groups")}
        >
          Groups
        </button>
        <button
          className={tab === "volunteers" ? styles.tabActive : styles.tab}
          onClick={() => setTab("volunteers")}
        >
          Volunteers
        </button>
      </div>

      <section className={styles.section}>
        {/* Search bar for attachments / interns */}
        {(tab === "attachments" || tab === "interns") && (
          <div className={styles.controls}>
            <div className={styles.search}>
              <FontAwesomeIcon icon={faSearch} className={styles.searchIcon} />
              <input
                className={styles.searchInput}
                placeholder="Search name, department, school..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Search members"
              />
              {query && (
                <button
                  className={styles.clearBtn}
                  onClick={() => setQuery("")}
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        )}

        {/* SCHOOLS */}
        {tab === "schools" && (
          <div className={styles.grid}>
            {SCHOOLS.map((s) => (
              <SchoolCard key={s.id} s={s} />
            ))}
          </div>
        )}

        {/* ATTACHEES */}
        {tab === "attachments" && (
          <>
            <h2 className={styles.subTitle}>Current Attachments</h2>
            <ul className={styles.personList}>
              {attachList.map((p) => (
                <PersonRow key={p.id} p={p} onToggle={toggleCheckedIn} />
              ))}
            </ul>
          </>
        )}

        {/* INTERNS */}
        {tab === "interns" && (
          <>
            <h2 className={styles.subTitle}>Current Interns</h2>
            <ul className={styles.personList}>
              {internList.map((p) => (
                <PersonRow key={p.id} p={p} onToggle={toggleCheckedIn} />
              ))}
            </ul>
          </>
        )}

        {/* GROUPS */}
        {tab === "groups" && (
          <>
            <h2 className={styles.subTitle}>Organised Groups</h2>
            <div className={styles.groupGrid}>
              {GROUPS.map((g) => (
                <article key={g.id} className={styles.groupCard}>
                  <h3 className={styles.groupTitle}>{g.name}</h3>
                  <div className={styles.groupMeta}>
                    <strong>Leader:</strong> {g.leader}
                  </div>
                  <div className={styles.groupMeta}>
                    <strong>Contact:</strong> {g.contact}
                  </div>
                  <div className={styles.groupPurpose}>{g.purpose}</div>
                </article>
              ))}
            </div>
          </>
        )}

        {/* VOLUNTEERS */}
        {tab === "volunteers" && (
          <>
            <h2 className={styles.subTitle}>Volunteers</h2>
            <ul className={styles.volList}>
              {VOLUNTEERS.map((v) => (
                <li key={v.id} className={styles.volItem}>
                  <div>
                    <div className={styles.volName}>{v.name}</div>
                    <div className={styles.volMeta}>
                      {v.role} • assigned: {v.assigned}
                    </div>
                  </div>
                  <div className={styles.volContact}>{v.phone}</div>
                </li>
              ))}
            </ul>
          </>
        )}
      </section>

      <footer className={styles.footer}>
        <small>
          Senate Liaison Office — Local delegation monitoring • updated{" "}
          {new Date().toLocaleDateString()}
        </small>
      </footer>

      {/* Person details drawer/modal */}
      {selectedPerson && (
        <div
          className={styles.modalBackdrop}
          onClick={() => setSelectedPerson(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className={styles.modalCard}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={styles.modalClose}
              onClick={() => setSelectedPerson(null)}
              aria-label="Close details"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
            <h3>{selectedPerson.name}</h3>
            <div className={styles.modalRow}>
              <strong>Department:</strong> {selectedPerson.department}
            </div>
            <div className={styles.modalRow}>
              <strong>School:</strong> {selectedPerson.school}
            </div>
            <div className={styles.modalRow}>
              <strong>Expiry:</strong> <FontAwesomeIcon icon={faCalendarAlt} />{" "}
              {new Date(selectedPerson.expiry).toLocaleDateString()}
            </div>
            <div className={styles.modalActions}>
              <button
                className={styles.btn}
                onClick={() => {
                  alert("Send message (placeholder)");
                }}
              >
                Message
              </button>
              <button
                className={styles.btnGhost}
                onClick={() => {
                  alert("Open paperwork (placeholder)");
                }}
              >
                Open files
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
