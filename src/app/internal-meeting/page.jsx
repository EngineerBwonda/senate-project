// pages/meetings.jsx
"use client";

// import React, { useEffect, useMemo, useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faVideo,
//   faMapMarkerAlt,
//   faPlus,
//   faFilter,
//   faCalendarAlt,
//   faClock,
// } from "@fortawesome/free-solid-svg-icons";
// import styles from "./internalmeeting.module.css";

// /**
//  * Meetings page — mobile-first, industrial white+blue theme
//  * - Shows list of meetings (virtual / physical)
//  * - Shows date & time, mode badge, location/link
//  * - Add new meeting (persisted in localStorage)
//  *
//  * Drop this file as pages/meetings.jsx and the CSS file next to it.
//  */

// const LS_KEY = "slo_meetings_v1";

// const SAMPLE = [
//   {
//     id: "m-1",
//     title: "Liaison Office Weekly Briefing",
//     date: "2025-10-14",
//     time: "09:00",
//     mode: "Physical",
//     location: "Committee Room A, Parliament Buildings",
//     notes: "Agenda: county report reviews",
//   },
//   {
//     id: "m-2",
//     title: "Digital Outreach: Virtual Townhall",
//     date: "2025-10-16",
//     time: "15:00",
//     mode: "Virtual",
//     location: "https://meet.example.com/slo-townhall",
//     notes: "Open to public; registration required",
//   },
//   {
//     id: "m-3",
//     title: "Stakeholder Consultative Meeting",
//     date: "2025-11-02",
//     time: "11:30",
//     mode: "Physical",
//     location: "Senate Liaison Conference Hall",
//     notes: "Invite-only stakeholders and partners",
//   },
// ];

// function uid(prefix = "") {
//   return (
//     prefix + Date.now().toString(36) + Math.random().toString(36).slice(2, 7)
//   );
// }

// function loadMeetings() {
//   try {
//     const raw = localStorage.getItem(LS_KEY);
//     if (!raw) {
//       localStorage.setItem(LS_KEY, JSON.stringify(SAMPLE));
//       return SAMPLE;
//     }
//     return JSON.parse(raw);
//   } catch {
//     return SAMPLE;
//   }
// }

// export default function MeetingsPage() {
//   const [meetings, setMeetings] = useState(() => loadMeetings());
//   const [filter, setFilter] = useState("All"); // All | Physical | Virtual
//   const [showForm, setShowForm] = useState(false);

//   // form fields
//   const [title, setTitle] = useState("");
//   const [date, setDate] = useState("");
//   const [time, setTime] = useState("");
//   const [mode, setMode] = useState("Physical");
//   const [location, setLocation] = useState("");
//   const [notes, setNotes] = useState("");

//   useEffect(() => {
//     localStorage.setItem(LS_KEY, JSON.stringify(meetings));
//   }, [meetings]);

//   const visible = useMemo(() => {
//     return meetings
//       .slice()
//       .sort((a, b) => {
//         const da = new Date(`${a.date}T${a.time}`);
//         const db = new Date(`${b.date}T${b.time}`);
//         return da - db;
//       })
//       .filter((m) => (filter === "All" ? true : m.mode === filter));
//   }, [meetings, filter]);

//   function handleAdd(e) {
//     e.preventDefault();
//     if (!title.trim() || !date || !time) {
//       alert("Please provide title, date and time.");
//       return;
//     }
//     const newMeeting = {
//       id: uid("m-"),
//       title: title.trim(),
//       date,
//       time,
//       mode,
//       location: location.trim(),
//       notes: notes.trim(),
//     };
//     setMeetings((prev) => [newMeeting, ...prev]);
//     // reset form
//     setTitle("");
//     setDate("");
//     setTime("");
//     setMode("Physical");
//     setLocation("");
//     setNotes("");
//     setShowForm(false);
//   }

//   function handleRemove(id) {
//     if (!confirm("Remove this meeting?")) return;
//     setMeetings((prev) => prev.filter((m) => m.id !== id));
//   }

//   function formatDateTime(dateStr, timeStr) {
//     try {
//       const d = new Date(`${dateStr}T${timeStr}`);
//       return d.toLocaleString(undefined, {
//         weekday: "short",
//         year: "numeric",
//         month: "short",
//         day: "numeric",
//         hour: "numeric",
//         minute: "2-digit",
//       });
//     } catch {
//       return `${dateStr} ${timeStr}`;
//     }
//   }

//   return (
//     <main className={styles.page}>
//       <header className={styles.header}>
//         <div className={styles.headerLeft}>
//           <h1 className={styles.h1}>Meetings</h1>
//           <p className={styles.lead}>
//             Announcements for physical and virtual meetings
//           </p>
//         </div>

