// pages/group-chat.jsx
"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faPlus,
  faTrash,
  faUserPlus,
  faComments,
  faPaperPlane,
  faEllipsisV,
  faTimes,
  faArrowLeft,
  faDownload,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./chat.module.css";

/**
 * Group Chat page (client)
 * - Create groups
 * - Add members
 * - Send messages within group chat
 * - Stores everything in localStorage under 'slo_groups_v1'
 *
 * Notes:
 * - This is a client-side demo. For production, wire to real backend + websockets.
 * - Avatars are generated from initials.
 */

// LocalStorage key
const LS_KEY = "slo_groups_v1";

// starter sample group
const SAMPLE = [
  {
    id: "g-1",
    name: "County Youth Delegation",
    description:
      "Youth delegates from various wards — visit schedule & coordination.",
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 6,
    members: [
      { id: "m-1", name: "Angela M", role: "Coordinator" },
      { id: "m-2", name: "Brian K", role: "Logistics" },
      { id: "m-3", name: "Cynthia R", role: "Registration" },
    ],
    messages: [
      {
        id: "msg-1",
        senderId: "m-1",
        text: "Welcome team — meet at 08:00 at the main gate.",
        time: Date.now() - 1000 * 60 * 60 * 24 * 5,
      },
      {
        id: "msg-2",
        senderId: "m-2",
        text: "Noted. I will confirm transport.",
        time: Date.now() - 1000 * 60 * 60 * 24 * 5 + 60000,
      },
    ],
  },
];

function uid(prefix = "") {
  return (
    prefix + Date.now().toString(36) + Math.random().toString(36).slice(2, 7)
  );
}

function loadGroups() {
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

function saveGroups(groups) {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(groups));
  } catch {}
}

function initials(name) {
  return (name || "")
    .split(/\s+/)
    .slice(0, 2)
    .map((s) => (s[0] || "").toUpperCase())
    .join("");
}

