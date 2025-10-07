"use client";
import React from "react";
import SyncLoader from "react-spinners/SyncLoader";
import styles from "./loading.module.css";

export default function Loading() {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.loaderWrapper}>
        <SyncLoader color="#2563eb" size={15} margin={5} speedMultiplier={1} />
        <span className={styles.loadingText}>Loading...</span>
      </div>
    </div>
  );
}
