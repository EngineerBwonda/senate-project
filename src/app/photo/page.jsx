// pages/photos.jsx
"use client";

import React, { useEffect, useState, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDownload,
  faTimes,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./photo.module.css";

/**
 * Photos gallery page (mobile-first).
 * - Grid of thumbnails
 * - Lightbox modal with next/prev, keyboard support, download
 * - Place image files under public/photos/ (paths used in IMAGE_LIST)
 *
 * Install FontAwesome if not present:
 * npm install @fortawesome/react-fontawesome @fortawesome/free-solid-svg-icons
 */

const IMAGE_LIST = [
  {
    id: "p1",
    src: "/teambuilding.jpeg",
    caption: "Team building retreat",
  },
  {
    id: "p2",
    src: "/walk.jpeg",
    caption: "Morning walk during retreat",
  },
  {
    id: "p3",
    src: "/zip.jpeg",
    caption: "Zip-lining activity",
  },
  {
    id: "p4",
    src: "/groupic.jpeg",
    caption: "Group photo",
  },
  {
    id: "p5",
    src: "/race.jpeg",
    caption: "Fun race activity",
  },
  {
    id: "p6",
    src: "/boat.jpeg",
    caption: "water activity",
  },
  // add more images (place them in /public/photos/)
];

export default function PhotosPage() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const openAt = (i) => {
    setIndex(i);
    setLightboxOpen(true);
    // prevent background scrolling
    document.body.style.overflow = "hidden";
  };

  const close = () => {
    setLightboxOpen(false);
    document.body.style.overflow = "";
  };

  const showPrev = useCallback(() => {
    setIndex((cur) => (cur - 1 + IMAGE_LIST.length) % IMAGE_LIST.length);
  }, []);

  const showNext = useCallback(() => {
    setIndex((cur) => (cur + 1) % IMAGE_LIST.length);
  }, []);

  useEffect(() => {
    function onKey(e) {
      if (!lightboxOpen) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxOpen, showPrev, showNext]);

  useEffect(() => {
    // cleanup on unmount
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.h1}>Senate Liaison Office — Photos</h1>
          <p className={styles.lead}>
            Browse recent visits, events and documentation photos.
          </p>
        </div>
        <div className={styles.headerRight}>
          <span className={styles.tag}>Gallery</span>
        </div>
      </header>

      <section className={styles.grid} aria-label="Photos gallery">
        {IMAGE_LIST.map((img, i) => (
          <button
            key={img.id}
            type="button"
            className={styles.thumbBtn}
            onClick={() => openAt(i)}
            aria-label={`Open photo ${img.caption}`}
          >
            <img
              src={img.src}
              alt={img.caption}
              className={styles.thumb}
              loading="lazy"
            />
            <div className={styles.thumbOverlay}>
              <div className={styles.caption}>{img.caption}</div>
            </div>
          </button>
        ))}
      </section>

      <footer className={styles.footer}>
        <small>
          Photos repository — updated {new Date().toLocaleDateString()}
        </small>
      </footer>

      {lightboxOpen && (
        <div
          className={styles.lightbox}
          role="dialog"
          aria-modal="true"
          aria-label={`Photo viewer: ${IMAGE_LIST[index].caption}`}
          onClick={(e) => {
            // clicking backdrop closes
            if (e.target === e.currentTarget) close();
          }}
        >
          <div className={styles.lightboxContent}>
            <button
              className={styles.lbClose}
              onClick={close}
              aria-label="Close viewer"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>

            <div className={styles.lbViewer}>
              <button
                className={styles.lbNavLeft}
                onClick={showPrev}
                aria-label="Previous photo"
              >
                <FontAwesomeIcon icon={faChevronLeft} />
              </button>

              <div className={styles.lbImageWrap}>
                <img
                  src={IMAGE_LIST[index].src}
                  alt={IMAGE_LIST[index].caption}
                  className={styles.lbImage}
                />
                <div className={styles.lbCaption}>
                  {IMAGE_LIST[index].caption}
                </div>
                <a
                  className={styles.lbDownload}
                  href={IMAGE_LIST[index].src}
                  download
                  aria-label={`Download ${IMAGE_LIST[index].caption}`}
                >
                  <FontAwesomeIcon icon={faDownload} /> Download
                </a>
              </div>

              <button
                className={styles.lbNavRight}
                onClick={showNext}
                aria-label="Next photo"
              >
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
