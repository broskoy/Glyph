"use client";

import { useState } from "react";
import Image from "next/image";

type Activity = {
  id: number;
  title: string;
  date: string;
  time: string | null;
  location: string;
  description: string | null;
  image?: string | null;
};

import ActivityFormModal from "./ActivityFormModal";
import styles from "./ActivityCard.module.css";

const FALLBACK_IMAGE = "/photo_frame.png";

export default function ActivityCard({ event, isAdmin = false }: { event: Activity, isAdmin?: boolean }) {
  const [showDetails, setShowDetails] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const toggle = () => setShowDetails((v) => !v);

  return (
    <>
      <div className={styles.cardWrap}>
        <div
          role="button"
          tabIndex={0}
          aria-expanded={showDetails}
          aria-label={showDetails ? `Hide details for ${event.title}` : `Show details for ${event.title}`}
          onClick={toggle}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              toggle();
            }
          }}
          className={styles.card}
        >
          <div className={styles.content}>
            {showDetails ? (
              <div key="details" className={`${styles.fade} ${styles.details}`}>
                <div className={styles.detailsText}>
                  <h2 className={styles.title}>{event.title}</h2>
                  <p className={styles.description}>
                    {event.description || "No description provided."}
                  </p>
                </div>

                <div className={styles.photo}>
                  <Image
                    src={event.image || FALLBACK_IMAGE}
                    alt=""
                    fill
                    sizes="(min-width: 600px) 200px, 35vw"
                    style={{ objectFit: "cover" }}
                    draggable={false}
                  />
                </div>
              </div>
            ) : (
              <div key="summary" className={`${styles.fade} ${styles.summary}`}>
                <p className={styles.date}>
                  {event.date}{event.time && ` • ${event.time}`}
                </p>
                <h2 className={styles.title}>{event.title}</h2>
                <p className={styles.location}> {event.location}</p>
              </div>
            )}
          </div>
        </div>

        {isAdmin && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsEditModalOpen(true);
            }}
            className={`pop-hover ${styles.iconButton}`}
            aria-label={`Edit ${event.title}`}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
            </svg>
          </button>
        )}
      </div>

      {isEditModalOpen && (
        <ActivityFormModal initialData={event} onClose={() => setIsEditModalOpen(false)} />
      )}
    </>
  );
}