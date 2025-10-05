"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee, faCalendar, faCog } from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  return (
    <div>
      <h1>Dashboard</h1>
      <FontAwesomeIcon icon={faCoffee} size="3x" />
      <FontAwesomeIcon icon={faCalendar} className="text-blue-500" />
      <FontAwesomeIcon icon={faCog} spin />
    </div>
  );
}
