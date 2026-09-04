"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import "./General.css";

export default function Navigation() {
  const pathname = usePathname();
  const [shifted, setShifted] = useState(false);

  const links = [
    { name: '',           href: '/',      top: '15%', left: '7%' },
    { name: 'LOGIN',      href: '/login',      top: '15%', left: '21.25%' },
    { name: 'HOME',       href: '/',           top: '15%', left: '35.25%' },
    { name: 'ART',        href: '/gallery',    top: '15%', left: '49.5%' },
    { name: 'ACTIVITIES', href: '/activities', top: '15%', left: '63.75%' },
    { name: 'INFO',       href: '/info',       top: '15%', left: '78%' },
  ];

  return (
    <nav className="navigation-background" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 100,
      transform: shifted ? 'translateX(0%)' : 'translateX(-85%)',
      transition: 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
    }}>
      {links.map((link) => {
        const isActive = pathname === link.href;

        return (
          <Link
            key={link.name}
            href={link.href}
            className="pop-hover"
            style={{
              position: 'absolute',
              top: link.top,
              left: link.left,
              transform: 'translate(-50%, -50%)',
              color: isActive ? "white" : "var(--text-secondary)",
              whiteSpace: "nowrap",
              transition: "all 0.2s ease",
            }}
          >
            {link.name}
          </Link>
        );
      })}

      <button
        onClick={() => setShifted(!shifted)}
        aria-expanded={shifted}
        aria-label={shifted ? "Move navigation back" : "Move navigation right"}
        className="pop-hover nav-toggle"
        style={{
          position: 'absolute',
          top: '15%',
          left: '92%',
          transform: 'translate(-50%, -50%)',
          color: "var(--text-secondary)",
          transition: "all 0.2s ease",
        }}
      >
        {shifted ? 'MENU' : 'MENU'}
      </button>
    </nav>
  );
}