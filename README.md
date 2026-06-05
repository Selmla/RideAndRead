# Ride & Read 📖🏍️

A private date-request app for the person who reads between rides and rides between chapters.

Send a beautifully crafted invitation. They pick a date and an adventure. You both find out at the same time.

---

## What it does

**Sender flow**
1. Fill in your name, their name, proposed dates and time
2. Choose up to 5 activities — from bookshop visits to night rides
3. Optionally add a personal message
4. Share the link through any channel

**Recipient flow**
1. Opens the link — no account needed
2. Sees the invitation and any personal message
3. Picks a date and an activity
4. Taps "I'm in" — the sender's screen updates instantly

**Both**
- See the confirmed date and activity together
- Download a calendar invite (.ics)

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
- [Firebase Firestore](https://firebase.google.com) — real-time invitation state
- Deployed on [Vercel](https://vercel.com)

---

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

### Environment variables

Create a `.env.local` file in the project root:

```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

---

## Project structure

```
src/
├── firebase.js           # Firebase init
├── constants.js          # Activities and vibe labels
├── utils.js              # ICS generation and invite ID
├── components/
│   ├── ActivityDropdown.jsx
│   ├── GrainOverlay.jsx
│   ├── Logo.jsx
│   └── StepDots.jsx
├── screens/
│   ├── CreateScreen.jsx
│   ├── LinkScreen.jsx
│   ├── RecipientScreen.jsx
│   ├── ConfirmedScreen.jsx
│   └── NoScreen.jsx
└── App.jsx
```

---

*An intellectual pursuit on two wheels.*
