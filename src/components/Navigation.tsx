"use client";

import { useState } from 'react';
import Link from 'next/link';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: 'Home', href: '/' },
    { name: 'People', href: '/people' },
    { name: 'Info', href: '/info' },
    { name: 'Activities', href: '/activities' },
    { name: 'Gallery', href: '/gallery' },
  ];

  return (
    <>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="pop-hover"
        style={{
          position: 'fixed',
          top: 'clamp(1rem, 3vw, 2rem)',
          left: 'clamp(1rem, 3vw, 2rem)',
          zIndex: 100,
          background: 'none',
          border: 'none',
          color: 'white',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem'
        }}
      >
        <span style={{
          fontSize: 'clamp(1.5rem, 5vw, 2.5rem)',
          display: 'inline-block',
          width: 'clamp(1.5rem, 5vw, 2.5rem)', // Fixed width prevents the text next to it from shifting
          textAlign: 'center',
          lineHeight: 1,
          transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          // Apply a 1px optical adjustment downwards so it perfectly aligns with the text baseline
          transform: isOpen ? 'rotate(180deg) translateY(-1px)' : 'rotate(0deg) translateY(1px)',
        }}>
          {isOpen ? '✕' : '☰'}
        </span>
        <span style={{
          fontSize: 'clamp(1.2rem, 4vw, 2rem)',
          fontWeight: '800',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          lineHeight: 1
        }}>
          Pages
        </span>
      </button>

      {/* The transparent container floating over the page */}
      <div style={{
        position: 'fixed',
        top: 'clamp(3.5rem, 8vw, 5.5rem)',
        left: 'clamp(1rem, 3vw, 2rem)',
        zIndex: 99,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '0.5rem',
        pointerEvents: isOpen ? 'auto' : 'none',
      }}>
        {links.map((link, index) => (
          <Link 
            key={link.name} 
            href={link.href}
            onClick={() => setIsOpen(false)}
            style={{
              color: 'rgba(255, 255, 255, 0.6)', // Faded white for better hierarchy
              fontSize: 'clamp(1.5rem, 5vw, 2rem)',
              fontWeight: '800',
              textTransform: 'uppercase',
              textDecoration: 'none',
              // Animation logic: staggering the left-to-right reveal
              opacity: isOpen ? 1 : 0,
              transform: isOpen ? 'translateX(0)' : 'translateX(-50px)',
              transition: `opacity 0.4s ease ${index * 0.1}s, transform 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.1}s`,
            }}
            className="nav-link-item"
          >
            {link.name}
          </Link>
        ))}
      </div>
    </>
  );
}
