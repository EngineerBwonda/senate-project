// components/ModalConfirm.jsx
"use client";

import React, { useEffect, useRef } from "react";

/**
 * ModalConfirm
 * Props:
 * - open: boolean
 * - title: string
 * - body: ReactNode or string
 * - onCancel: () => void
 * - onConfirm: () => void
 * - confirmLabel: string (optional)
 * - cancelLabel: string (optional)
 *
 * This modal uses Bootstrap CSS classes only (no Bootstrap JS).
 * Customize this component separately to change look & text.
 */

export default function ModalConfirm({
  open,
  title = "Confirm",
  body = "Are you sure?",
  onCancel = () => {},
  onConfirm = () => {},
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
}) {
  const modalRef = useRef(null);

  // focus management and body scroll lock
  useEffect(() => {
    if (open) {
      document.body.classList.add("modal-open");
      setTimeout(() => modalRef.current?.focus?.(), 0);
      return;
    }
    document.body.classList.remove("modal-open");
    return () => document.body.classList.remove("modal-open");
  }, [open]);

  // Escape to close
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onCancel();
    }
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onCancel]);

  if (!open) return null;

  return (
    <div
      className="modal d-block"
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target === e.currentTarget) onCancel();
      }}
    >
      <div className="modal-backdrop show" />
      <div
        className="modal-dialog modal-dialog-centered"
        role="document"
        style={{ pointerEvents: "none" }}
      >
        <div
          ref={modalRef}
          className="modal-content"
          role="document"
          style={{ pointerEvents: "auto" }}
        >
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={onCancel}
            />
          </div>

          <div className="modal-body">
            {typeof body === "string" ? <p>{body}</p> : body}
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onCancel}
            >
              {cancelLabel}
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={onConfirm}
            >
              {confirmLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
