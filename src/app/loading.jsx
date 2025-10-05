"use client"; // if using App Router

import ClipLoader from "react-spinners/ClipLoader";
import SyncLoader from "react-spinners/SyncLoader";

export default function Loading() {
  return (
    <SyncLoader color="#2563eb" size={15} margin={5} speedMultiplier={35} />
  );
}