export default function GroupChatPage() {
  const [groups, setGroups] = useState(() => loadGroups());
  const [activeGroupId, setActiveGroupId] = useState(groups[0]?.id || null);
  const [creating, setCreating] = useState(false);
  const [q, setQ] = useState("");
  const [panelOpen, setPanelOpen] = useState(true);
  const [selectedPerson, setSelectedPerson] = useState(null); // <-- Add this line
  const messageRef = useRef(null);

  // persist groups on change
  useEffect(() => saveGroups(groups), [groups]);

  // sync activeGroupId when groups change
  useEffect(() => {
    if (!activeGroupId && groups.length) setActiveGroupId(groups[0].id);
    if (groups.length === 0) setActiveGroupId(null);
  }, [groups, activeGroupId]);

  const activeGroup = useMemo(
    () => groups.find((g) => g.id === activeGroupId) || null,
    [groups, activeGroupId]
  );

  function createGroup({ name, description }) {
    const g = {
      id: uid("g-"),
      name: name || `Group ${groups.length + 1}`,
      description: description || "",
      createdAt: Date.now(),
      members: [],
      messages: [],
    };
    setGroups((prev) => [g, ...prev]);
    setCreating(false);
    setActiveGroupId(g.id);
  }

  function deleteGroup(id) {
    if (!confirm("Delete group and all messages? This cannot be undone."))
      return;
    setGroups((prev) => prev.filter((p) => p.id !== id));
    if (id === activeGroupId) setActiveGroupId(null);
  }

  function addMemberToActive({ name, role }) {
    if (!activeGroup) return;
    const member = { id: uid("m-"), name, role: role || "" };
    setGroups((prev) =>
      prev.map((g) =>
        g.id === activeGroup.id ? { ...g, members: [...g.members, member] } : g
      )
    );
  }

  function removeMember(memberId) {
    if (!activeGroup) return;
    setGroups((prev) =>
      prev.map((g) =>
        g.id === activeGroup.id
          ? { ...g, members: g.members.filter((m) => m.id !== memberId) }
          : g
      )
    );
  }

  function sendMessage(text, senderId) {
    if (!activeGroup || !text.trim()) return;
    const msg = {
      id: uid("msg-"),
      senderId: senderId || "system",
      text: text.trim(),
      time: Date.now(),
    };
    setGroups((prev) =>
      prev.map((g) =>
        g.id === activeGroup.id ? { ...g, messages: [...g.messages, msg] } : g
      )
    );
    setTimeout(() => {
      // scroll to bottom
      messageRef.current?.scrollTo({
        top: messageRef.current.scrollHeight,
        behavior: "smooth",
      });
    }, 40);
  }

  function exportGroup(g) {
    const payload = { ...g };
    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${g.name.replace(/\s+/g, "-").toLowerCase()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function clearAll() {
    if (!confirm("Clear all groups (local only)?")) return;
    localStorage.removeItem(LS_KEY);
    setGroups([]);
    setActiveGroupId(null);
  }

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div className={styles.brand}>
          <div className={styles.logo}>
            {" "}
            <FontAwesomeIcon icon={faUsers} />{" "}
          </div>
          <div>
            <h1 className={styles.title}>SLO Groups</h1>
            <div className={styles.subtitle}>
              Create groups, add members and chat — local demo
            </div>
          </div>
        </div>

        <div className={styles.headerActions}>
          <div className={styles.search}>
            <FontAwesomeIcon icon={faSearch} className={styles.searchIcon} />
            <input
              placeholder="Search groups..."
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className={styles.searchInput}
            />
          </div>
          <button
            className={styles.iconBtn}
            onClick={() => setCreating((s) => !s)}
            title="Create group"
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
          <button
            className={styles.iconBtn}
            onClick={() => clearAll()}
            title="Clear all local"
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      </header>

      <div className={styles.layout}>
        <aside className={`${styles.sidebar} ${panelOpen ? styles.open : ""}`}>
          <div className={styles.sideHeader}>
            <div className={styles.sideTitle}>Groups</div>
            <button
              className={styles.hideBtn}
              onClick={() => setPanelOpen((s) => !s)}
              aria-label="toggle groups panel"
            >
              {panelOpen ? (
                <FontAwesomeIcon icon={faArrowLeft} />
              ) : (
                <FontAwesomeIcon icon={faUsers} />
              )}
            </button>
          </div>

          <div className={styles.controlsRow}>
            <button
              className={styles.createBtn}
              onClick={() => setCreating(true)}
            >
              <FontAwesomeIcon icon={faPlus} /> New Group
            </button>
          </div>

          <div className={styles.list}>
            {groups
              .filter((g) =>
                q
                  ? g.name.toLowerCase().includes(q.toLowerCase()) ||
                    g.description.toLowerCase().includes(q.toLowerCase())
                  : true
              )
              .map((g) => (
                <button
                  key={g.id}
                  className={`${styles.groupItem} ${
                    g.id === activeGroupId ? styles.active : ""
                  }`}
                  onClick={() => {
                    setActiveGroupId(g.id);
                    setPanelOpen(false);
                  }}
                >
                  <div className={styles.gAvatar}>{initials(g.name)}</div>
                  <div className={styles.gMeta}>
                    <div className={styles.gName}>{g.name}</div>
                    <div className={styles.gSub}>
                      {g.members.length} members • {g.messages.length} msgs
                    </div>
                  </div>
                  <div className={styles.gActions}>
                    <button
                      className={styles.iconTiny}
                      onClick={(e) => {
                        e.stopPropagation();
                        exportGroup(g);
                      }}
                      title="Export group JSON"
                    >
                      <FontAwesomeIcon icon={faDownload} />
                    </button>
                    <button
                      className={styles.iconTiny}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (confirm("Delete group?")) deleteGroup(g.id);
                      }}
                      title="Delete"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </button>
              ))}

            {groups.length === 0 && (
              // <div className={styles.empty}>
              //   No groups yet — create one to get started.
              // </div>

              <div className={styles.empty}></div>
            )}
          </div>
        </aside>

        <section className={styles.main}>
          {!activeGroup ? (
            <div className={styles.emptyMain}>
              <h2>Welcome</h2>
              <p>
                Create a group on the left to start adding members and chatting.
                This demo stores data locally in your browser.
              </p>
              <div className={styles.kv}>
                <button
                  className={styles.createBtnLarge}
                  onClick={() => setCreating(true)}
                >
                  <FontAwesomeIcon icon={faPlus} /> Create first group
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className={styles.chatHeader}>
                <div className={styles.chatTitle}>
                  <div className={styles.gAvatarLarge}>
                    {initials(activeGroup.name)}
                  </div>
                  <div>
                    <div className={styles.gNameLarge}>{activeGroup.name}</div>
                    <div className={styles.gSubLarge}>
                      {activeGroup.members.length} members • created{" "}
                      {new Date(activeGroup.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                <div className={styles.chatHeaderActions}>
                  <button
                    className={styles.iconBtn}
                    onClick={() => exportGroup(activeGroup)}
                    title="Export group"
                  >
                    <FontAwesomeIcon icon={faDownload} />
                  </button>
                  <button
                    className={styles.iconBtn}
                    onClick={() => deleteGroup(activeGroup.id)}
                    title="Delete group"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                  <button
                    className={styles.iconBtn}
                    onClick={() => setPanelOpen((s) => !s)}
                    title="Toggle groups"
                  >
                    <FontAwesomeIcon icon={faEllipsisV} />
                  </button>
                </div>
              </div>

              <div className={styles.split}>
                <div className={styles.chatCol}>
                  <div className={styles.messages} ref={messageRef}>
                    {activeGroup.messages.length === 0 && (
                      <div className={styles.empty}>
                        No messages yet. Say hello 👋
                      </div>
                    )}
                    {activeGroup.messages.map((m) => {
                      const sender = activeGroup.members.find(
                        (mm) => mm.id === m.senderId
                      ) || {
                        id: "system",
                        name: m.senderId === "system" ? "System" : "Unknown",
                      };
                      return (
                        <div key={m.id} className={styles.message}>
                          <div className={styles.msgLeft}>
                            <div className={styles.msgAvatar}>
                              {initials(sender.name)}
                            </div>
                          </div>
                          <div className={styles.msgBody}>
                            <div className={styles.msgHead}>
                              <div className={styles.msgSender}>
                                {sender.name}
                              </div>
                              <div className={styles.msgTime}>
                                {new Date(m.time).toLocaleString()}
                              </div>
                            </div>
                            <div className={styles.msgText}>{m.text}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <ChatComposer
                    activeGroup={activeGroup}
                    members={activeGroup.members}
                    onSend={(text, senderId) => sendMessage(text, senderId)}
                  />
                </div>

                <aside className={styles.sideCol}>
                  <div className={styles.panel}>
                    <h3 className={styles.panelTitle}>
                      <FontAwesomeIcon icon={faUserPlus} /> Members
                    </h3>

                    <MemberList
                      members={activeGroup.members}
                      onAdd={(name, role) => addMemberToActive({ name, role })}
                      onRemove={(id) => removeMember(id)}
                      onView={(m) => setSelectedPerson(m)}
                    />
                  </div>

                  <div className={styles.panel}>
                    <h3 className={styles.panelTitle}>
                      <FontAwesomeIcon icon={faComments} /> Details
                    </h3>
                    <div className={styles.panelBody}>
                      <p className={styles.gDesc}>
                        {activeGroup.description || "No description"}
                      </p>
                      <div className={styles.metaRow}>
                        <strong>Members:</strong> {activeGroup.members.length}
                      </div>
                      <div className={styles.metaRow}>
                        <strong>Messages:</strong> {activeGroup.messages.length}
                      </div>
                    </div>
                  </div>
                </aside>
              </div>
            </>
          )}
        </section>
      </div>

      {/* Create group panel/modal */}
      {creating && (
        <GroupCreate
          onCancel={() => setCreating(false)}
          onCreate={(payload) => createGroup(payload)}
        />
      )}

      {/* Person detail modal */}
      {selectedPerson && (
        <div
          className={styles.modalBackdrop}
          onClick={() => setSelectedPerson(null)}
        >
          <div
            className={styles.modalCard}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={styles.modalClose}
              onClick={() => setSelectedPerson(null)}
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
            <h3>{selectedPerson.name}</h3>
            <div className={styles.metaRow}>
              <strong>Role:</strong> {selectedPerson.role}
            </div>
            <div className={styles.metaRow}>
              <strong>ID:</strong> {selectedPerson.id}
            </div>
            <div style={{ marginTop: 12 }}>
              <button
                className={styles.btn}
                onClick={() => {
                  navigator.clipboard?.writeText(selectedPerson.name);
                  alert("Copied name");
                }}
              >
                Copy name
              </button>
              <button
                className={styles.btnGhost}
                onClick={() => {
                  removeMember(selectedPerson.id);
                  setSelectedPerson(null);
                }}
              >
                Remove member
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );

  // ---------- subcomponents ----------
  function ChatComposer({ activeGroup, members, onSend }) {
    const [text, setText] = useState("");
    const [senderId, setSenderId] = useState(members[0]?.id || "");
    const inputRef = useRef(null);

    useEffect(() => {
      setSenderId(members[0]?.id || "");
    }, [activeGroup?.id, members.length]);

    function submit(e) {
      e?.preventDefault();
      if (!text.trim()) return;
      onSend(text, senderId || "system");
      setText("");
      inputRef.current?.focus();
    }

    return (
      <form className={styles.composer} onSubmit={submit}>
        <div className={styles.senderSelect}>
          <select
            value={senderId}
            onChange={(e) => setSenderId(e.target.value)}
            className={styles.selectSmall}
            aria-label="Send as"
          >
            <option value="">System</option>
            {members.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name}
              </option>
            ))}
          </select>
        </div>

        <textarea
          ref={inputRef}
          className={styles.textarea}
          placeholder="Type a message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={2}
        />

        <div className={styles.composerActions}>
          <button type="submit" className={styles.sendBtn}>
            <FontAwesomeIcon icon={faPaperPlane} /> Send
          </button>
        </div>
      </form>
    );
  }

  function MemberList({ members, onAdd, onRemove, onView }) {
    const [name, setName] = useState("");
    const [role, setRole] = useState("");

    function submit(e) {
      e.preventDefault();
      if (!name.trim()) return;
      onAdd(name.trim(), role.trim());
      setName("");
      setRole("");
    }

    return (
      <div>
        <ul className={styles.memberList}>
          {members.map((m) => (
            <li key={m.id} className={styles.memberRow}>
              <div className={styles.memberLeft}>
                <div className={styles.memberAvatar}>{initials(m.name)}</div>
                <div>
                  <div className={styles.memberName}>{m.name}</div>
                  <div className={styles.memberRole}>{m.role}</div>
                </div>
              </div>
              <div className={styles.memberActions}>
                <button
                  className={styles.iconTiny}
                  onClick={() => onView(m)}
                  title="View member"
                >
                  <FontAwesomeIcon icon={faEllipsisV} />
                </button>
                <button
                  className={styles.iconTiny}
                  onClick={() => onRemove(m.id)}
                  title="Remove member"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </li>
          ))}
          {members.length === 0 && (
            <div className={styles.empty}>No members — add one below</div>
          )}
        </ul>

        <form className={styles.addMemberForm} onSubmit={submit}>
          <input
            className={styles.input}
            placeholder="Member name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className={styles.input}
            placeholder="Role (optional)"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
          <button type="submit" className={styles.addBtn}>
            <FontAwesomeIcon icon={faUserPlus} /> Add
          </button>
        </form>
      </div>
    );
  }

  function GroupCreate({ onCancel, onCreate }) {
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");

    function submit(e) {
      e.preventDefault();
      onCreate({ name: name.trim(), description: desc.trim() });
    }

    return (
      <div className={styles.modalBackdrop} onClick={onCancel}>
        <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
          <button className={styles.modalClose} onClick={onCancel}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
          <h3>Create group</h3>
          <form onSubmit={submit} className={styles.createForm}>
            <input
              className={styles.input}
              placeholder="Group name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <textarea
              className={styles.input}
              placeholder="Short description"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              rows={3}
            />
            <div className={styles.row}>
              <button type="submit" className={styles.createBtn}>
                <FontAwesomeIcon icon={faPlus} /> Create
              </button>
              <button
                type="button"
                className={styles.btnGhost}
                onClick={onCancel}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
