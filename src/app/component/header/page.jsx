"use client";

import React from "react";
import styles from "./header.module.css";

export default function HeaderPage() {
  return (
    <header className={styles.header}>
      <div className={styles.logoWrapper}>
        <img
          src="/senate logo.png"
          alt="Senate Liaison Office Logo"
          className={styles.logoImage}
        />
        <span className={styles.logoText}>Senate Liaison Office</span>
      </div>
    </header>
  );
}
