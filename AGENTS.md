<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Glyph - Art Association Website

## Overview
A dynamic website for the university's art association, allowing users to view information about the association and a gallery where users can post and view artworks.

## Pages
1. **Home**: Landing page with highlights, latest news, or featured artworks.
2. **Info**: About the association, members, how to join, contact info.
3. **Activities**: Upcoming events, workshops, past activities.
4. **Gallery**: The core dynamic feature. A masonry or grid layout displaying artworks uploaded by users. 

## Features
- **User Authentication**: (Optional but recommended) Users might need to log in to post art, or maybe it's open (though that invites spam).
- **Image Uploads**: Allowing users to upload image files (JPEG, PNG, etc.) for their artworks.
- **Dynamic Data**: Storing information about each artwork (title, artist name, description, image URL).

## Proposed Tech Stack (Architecture)

Since the website needs to be dynamic (users uploading images and data), a purely static site won't be enough. Here is a recommended modern architecture that is easy to build and scale:

### Frontend (User Interface)
- **Framework**: [Next.js](https://nextjs.org/) (React) or [Vite](https://vitejs.dev/) with React. Next.js is great because it supports both static pages (for Info, Home) and dynamic API routes (for handling uploads).
- **Styling**: Vanilla CSS (CSS Modules) to create a premium, bespoke aesthetic, giving us maximum control over complex layouts (masonry) and micro-animations.

## Design Decisions
- **Color Palette**: A premium dark theme featuring vibrant gradients, paired with crisp white text and icons to ensure the artworks remain the focal point.
- **Typography**: A modern, geometric font (e.g., Outfit) for a sleek and artistic aesthetic.
- **Layout & Navigation**: A global Header containing the association's logo and a Burger Menu for mobile/desktop. The Footer will be exclusive to the Home page to keep other pages clean.
- **Gallery UX**: A seamless Masonry grid. Artwork metadata (Title, Artist, and a Like Button) will appear via a smooth, dark gradient overlay when the user hovers over an image.
- **Animations**: 
  - Text: Staggered, letter-by-letter fade-ins for impactful headers.
  - Interactions: Micro-animations (like a "pop" effect when clicking the Like heart) to make the UI feel responsive and alive.

### Backend & Database (Data & Storage)
- **Database**: [Supabase](https://supabase.com/) or [Firebase](https://firebase.google.com/). These Backend-as-a-Service (BaaS) platforms provide a PostgreSQL/NoSQL database to store artwork metadata (titles, artist, etc.) out-of-the-box.
- **Storage**: We will need object storage (like AWS S3, Supabase Storage, or Firebase Storage) to actually host the image files uploaded by users.

### Deployment
- **Hosting**: [Vercel](https://vercel.com/) or [Netlify](https://www.netlify.com/). They are free, incredibly fast, and integrate perfectly with Next.js or Vite.

## Development Phases
1. **Phase 1: Static Prototyping** - Build the 4 pages statically to get the design and layout right.
2. **Phase 2: Database Integration** - Set up the database and connect the Gallery page to fetch real data.
3. **Phase 3: Upload Functionality** - Create the form for users to upload their artworks.
