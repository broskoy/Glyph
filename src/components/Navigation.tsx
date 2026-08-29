"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();

  const links = [
    {
      name: 'Home',
      href: '/',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      )
    },
    {
      name: 'Gallery',
      href: '/gallery',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <polyline points="21 15 16 10 5 21" />
        </svg>
      )
    },
    {
      name: 'Activities',
      href: '/activities',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      )
    },
    {
      name: 'Info',
      href: '/info',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      )
    },
  ];

  return (
    <nav style={{
      position: 'fixed',
      top: 'clamp(1rem, 3vw, 2rem)',
      left: 'clamp(1rem, 3vw, 2rem)',
      zIndex: 100,
      display: 'flex',
      gap: 'clamp(0.5rem, 2vw, 1rem)'
    }}>
      {links.map((link) => {
        const isActive = pathname === link.href;

        return (
          <Link
            key={link.name}
            href={link.href}
            title={link.name}
            className="pop-hover"
            style={{
              background: isActive ? "rgba(255, 255, 255, 0.15)" : "rgba(255, 255, 255, 0.05)",
              border: isActive ? "1px solid rgba(255, 255, 255, 0.3)" : "1px solid var(--glass-border)",
              borderRadius: "50%",
              width: "clamp(2.5rem, 8vw, 3.5rem)",
              height: "clamp(2.5rem, 8vw, 3.5rem)",
              color: isActive ? "white" : "var(--text-secondary)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backdropFilter: "blur(10px)",
              transition: "all 0.2s ease"
            }}
          >
            {link.icon}
          </Link>
        );
      })}
    </nav>
  );
}
