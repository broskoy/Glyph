"use client";

import styles from "./InteractiveBackground.module.css";

export default function InteractiveBackground() {
  return (
    <div className={styles.container}>
      {/* Layer 1: Darkest Navy/Purple base */}
      <div className={styles.baseLayer}></div>

      {/* 
        We switched to viewBox 1440x1000 and preserveAspectRatio="none".
        This guarantees the top and bottom will NEVER get cut off on any screen size.
        We also pushed the curves much further to the right edge.
      */}

      {/* Layer 2: Deep Dark Purple */}
      <svg className={`${styles.layer} ${styles.layer2}`} viewBox="0 0 1440 1000" preserveAspectRatio="none">
        <path fill="#2e1547" d="M1440,0 L900,0 C700,250 1300,500 800,1000 L1440,1000 Z" />
      </svg>

      {/* Layer 3: Dark Magenta */}
      <svg className={`${styles.layer} ${styles.layer3}`} viewBox="0 0 1440 1000" preserveAspectRatio="none">
        <path fill="#5f1345" d="M1440,0 L1050,0 C900,300 1400,450 1000,1000 L1440,1000 Z" />
      </svg>

      {/* Layer 4: Deep Red/Pink */}
      <svg className={`${styles.layer} ${styles.layer4}`} viewBox="0 0 1440 1000" preserveAspectRatio="none">
        <path fill="#95164c" d="M1440,0 L1200,0 C1100,350 1440,400 1150,1000 L1440,1000 Z" />
      </svg>

      {/* Layer 5: Bright Red/Pink (Top-most) */}
      <svg className={`${styles.layer} ${styles.layer5}`} viewBox="0 0 1440 1000" preserveAspectRatio="none">
        <path fill="#e62557" d="M1440,0 L1350,0 C1300,400 1440,350 1250,1000 L1440,1000 Z" />
      </svg>
    </div>
  );
}
