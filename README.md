<<<<<<< HEAD
# ConsultHUB — Local JSON Demo

ConsultHUB is a student-first guidance platform demo:

**Student problem → AI-style classification → verified mentor matching → short consultation → demo payment → session**

## No backend or API keys required

This version intentionally uses local JSON data and browser `localStorage`.

It does **not** require:
- MongoDB
- OpenAI API key
- Razorpay
- Google OAuth
- Any external API
- Node/Express backend

## Run it

Requirements: Node.js 18+

```bash
npm install
npm run dev
```

Open:

```text
http://localhost:5173
```

## Demo login

```text
Email: student@consulthub.local
Password: Demo@123
```

You can also create a new student account from **Sign up**.

## Where the dummy data lives

The main demo data is in:

```text
src/mock-data.json
```

It contains:
- demo users
- verified mentors
- saved mentors
- sample messages
- empty bookings that are populated by the UI

The app copies this JSON into browser `localStorage` on first run. That means bookings, saved mentors and new accounts remain after refresh on the same browser.

## AI matching without an API

The matching logic is intentionally local and deterministic. It looks for keywords such as:

- Resume / CV / LinkedIn → Resume
- interview / mock interview → Interview
- project / GitHub / MERN → Projects
- internship → Internships
- job / placement → Job Search
- DSA / coding / JavaScript → Skills
- exam / semester / IGNOU → Exams
- course / education → Courses

It then ranks the dummy verified mentors by category relevance.

## Demo payment

The **Confirm booking** action creates a fake payment ID such as:

```text
DEMO_PAYMENT_...
```

No money is charged.

## Reset demo data

In the browser DevTools, open **Application → Local Storage** and delete:

```text
consultHubDemoData
consultHubDemoUser
```

Then refresh the page.

## Production integrations later

When the hackathon MVP is ready, the local adapters can be replaced with:

- real database
- real authentication
- OpenAI or another model
- Razorpay payment verification
- real audio/video consultation provider
- admin mentor verification
- realtime messaging
=======
# ConsultHub (React + Vite, front-end only)

    npm install
    npm run dev      # http://localhost:5173
    npm run build    # production build in /dist

No backend: login/sign up, bookings, messages and saves live in memory and reset on refresh.
The theme choice is remembered in localStorage.

Structure: `src/Landing.jsx` (home + login/sign up), `src/Shell.jsx` (app layout: bottom nav on phones, sidebar on desktop), `src/pages/*` (Home, Sessions, Messages, Saved, Profile).

## Changes in this version
- New logo (`components/Logo.jsx`, `public/favicon.svg`): a "C" with a yellow hub dot.
- Profile rebuilt: banner, centered photo, Edit Profile (upload photo / pick avatar / name / email / headline), credits with Top Up, settings with switches. Booking now deducts credits.
- Mobile: minimal flat styling, tighter spacing, centered layout, no horizontal overflow on 320px screens, scroll lock under sheets, chat fits above the nav and auto-scrolls.
>>>>>>> c527d2984538c1c3cb131e57d41ce3b46214962e
