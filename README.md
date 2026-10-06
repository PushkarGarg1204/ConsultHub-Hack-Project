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
