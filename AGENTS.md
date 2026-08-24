<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Glyph - Art Association Website (Documentation)

## Overview
Glyph is a dynamic website built for a university art association. It serves as both an informational landing site for the organization and an interactive digital gallery where authenticated members can upload and showcase their artwork.

## Current Architecture & Tech Stack
The project evolved from a static prototype into a fully production-ready, serverless application.

### Frontend
- **Framework:** Next.js (App Router) & React.
- **Styling:** Pure Vanilla CSS. The aesthetic strictly follows a dark, "glassmorphism" design system with vibrant gradients.
- **Interactivity:** Relies heavily on CSS micro-animations (`pop-hover`, fade-ins) and a dynamic, fluid background component to make the UI feel alive.

### Backend & Infrastructure
- **Hosting:** Vercel.
- **Database:** Vercel Postgres, managed via the **Prisma ORM**.
- **Image Storage:** Vercel Blob (direct cloud streaming for uploads).
- **Authentication:** **NextAuth.js** (Credentials Provider). 
  - Sessions are managed securely via JWTs.
  - Passwords are encrypted using `bcryptjs`.

## Core Features & Pages

1. **Home (`/`)**: Landing page featuring a staggered, letter-by-letter entrance animation for the "GLYPH" branding and an interactive background.
2. **Gallery (`/gallery`)**: 
   - A seamless masonry grid displaying uploaded artworks.
   - **Upload Modal:** A secure popup allowing members to upload files (which stream directly to Vercel Blob).
   - **Interactions:** Hovering over an artwork reveals its title, artist, and a "pop" animated Like button.
3. **The Team (`/people`)**: Showcases the association's core members using a custom, interactive 3D `CardCarousel` UI.
4. **Authentication & Roles**:
   - **Guest**: Can view the site and gallery, but cannot upload or like art.
   - **Member (`/login`)**: Authenticated users who can upload art and interact with the gallery.
   - **Admin (`/admin`)**: A highly secure dashboard page restricted to administrators. Used to manually generate and securely encrypt new Member accounts (bypassing public registration to prevent spam).
5. **Dynamic Navigation (`UserMenu.tsx`)**: The top right of the screen features a glassmorphic dropdown menu that dynamically renders Login/Logout/Admin options based on the user's current session state.

## Security & API Design
- **Strict Server Verification:** API routes (like `/api/upload` and `/api/artworks/[id]/like`) use `getServerSession` to mathematically verify the user's token before interacting with the database.
- **Foreign Keys:** Uploaded artworks are tied strictly to the authenticated `user.id` pulled from the secure server session, meaning users cannot spoof uploads as someone else.

## Maintenance Notes for Future Developers
- **Prisma:** If you make changes to `prisma/schema.prisma`, remember to run `npx prisma db push` to sync with Vercel Postgres. Ensure `package.json` contains `"postinstall": "prisma generate"` to prevent Vercel caching errors.
- **Styling Guidelines:** Do NOT introduce Tailwind CSS. Continue using the established Vanilla CSS design tokens (e.g., `var(--glass-bg)`, `var(--gradient-warm)`) located in `globals.css` to maintain the premium aesthetic.
