// pages/document-wallet.js
"use client";
import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileLines, // minutes
  faChartBar, // reports
  faEnvelope, // correspondence
  faUsers, // meetings
  faCalendarAlt, // calendar
  faImages, // photos
} from "@fortawesome/free-solid-svg-icons";

import styles from "./DocumentWalletCards.module.css";

function Card({ href, title, icon, shadeClass }) {
  const content = (
    <article
      className={`${styles.card} ${styles[shadeClass]}`}
      aria-label={title}
    >
      <div className={styles.iconWrap}>
        <FontAwesomeIcon icon={icon} className={styles.icon} />
      </div>
      <h3 className={styles.cardTitle}>{title}</h3>
    </article>
  );

  // use Link when href provided, ensure link has no underline and inherits styles
  return href ? (
    <Link href={href} className={styles.cardLink}>
      {content}
    </Link>
  ) : (
    content
  );
}

export default function DocumentWalletPage() {
  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Document Wallet</h1>
        {/* <p className={styles.subtitle}>
          Quick access to minutes, reports, correspondence, meetings, calendar
          and photos.
        </p> */}
      </header>

      <section className={styles.grid}>
        <Card
          href="/minutes"
          title="Minutes"
          icon={faFileLines}
          shadeClass="shade1"
        />
        <Card
          href="/report"
          title="Reports"
          icon={faChartBar}
          shadeClass="shade2"
        />
        <Card
          href="/correspondence"
          title="Correspondence"
          icon={faEnvelope}
          shadeClass="shade3"
        />
        <Card
          href="/meeting"
          title="Meetings"
          icon={faUsers}
          shadeClass="shade4"
        />
        <Card
          href="/calendar"
          title="Calendar"
          icon={faCalendarAlt}
          shadeClass="shade5"
        />
        <Card
          href="/photo"
          title="Photos"
          icon={faImages}
          shadeClass="shade6"
        />
      </section>
    </main>
  );
}
