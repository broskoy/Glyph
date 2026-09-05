"use client";

import { useState } from 'react';
import Image from 'next/image';
import styles from './Info.module.css';

const SLIDES = [
  { id: 1, image: '/photo_frame.png', text: 'Board of 2026-2027' },
  { id: 2, image: '/photo_frame.png', text: 'Board of 2025-2026' },
  { id: 3, image: '/photo_frame.png', text: 'Board of 2024-2025' },
  { id: 4, image: '/photo_frame.png', text: 'Board of 2023-2024' },
];

export default function InfoCards() {
  const [index, setIndex] = useState(0);

  const goPrev = () => setIndex((i) => (i - 1 + SLIDES.length) % SLIDES.length);
  const goNext = () => setIndex((i) => (i + 1) % SLIDES.length);

  const slide = SLIDES[index];

  return (
    <div className={styles.carousel}>
      <button
        type="button"
        onClick={goPrev}
        className={styles.button}
        aria-label="Previous"
      >
        &#8249;
      </button>

      <div className={styles.container}>
        <div className={styles.imageWrapper}>
          <Image
            src={slide.image}
            alt=""
            fill
            sizes="(min-width: 768px) 360px, 260px"
            priority
            style={{ objectFit: 'contain' }}
            draggable={false}
          />
        </div>

        <p className={styles.text}>{slide.text}</p>
      </div>

      <button
        type="button"
        onClick={goNext}
        className={styles.button}
        aria-label="Next"
      >
        &#8250;
      </button>
    </div>
  );
}