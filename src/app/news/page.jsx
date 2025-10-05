// pages/feed.jsx
"use client";

import React, { useEffect, useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faNewspaper,
  faChartLine,
  faUsers,
  faLightbulb,
  faCamera,
  faHeart,
  faBookmark,
  faShare,
  faSearch,
  faFilter,
  faPlus,
  faBolt,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./news.module.css";

/**
 * Fan-site / Department Feed page
 * - Mobile-first
 * - Mixed feed types (news, analysis, community, motivation, media)
 * - Create small motivational posts (stored in localStorage)
 * - Like, bookmark, share actions (persisted locally)
 *
 * NOTE: For share, uses navigator.share if available, otherwise fallback to copying link text.
 */

// --- Mock starter feed
const STARTER_FEED = [
  {
    id: "f1",
    type: "News",
    title: "County Devolution Funding — New Guidelines Published",
    summary:
      "The Senate Liaison Office releases updated guidance for county budget monitoring and transfers. Key changes focus on transparency and auditability.",
    time: "2025-09-30T10:00:00Z",
    author: "Press Office",
    featured: true,
  },
  {
    id: "f2",
    type: "Analysis",
    title: "Data Brief: Fiscal Transfers vs Service Delivery",
    summary:
      "A short analysis showing correlations between transfer timing and service delivery metrics across counties.",
    time: "2025-09-24T08:00:00Z",
    author: "Policy & Research",
  },
  {
    id: "f3",
    type: "Community",
    title: "School Visit Gallery — Nyeri County",
    summary:
      "Photos and notes from the liaison office site visit to Nyeri schools.",
    media: "/photos/liaison-visit-1.jpg",
    time: "2025-09-20T14:30:00Z",
    author: "Outreach Team",
  },
  {
    id: "f4",
    type: "Motivation",
    title: "Daily Spark",
    summary:
      "“Small efforts repeated consistently move mountains.” — Keep showing up for the people.",
    time: "2025-09-25T06:00:00Z",
    author: "Culture Desk",
  },
  {
    id: "f5",
    type: "Media",
    title: "Watch: Webinar on Citizen Engagement",
    summary:
      "Recording of the Digital Outreach Webinar — 90 minutes of practical tips.",
    media: "/media/webinar-thumb.jpg",
    time: "2025-09-18T11:00:00Z",
    author: "Digital Team",
  },
  {
    id: "f6",
    type: "News",
    title: "Stakeholder Forum — Key Takeaways",
    summary:
      "Summary of the stakeholder forum highlighting next steps and action owners.",
    time: "2025-09-15T16:00:00Z",
    author: "Press Office",
  },
];

// Utility keys for localStorage
const LS_KEYS = {
  POSTS: "slo_feed_posts_v1",
  LIKES: "slo_feed_likes_v1",
  BOOKMARKS: "slo_feed_bookmarks_v1",
};

// --- Component
export default function FeedPage() {
  const [feed, setFeed] = useState(() => {
    // start with starter feed
    return STARTER_FEED;
  });

  const [filter, setFilter] = useState("All"); // All | News | Analysis | Community | Motivation | Media
  const [query, setQuery] = useState("");
  const [likes, setLikes] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(LS_KEYS.LIKES)) || {};
    } catch {
      return {};
    }
  });
  const [bookmarks, setBookmarks] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(LS_KEYS.BOOKMARKS)) || {};
    } catch {
      return {};
    }
  });
  const [userPosts, setUserPosts] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(LS_KEYS.POSTS)) || [];
    } catch {
      return [];
    }
  });

  // persist likes/bookmarks/posts
  useEffect(() => {
    localStorage.setItem(LS_KEYS.LIKES, JSON.stringify(likes));
  }, [likes]);
  useEffect(() => {
    localStorage.setItem(LS_KEYS.BOOKMARKS, JSON.stringify(bookmarks));
  }, [bookmarks]);
  useEffect(() => {
    localStorage.setItem(LS_KEYS.POSTS, JSON.stringify(userPosts));
  }, [userPosts]);

  // combine feed (user posts first)
  const combined = useMemo(() => {
    const combinedList = [
      ...userPosts.map((p) => ({ ...p, isUser: true })),
      ...feed,
    ];
    // sort by time desc
    return combinedList.sort((a, b) => new Date(b.time) - new Date(a.time));
  }, [feed, userPosts]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return combined.filter((it) => {
      if (filter !== "All" && it.type !== filter) return false;
      if (!q) return true;
      return (it.title + " " + (it.summary || "") + " " + (it.author || ""))
        .toLowerCase()
        .includes(q);
    });
  }, [combined, filter, query]);

  function toggleLike(id) {
    setLikes((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function toggleBookmark(id) {
    setBookmarks((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function handleShare(item) {
    const text = `${item.title} — ${item.summary || ""}`;
    const url =
      typeof window !== "undefined" ? window.location.href + `#${item.id}` : "";
    if (navigator.share) {
      navigator.share({ title: item.title, text, url }).catch(() => {});
    } else {
      // fallback: copy text+url
      try {
        navigator.clipboard?.writeText(`${text}\n${url}`);
        alert("Link copied to clipboard.");
      } catch {
        alert("Share is not supported on this device.");
      }
    }
  }

  // Submit a small motivational post
  function submitPost(e) {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value.trim();
    const body = form.body.value.trim();
    if (!body && !title) return;
    const post = {
      id: `user-${Date.now()}`,
      type: "Motivation",
      title: title || "Team Note",
      summary: body,
      time: new Date().toISOString(),
      author: "You",
    };
    setUserPosts((prev) => [post, ...prev]);
    form.reset();
  }

  function clearAllUserData() {
    if (!confirm("Clear local feed data (your posts, likes, bookmarks)?"))
      return;
    localStorage.removeItem(LS_KEYS.POSTS);
    localStorage.removeItem(LS_KEYS.LIKES);
    localStorage.removeItem(LS_KEYS.BOOKMARKS);
    setUserPosts([]);
    setLikes({});
    setBookmarks({});
  }

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.logo}>
            <span className={styles.logoIcon}>
              <FontAwesomeIcon icon={faBolt} />
            </span>
            <div>
              <h1 className={styles.title}>SLO Fan Feed</h1>
              <div className={styles.subtitle}>
                Curated news, community and daily sparks
              </div>
            </div>
          </div>
        </div>

        <div className={styles.headerRight}>
          {/* <div className={styles.search}>
            <FontAwesomeIcon icon={faSearch} className={styles.searchIcon} /> */}
          {/* <input
              className={styles.searchInput}
              placeholder="Search the feed..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search feed"
            /> */}
          {/* {query && (
              <button className={styles.clearBtn} onClick={() => setQuery("")}>
                ✕
              </button>
            )}
          </div> */}

          <div className={styles.filter}>
            <FontAwesomeIcon icon={faFilter} className={styles.filterIcon} />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className={styles.select}
            >
              <option>All</option>
              <option>News</option>
              <option>Analysis</option>
              <option>Community</option>
              <option>Motivation</option>
              <option>Media</option>
            </select>
          </div>
        </div>
      </header>

      {/* Featured strip */}
      <div className={styles.featured}>
        <div className={styles.featuredInner}>
          {combined
            .filter((i) => i.featured || i.type === "Motivation")
            .slice(0, 6)
            .map((item) => (
              <button
                key={item.id}
                className={styles.featuredItem}
                onClick={() => {
                  window.location.hash = item.id;
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                <div className={styles.featuredTag}>{item.type}</div>
                <div className={styles.featuredTitle}>{item.title}</div>
              </button>
            ))}
        </div>
      </div>

      {/* Post box */}
      {/* <section className={styles.postBox}>
        <form onSubmit={submitPost} className={styles.postForm}>
          <input
            name="title"
            className={styles.postTitle}
            placeholder="Short title (optional)"
            maxLength={80}
          />
          <textarea
            name="body"
            className={styles.postBody}
            placeholder="Share a short motivational note, an update or a shout-out..."
            rows={2}
          />
          <div className={styles.postActions}>
            <button type="submit" className={styles.postBtn}>
              <FontAwesomeIcon icon={faPlus} /> Post
            </button>
            <button
              type="button"
              className={styles.clearLocal}
              onClick={clearAllUserData}
            >
              Clear local data
            </button>
          </div>
        </form>
      </section> */}

      {/* Feed list */}
      <section className={styles.feedList} aria-live="polite">
        {visible.length === 0 ? (
          <div className={styles.empty}>
            No feed items match your filter or search.
          </div>
        ) : (
          visible.map((item) => (
            <article key={item.id} id={item.id} className={styles.card}>
              <header className={styles.cardHeader}>
                <div className={styles.cardMeta}>
                  <div className={styles.cardType}>{item.type}</div>
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                  <div className={styles.cardSub}>
                    {item.author} • {new Date(item.time).toLocaleString()}
                  </div>
                </div>
                <div className={styles.cardActions}>
                  <button
                    className={`${styles.iconBtn} ${
                      likes[item.id] ? styles.active : ""
                    }`}
                    onClick={() => toggleLike(item.id)}
                    aria-pressed={!!likes[item.id]}
                    title="Like"
                  >
                    <FontAwesomeIcon icon={faHeart} />
                  </button>
                  <button
                    className={`${styles.iconBtn} ${
                      bookmarks[item.id] ? styles.active : ""
                    }`}
                    onClick={() => toggleBookmark(item.id)}
                    title="Bookmark"
                  >
                    <FontAwesomeIcon icon={faBookmark} />
                  </button>
                  <button
                    className={styles.iconBtn}
                    onClick={() => handleShare(item)}
                    title="Share"
                  >
                    <FontAwesomeIcon icon={faShare} />
                  </button>
                </div>
              </header>

              <div className={styles.cardBody}>
                {item.media && (
                  <img
                    src={item.media}
                    alt={item.title}
                    className={styles.cardMedia}
                  />
                )}
                <p className={styles.cardSummary}>{item.summary}</p>
                <div className={styles.cardFooter}>
                  <button
                    className={styles.readMore}
                    onClick={() => alert(`Open full item: ${item.title}`)}
                  >
                    Read more
                  </button>
                  <div className={styles.engageStats}>
                    <span className={styles.stat}>
                      {likes[item.id] ? "♥" : "♡"}
                    </span>
                    <span className={styles.stat}>
                      {bookmarks[item.id] ? "🔖" : ""}
                    </span>
                  </div>
                </div>
              </div>
            </article>
          ))
        )}
      </section>

      <footer className={styles.footer}>
        <div>Fan-site feed • Stay curious • Stay kind</div>
        <small>
          Local changes (your posts, likes & bookmarks) are saved in your
          browser.
        </small>
      </footer>
    </main>
  );
}