//         <div className={styles.headerRight}>
//           <div className={styles.filterWrap}>
//             <button
//               className={`${styles.filterBtn} ${
//                 filter === "All" ? styles.active : ""
//               }`}
//               onClick={() => setFilter("All")}
//               aria-pressed={filter === "All"}
//             >
//               All
//             </button>
//             <button
//               className={`${styles.filterBtn} ${
//                 filter === "Physical" ? styles.active : ""
//               }`}
//               onClick={() => setFilter("Physical")}
//               aria-pressed={filter === "Physical"}
//             >
//               <FontAwesomeIcon icon={faMapMarkerAlt} /> Physical
//             </button>
//             <button
//               className={`${styles.filterBtn} ${
//                 filter === "Virtual" ? styles.active : ""
//               }`}
//               onClick={() => setFilter("Virtual")}
//               aria-pressed={filter === "Virtual"}
//             >
//               <FontAwesomeIcon icon={faVideo} /> Virtual
//             </button>
//           </div>

//           {/* <button
//             className={styles.addBtn}
//             onClick={() => setShowForm((s) => !s)}
//           >
//             <FontAwesomeIcon icon={faPlus} /> New
//           </button> */}
//         </div>
//       </header>

//       {showForm && (
//         <form className={styles.form} onSubmit={handleAdd}>
//           <div className={styles.row}>
//             <label className={styles.label}>
//               Title
//               <input
//                 className={styles.input}
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//                 placeholder="Meeting title"
//               />
//             </label>
//           </div>

//           <div className={styles.rowCols}>
//             <label className={styles.label}>
//               Date
//               <input
//                 className={styles.input}
//                 type="date"
//                 value={date}
//                 onChange={(e) => setDate(e.target.value)}
//               />
//             </label>

//             <label className={styles.label}>
//               Time
//               <input
//                 className={styles.input}
//                 type="time"
//                 value={time}
//                 onChange={(e) => setTime(e.target.value)}
//               />
//             </label>
//           </div>

//           <div className={styles.rowCols}>
//             <label className={styles.label}>
//               Mode
//               <select
//                 className={styles.input}
//                 value={mode}
//                 onChange={(e) => setMode(e.target.value)}
//               >
//                 <option>Physical</option>
//                 <option>Virtual</option>
//               </select>
//             </label>

//             <label className={styles.label}>
//               Location / Link
//               <input
//                 className={styles.input}
//                 value={location}
//                 onChange={(e) => setLocation(e.target.value)}
//                 placeholder="Room or meeting link"
//               />
//             </label>
//           </div>

//           <label className={styles.label}>
//             Notes (optional)
//             <textarea
//               className={styles.input}
//               rows={2}
//               value={notes}
//               onChange={(e) => setNotes(e.target.value)}
//               placeholder="Short notes or agenda"
//             />
//           </label>

//           <div className={styles.formActions}>
//             <button type="submit" className={styles.saveBtn}>
//               Save meeting
//             </button>
//             <button
//               type="button"
//               className={styles.cancelBtn}
//               onClick={() => setShowForm(false)}
//             >
//               Cancel
//             </button>
//           </div>
//         </form>
//       )}

//       <section className={styles.grid}>
//         {visible.length === 0 ? (
//           <div className={styles.empty}>No meetings scheduled.</div>
//         ) : (
//           visible.map((m) => (
//             <article key={m.id} className={styles.card}>
//               <div className={styles.cardHeader}>
//                 <div className={styles.cardTitleWrap}>
//                   <h2 className={styles.cardTitle}>{m.title}</h2>
//                   <div className={styles.cardMeta}>
//                     <span className={styles.when}>
//                       <FontAwesomeIcon icon={faCalendarAlt} /> {m.date}
//                     </span>
//                     <span className={styles.sep}>•</span>
//                     <span className={styles.time}>
//                       <FontAwesomeIcon icon={faClock} /> {m.time}
//                     </span>
//                   </div>
//                 </div>

//                 <div className={styles.modeWrap}>
//                   {m.mode === "Virtual" ? (
//                     <span className={`${styles.modeBadge} ${styles.virtual}`}>
//                       <FontAwesomeIcon icon={faVideo} /> Virtual
//                     </span>
//                   ) : (
//                     <span className={`${styles.modeBadge} ${styles.physical}`}>
//                       <FontAwesomeIcon icon={faMapMarkerAlt} /> Physical
//                     </span>
//                   )}
//                 </div>
//               </div>

