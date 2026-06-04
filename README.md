# Ride & Read 📖🏍️

A private date-request app for the person who reads between rides and rides between chapters.

Send a beautifully crafted invitation link to someone. They pick a date and an adventure. You get an SMS.

---

## What it does

**Sender flow**
1. Fill in your name, their name, and your phone number
2. Propose up to three dates and a time
3. Choose up to 5 activities — from bookshop visits to night rides
4. Optionally add a personal message
5. Get a shareable link to send through any channel

**Recipient flow**
1. Opens the link — no account needed
2. Sees the invitation and any personal message
3. Picks a date and an activity
4. Downloads a calendar invite (.ics)
5. Sends an SMS reply directly from their phone

All data lives in the URL — no backend, no database, no tracking.

---

## Activities

| Vibe | Options |
|------|---------|
| 📚 Booktok | Bookshop, bookshop café, book swap, secret reading spot outdoors |
| 🏍️ Biker | Scenic ride, roadside fika, motorcycle meet, night ride |
| 🌙 Both worlds | Night market, drive-in cinema, hike + coffee, mystery dinner |

---

## Tech stack

- [React 19](https://react.dev)
- [Vite 8](https://vite.dev)
- No backend — state is encoded in the URL hash

---

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

---

## Project structure

```
src/
├── constants.js          # Activities and vibe labels
├── utils.js              # URL encoding and ICS generation
├── components/
│   ├── ActivityDropdown.jsx
│   ├── GrainOverlay.jsx
│   ├── Logo.jsx
│   └── StepDots.jsx
├── screens/
│   ├── CreateScreen.jsx
│   ├── LinkScreen.jsx
│   ├── RecipientScreen.jsx
│   ├── YesScreen.jsx
│   └── NoScreen.jsx
└── App.jsx
```

---

*An intellectual pursuit on two wheels.*
