"use client";

import { useState } from "react";
import ActivityFormModal from "./ActivityFormModal";

export default function PostActivityButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="pop-hover" style={{
        padding: 'clamp(0.5rem, 2vw, 0.8rem) clamp(1rem, 4vw, 1.8rem)',
        background: 'var(--gradient-warm)',
        border: 'none',
        borderRadius: '24px',
        color: 'white',
        fontWeight: '900',
        fontSize: 'clamp(1rem, 3vw, 1.5rem)',
        cursor: 'pointer',
        boxShadow: '0 8px 20px rgba(255, 51, 102, 0.4)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
      }}>
        <span>POST</span>
        <span style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', lineHeight: 0.8, fontWeight: '400' }}>+</span>
      </button>

      {isOpen && (
        <ActivityFormModal onClose={() => setIsOpen(false)} />
      )}
    </>
  );
}