//               <div className={styles.cardBody}>
//                 {m.location && (
//                   <div className={styles.location}>
//                     <strong>Location:</strong>{" "}
//                     {m.mode === "Virtual" ? (
//                       <a
//                         href={m.location}
//                         target="_blank"
//                         rel="noreferrer"
//                         className={styles.link}
//                       >
//                         {m.location}
//                       </a>
//                     ) : (
//                       <span>{m.location}</span>
//                     )}
//                   </div>
//                 )}
//                 {m.notes && <div className={styles.notes}>{m.notes}</div>}

//                 <div className={styles.cardActions}>
{
  /* <button
                    className={styles.smallBtn}
                    onClick={() =>
                      alert(
                        `Details:\n${m.title}\n${formatDateTime(
                          m.date,
                          m.time
                        )}\nMode: ${m.mode}`
                      )
                    }
                  >
                    Details
                  </button> */
}
{
  /* <button
                    className={styles.removeBtn}
                    onClick={() => handleRemove(m.id)}
                  >
                    Remove
                  </button> */
}
{
  /* </div>
              </div>
            </article>
          ))
        )}
      </section>

      <footer className={styles.footer}>
        <small>
          Senate Liaison Office — Meetings • local changes persist in browser
        </small>
      </footer>
    </main>
  ); */
}
// }

import React, { useEffect, useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faVideo,
  faMapMarkerAlt,
  faPlus,
  faFilter,
  faCalendarAlt,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./internalmeeting.module.css";

const LS_KEY = "slo_meetings_v1";
const CORRECT_PASSWORD = "senate";

const SAMPLE = [
  {
    id: "m-1",
    title: "Liaison Office Weekly Briefing",
    date: "2025-10-14",
    time: "09:00",
    mode: "Physical",
    location: "Committee Room A, Parliament Buildings",
    notes: "Agenda: county report reviews",
  },
  {
    id: "m-2",
    title: "Digital Outreach: Virtual Townhall",
    date: "2025-10-16",
    time: "15:00",
    mode: "Virtual",
    location: "https://meet.example.com/slo-townhall",
    notes: "Open to public; registration required",
  },
  {
    id: "m-3",
    title: "Stakeholder Consultative Meeting",
    date: "2025-11-02",
    time: "11:30",
    mode: "Physical",
    location: "Senate Liaison Conference Hall",
    notes: "Invite-only stakeholders and partners",
  },
];

function uid(prefix = "") {
  return (
    prefix + Date.now().toString(36) + Math.random().toString(36).slice(2, 7)
  );
}

function loadMeetings() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) {
      localStorage.setItem(LS_KEY, JSON.stringify(SAMPLE));
      return SAMPLE;
    }
    return JSON.parse(raw);
  } catch {
    return SAMPLE;
  }
}

