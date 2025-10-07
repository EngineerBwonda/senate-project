"use client";

import React from "react";
import Link from "next/link";
import styles from "./announcement.module.css";

export default function AnnouncementPage() {
  return (
    <>
      <div className={styles.container}>
        <div className="container mt-0">
          <h1 className={styles.heading}>Meeting Announcements</h1>
          <div className="space-y-6">
            <Link href="/internal-meeting" className={styles.card}>
              <h2 className={styles.title}>Internal Meeting</h2>
              <span className="position-absolute top-0 end-0 badge rounded-pill bg-primary">
                9+
                <span className="visually-hidden">unread messages</span>
              </span>
            </Link>

            <Link href="/meeting" className={styles.card}>
              <h2 className={styles.title}>External Meeting</h2>
              <span className="position-absolute top-0 end-0 badge rounded-pill bg-primary">
                9+
                <span className="visually-hidden">unread messages</span>
              </span>
            </Link>
          </div>

          <h1 className={styles.heading}>Visiting Delegation</h1>
          <div className="space-y-6">
            <Link href="/visitor" className={styles.card}>
              <h2 className={styles.title}>International Delegates</h2>
              <span className="position-absolute top-0 end-0  badge rounded-pill bg-primary">
                9+
                <span className="visually-hidden">unread messages</span>
              </span>
            </Link>

            <Link href="/local" className={styles.card}>
              <h2 className={styles.title}>Local Delegates</h2>
            </Link>

            <Link href="/local-delegates-2" className={styles.card}>
              <h2 className={styles.title}>Local Delegates</h2>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
