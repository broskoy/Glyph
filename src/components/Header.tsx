"use client";

import Link from "next/link";
import { useState } from "react";
import styles from "./Header.module.css";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoIcon}>G</span>
          <span className={styles.logoText}>GLYPH</span>
        </Link>

        {/* Global Burger Icon */}
        <button className={styles.burgerBtn} onClick={toggleMenu} aria-label="Toggle menu">
          <div className={`${styles.burgerLine} ${isMenuOpen ? styles.open1 : ""}`}></div>
          <div className={`${styles.burgerLine} ${isMenuOpen ? styles.open2 : ""}`}></div>
          <div className={`${styles.burgerLine} ${isMenuOpen ? styles.open3 : ""}`}></div>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.mobileOpen : ""}`}>
        <nav className={styles.mobileNav}>
          <Link href="/" onClick={toggleMenu}>Home</Link>
          <Link href="/gallery" onClick={toggleMenu}>Gallery</Link>
          <Link href="/activities" onClick={toggleMenu}>Activities</Link>
          <Link href="/info" onClick={toggleMenu}>Info</Link>
        </nav>
      </div>
    </header>
  );
}