export default function MeetingsPage() {
  const [meetings, setMeetings] = useState(() => loadMeetings());
  const [filter, setFilter] = useState("All"); // All | Physical | Virtual
  const [showForm, setShowForm] = useState(false);
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");

  // Form fields
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [mode, setMode] = useState("Physical");
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(meetings));
  }, [meetings]);

  const visible = useMemo(() => {
    return meetings
      .slice()
      .sort((a, b) => {
        const da = new Date(`${a.date}T${a.time}`);
        const db = new Date(`${b.date}T${b.time}`);
        return da - db;
      })
      .filter((m) => (filter === "All" ? true : m.mode === filter));
  }, [meetings, filter]);

  function handleAdd(e) {
    e.preventDefault();
    if (!title.trim() || !date || !time) {
      alert("Please provide title, date, and time.");
      return;
    }
    const newMeeting = {
      id: uid("m-"),
      title: title.trim(),
      date,
      time,
      mode,
      location: location.trim(),
      notes: notes.trim(),
    };
    setMeetings((prev) => [newMeeting, ...prev]);
    // Reset form
    setTitle("");
    setDate("");
    setTime("");
    setMode("Physical");
    setLocation("");
    setNotes("");
    setShowForm(false);
  }

  function handleRemove(id) {
    if (!confirm("Remove this meeting?")) return;
    setMeetings((prev) => prev.filter((m) => m.id !== id));
  }

  function formatDateTime(dateStr, timeStr) {
    try {
      const d = new Date(`${dateStr}T${timeStr}`);
      return d.toLocaleString(undefined, {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
      });
    } catch {
      return `${dateStr} ${timeStr}`;
    }
  }

  function handlePasswordSubmit(e) {
    e.preventDefault();
    if (password.toLowerCase() === CORRECT_PASSWORD) {
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Incorrect password. Please try again.");
      setPassword("");
    }
  }

  if (!isAuthenticated) {
    return (
      <main className={styles.page}>
        <div className={styles.container}>
          <h1 className={styles.h1}>Enter Password</h1>
          <form onSubmit={handlePasswordSubmit} className={styles.form}>
            <label className={styles.label}>
              Password
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.input}
                placeholder="Use ``senate`` as password"
                autoFocus
              />
            </label>
            {error && <p className={styles.error}>{error}</p>}
            <button type="submit" className={styles.saveBtn}>
              Submit
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <h1 className={styles.h1}>Meetings</h1>
          <p className={styles.lead}>
            Announcements for physical and virtual meetings
          </p>
        </div>

        <div className={styles.headerRight}>
          <div className={styles.filterWrap}>
            <button
              className={`${styles.filterBtn} ${
                filter === "All" ? styles.active : ""
              }`}
              onClick={() => setFilter("All")}
              aria-pressed={filter === "All"}
            >
              All
            </button>
            <button
              className={`${styles.filterBtn} ${
                filter === "Physical" ? styles.active : ""
              }`}
              onClick={() => setFilter("Physical")}
              aria-pressed={filter === "Physical"}
            >
              <FontAwesomeIcon icon={faMapMarkerAlt} /> Physical
            </button>
            <button
              className={`${styles.filterBtn} ${
                filter === "Virtual" ? styles.active : ""
              }`}
              onClick={() => setFilter("Virtual")}
              aria-pressed={filter === "Virtual"}
            >
              <FontAwesomeIcon icon={faVideo} /> Virtual
            </button>
          </div>
        </div>
      </header>

      {showForm && (
        <form className={styles.form} onSubmit={handleAdd}>
          <div className={styles.row}>
            <label className={styles.label}>
              Title
              <input
                className={styles.input}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Meeting title"
              />
            </label>
          </div>

          <div className={styles.rowCols}>
            <label className={styles.label}>
              Date
              <input
                className={styles.input}
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </label>

            <label className={styles.label}>
              Time
              <input
                className={styles.input}
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </label>
          </div>

          <div className={styles.rowCols}>
            <label className={styles.label}>
              Mode
              <select
                className={styles.input}
                value={mode}
                onChange={(e) => setMode(e.target.value)}
              >
                <option>Physical</option>
                <option>Virtual</option>
              </select>
            </label>

            <label className={styles.label}>
              Location / Link
              <input
                className={styles.input}
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Room or meeting link"
              />
            </label>
          </div>

          <label className={styles.label}>
            Notes (optional)
            <textarea
              className={styles.input}
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Short notes or agenda"
            />
          </label>

          <div className={styles.formActions}>
            <button type="submit" className={styles.saveBtn}>
              Save meeting
            </button>
            <button
              type="button"
              className={styles.cancelBtn}
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <section className={styles.grid}>
        {visible.length === 0 ? (
          <div className={styles.empty}>No meetings scheduled.</div>
        ) : (
          visible.map((m) => (
            <article key={m.id} className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.cardTitleWrap}>
                  <h2 className={styles.cardTitle}>{m.title}</h2>
                  <div className={styles.cardMeta}>
                    <span className={styles.when}>
                      <FontAwesomeIcon icon={faCalendarAlt} /> {m.date}
                    </span>
                    <span className={styles.sep}>•</span>
                    <span className={styles.time}>
                      <FontAwesomeIcon icon={faClock} /> {m.time}
                    </span>
                  </div>
                </div>

                <div className={styles.modeWrap}>
                  {m.mode === "Virtual" ? (
                    <span className={`${styles.modeBadge} ${styles.virtual}`}>
                      <FontAwesomeIcon icon={faVideo} /> Virtual
                    </span>
                  ) : (
                    <span className={`${styles.modeBadge} ${styles.physical}`}>
                      <FontAwesomeIcon icon={faMapMarkerAlt} /> Physical
                    </span>
                  )}
                </div>
              </div>

              <div className={styles.cardBody}>
                {m.location && (
                  <div className={styles.location}>
                    <strong>Location:</strong>{" "}
                    {m.mode === "Virtual" ? (
                      <a
                        href={m.location}
                        target="_blank"
                        rel="noreferrer"
                        className={styles.link}
                      >
                        {m.location}
                      </a>
                    ) : (
                      <span>{m.location}</span>
                    )}
                  </div>
                )}
                {m.notes && <div className={styles.notes}>{m.notes}</div>}
              </div>
            </article>
          ))
        )}
      </section>

      <footer className={styles.footer}>
        <small>
          Senate Liaison Office — Meetings • local changes persist in browser
        </small>
      </footer>
    </main>
  );
}
