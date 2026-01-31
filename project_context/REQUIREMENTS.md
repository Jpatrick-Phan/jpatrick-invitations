# Project Requirements: Premium Online Invitation Platform

## 1. Project Overview
A high-end, responsive, and customizable online invitation platform. Initially targeting Weddings, but architected to support other events (Graduation, Parties) via theming.
**Key Philosophy**: "WOW" factor for the Guest, "Power & Simplicity" for the Host (Admin).

## 2. User Stories
### Admin (Host)
- As an admin, I want to access a private dashboard (`/admin`) protected by a PIN code.
- As an admin, I want to manage multiple event cards (Wedding, Graduation, etc.) from a single dashboard.
- As an admin, I want to edit text content (Names, Dates, Stories) via a visual form builder.
- As an admin, I want to upload and manage images/music via a built-in **Media Library**.
- As an admin, I want to perform advanced edits using a **Raw JSON Editor** (Source Code).
- As an admin, I want to toggle features (e.g., turn off "Money Box").
- As an admin, I want to switch themes (Wedding <-> Graduation) to preview.
- As an admin, I want to see the changes immediately on the main site.

### Guest (End User)
- As a guest, I want to open the invitation on my phone and see a beautiful, smooth opening animation.
- As a guest, I want to clearly see the "Who, When, Where" details immediately.
- As a guest, I want to enter a **Password** if the event is private.
- As a guest, I want to see my name personally addressed (e.g., "Dear Tuan") if provided in the link.
- As a guest, I want to easily navigate to the venue using Google Maps integration.
- As a guest, I want to view a photo gallery of the couple/graduate.
- As a guest, I want to send an RSVP so the host knows I'm coming.
- As a guest, I want to send a congratulatory message or gift (money transfer) easily.

### Host (Admin/Config)
- As a host, I want to set visibility levels (**Public/Private**) for my cards.
- As a host, I want to set a **Password** for private events.
- As a host, I want to easily copy an existing card's structure to create a new one (JSON Copy/Paste).

## 3. Functional Requirements
1.  **Hero Section**: Full-screen, emotional impact (Video/High-res Image), Animated Intro.
2.  **Invitation Card**: Specific details (Bride/Groom names or Graduate name, Parents' names, Time, Date).
3.  **Timeline**: Love story or Academic journey milestones (Vertical scroll animation).
4.  **Gallery**: Grid layout offering fullscreen lightbox viewing.
5.  **Countdown**: Dynamic countdown timer to the event date.
6.  **Maps**: Integration with Google Maps for venue location.
7.  **RSVP Form**: Name, Phone, Number of guests, Attending (Yes/No), Note.
8.  **Wishes/Guestbook**: Public appearing list of wishes (optional) or just sent to host.
9.  **Money Box (QR)**: Modal to show Banking QR codes with copy-to-clipboard for account numbers.
10. **Background Music**: Auto-play (if browser allows) or prominent Play button. Persistent across sections.

## 4. Non-Functional Requirements (Performance & UX)
-  **Performance**: Google Lighthouse Score > 90 (Performance, Accessibility, Best Practices, SEO).
-  **Loading**: Crucial. First Contentful Paint (FCP) under 1.5s.
-  **Animations**: 60fps animations. Use `transform` and `opacity` only. Avoid layout thrashing.
-  **Responsive**: "Mobile obsession". It must look better on mobile than desktop.
-  **SEO**: Dynamic metadata (Open Graph image) so sharing link on Zalo/Facebook looks good.

## 5. Technical Constraints
-  **No Heavy Frameworks for UI**: Use Vanilla CSS / CSS Modules. No Bootstrap/Tailwind unless necessary (Preference: Vanilla for control).
-  **Zero Layout Shift**: Images must have dimensions reserved.
