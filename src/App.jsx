import { useState, useEffect } from "react";
import { doc, getDoc, updateDoc, onSnapshot } from "firebase/firestore";
import { db } from "./firebase.js";
import { decodeRequest } from "./utils.js";
import { ACTIVITIES } from "./constants.js";
import GrainOverlay from "./components/GrainOverlay.jsx";
import Logo from "./components/Logo.jsx";
import StepDots from "./components/StepDots.jsx";
import CreateScreen from "./screens/CreateScreen.jsx";
import LinkScreen from "./screens/LinkScreen.jsx";
import RecipientScreen from "./screens/RecipientScreen.jsx";
import ConfirmedScreen from "./screens/ConfirmedScreen.jsx";
import NoScreen from "./screens/NoScreen.jsx";

export default function App() {
  const [screen, setScreen] = useState(window.location.hash ? "loading" : "create");
  const [requestData, setRequestData] = useState(null);
  const [shareUrl, setShareUrl] = useState("");
  const [inviteId, setInviteId] = useState(null);
  const [chosenDate, setChosenDate] = useState(null);
  const [chosenActivity, setChosenActivity] = useState(null);
  const [isRecipient, setIsRecipient] = useState(false);

  // On load: detect link type from URL hash
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash) return;

    if (hash.startsWith("inv_")) {
      // Firebase-based invitation
      const id = hash.slice(4);
      getDoc(doc(db, "invitations", id)).then((snap) => {
        if (!snap.exists()) { setScreen("invalid"); return; }
        const d = snap.data();
        if (d.expiresAt && d.expiresAt.toDate() < new Date()) { setScreen("invalid"); return; }
        if (d.status === "accepted") {
          setRequestData(d);
          setChosenDate(d.chosenDate);
          setChosenActivity(ACTIVITIES.find(a => a.id === d.chosenActivityId));
          setScreen("confirmed");
          return;
        }
        if (d.status === "declined") {
          setRequestData(d);
          setScreen("declined");
          return;
        }
        setRequestData(d);
        setInviteId(id);
        setIsRecipient(true);
        setScreen("recipient");
      }).catch(() => setScreen("error"));
    } else {
      // Legacy base64 invitation
      const data = decodeRequest(hash);
      if (data) {
        setRequestData(data);
        setIsRecipient(true);
        setScreen("recipient");
      } else {
        setScreen("invalid");
      }
    }
  }, []);

  // Sender: listen for recipient's response in real time
  useEffect(() => {
    if (!inviteId || isRecipient) return;
    const unsubscribe = onSnapshot(doc(db, "invitations", inviteId), (snap) => {
      if (!snap.exists()) return;
      const d = snap.data();
      if (d.status === "accepted") {
        setChosenDate(d.chosenDate);
        setChosenActivity(ACTIVITIES.find(a => a.id === d.chosenActivityId));
        setScreen("confirmed");
      }
      if (d.status === "declined") {
        setScreen("declined");
      }
    });
    return unsubscribe;
  }, [inviteId, isRecipient]);

  const handleCreate = ({ data, inviteId: id }) => {
    setRequestData(data);
    setInviteId(id);
    setShareUrl(`${window.location.origin}${window.location.pathname}#inv_${id}`);
    setScreen("link");
  };

  const handleYes = async (date, activity) => {
    setChosenDate(date);
    setChosenActivity(activity);
    if (inviteId) {
      await updateDoc(doc(db, "invitations", inviteId), {
        status: "accepted",
        chosenDate: date,
        chosenActivityId: activity.id
      });
    }
    setScreen("confirmed");
  };

  const handleNo = async () => {
    if (inviteId) {
      await updateDoc(doc(db, "invitations", inviteId), { status: "declined" });
    }
    setScreen("no");
  };

  const headerLabel = {
    create: "Ride · Read", link: "Waiting", recipient: "For you",
    confirmed: "It's a date", no: "", declined: "", invalid: ""
  }[screen] ?? "";

  return (
    <div style={{
      minHeight: "100vh", color: "#E8E0D0",
      fontFamily: "'Crimson Text', Georgia, serif",
      background: "#0D0D0D"
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400;1,700&family=Crimson+Text:ital,wght@0,400;0,600;1,400&display=swap');
        * { box-sizing: border-box; }
        input::placeholder, textarea::placeholder { color: #585858; }
        input:focus, textarea:focus { border-color: #6B1E1E !important; outline: none; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #181818; }
        ::-webkit-scrollbar-thumb { background: #6B1E1E; border-radius: 2px; }
      `}</style>

      <div style={{
        position: "fixed", inset: 0, zIndex: 0,
        backgroundImage: "url('/darkromancebg.png')",
        backgroundSize: "cover", backgroundPosition: "center top"
      }} />
      <div style={{
        position: "fixed", inset: 0, zIndex: 0,
        background: "linear-gradient(rgba(8,4,4,0.72) 0%, rgba(8,4,4,0.65) 100%)"
      }} />
      <GrainOverlay />

      <div style={{ maxWidth: "420px", margin: "0 auto", padding: "0 20px 60px", position: "relative", zIndex: 1 }}>
        <div style={{
          padding: "20px 0 16px", display: "flex", justifyContent: "space-between",
          alignItems: "center", borderBottom: "1px solid #252525", marginBottom: "8px"
        }}>
          <Logo />
          <span style={{ fontSize: "10px", color: "#585858", letterSpacing: "0.1em", fontFamily: "Georgia, serif", textTransform: "uppercase" }}>
            {headerLabel}
          </span>
        </div>

        {!isRecipient && screen === "link" && (
          <StepDots current={1} total={2} />
        )}

        {screen === "loading" && (
          <div style={{ animation: "fadeUp 0.5s ease both", textAlign: "center", padding: "80px 0" }}>
            <div style={{ marginBottom: "24px" }}>
              <span style={{
                display: "inline-block", width: "10px", height: "10px", borderRadius: "50%",
                background: "#6B1E1E", animation: "pulse 1.8s ease-in-out infinite"
              }} />
            </div>
            <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "20px", color: "#C4956A", fontStyle: "italic", margin: 0 }}>
              Opening the envelope...
            </p>
          </div>
        )}

        {screen === "create" && <CreateScreen onNext={handleCreate} />}
        {screen === "link" && <LinkScreen data={requestData} url={shareUrl} onBack={() => setScreen("create")} />}
        {screen === "recipient" && <RecipientScreen data={requestData} onYes={handleYes} onNo={handleNo} />}
        {screen === "confirmed" && <ConfirmedScreen data={requestData} date={chosenDate} activity={chosenActivity} />}
        {screen === "no" && <NoScreen senderName={requestData?.from} />}

        {screen === "declined" && (
          <div style={{ animation: "fadeUp 0.5s ease both", textAlign: "center", padding: "60px 0" }}>
            <div style={{ fontSize: "32px", marginBottom: "24px", opacity: 0.4 }}>🖤</div>
            <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "26px", color: "#E8E0D0", fontStyle: "italic", margin: "0 0 16px", lineHeight: 1.4 }}>
              Not this chapter.
            </p>
            <p style={{ fontFamily: "'Crimson Text', Georgia, serif", fontSize: "16px", color: "#707070", lineHeight: 1.7, margin: 0 }}>
              {requestData?.to} has passed this time.<br />Some stories take time to begin.
            </p>
          </div>
        )}

        {screen === "error" && (
          <div style={{ animation: "fadeUp 0.5s ease both", textAlign: "center", padding: "60px 0" }}>
            <div style={{ fontSize: "32px", marginBottom: "24px", opacity: 0.4 }}>📡</div>
            <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "26px", color: "#E8E0D0", fontStyle: "italic", margin: "0 0 16px", lineHeight: 1.4 }}>
              Something went wrong.
            </p>
            <p style={{ fontFamily: "'Crimson Text', Georgia, serif", fontSize: "16px", color: "#707070", lineHeight: 1.7, margin: "0 0 40px" }}>
              Check your connection and try again.
            </p>
            <button onClick={() => window.location.reload()} style={{
              background: "none", border: "1px solid #383838", borderRadius: "8px",
              color: "#707070", fontFamily: "Georgia, serif", fontSize: "12px",
              letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer",
              padding: "14px 24px"
            }}>
              Try again
            </button>
          </div>
        )}

        {screen === "invalid" && (
          <div style={{ animation: "fadeUp 0.5s ease both", textAlign: "center", padding: "60px 0" }}>
            <div style={{ fontSize: "32px", marginBottom: "24px", opacity: 0.3 }}>📖</div>
            <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "26px", color: "#E8E0D0", fontStyle: "italic", margin: "0 0 16px", lineHeight: 1.4 }}>
              This invitation is no longer valid.
            </p>
            <p style={{ fontFamily: "'Crimson Text', Georgia, serif", fontSize: "16px", color: "#707070", lineHeight: 1.7, margin: "0 0 40px" }}>
              The link may be incomplete or expired.<br />Ask the sender to share it again.
            </p>
            <button onClick={() => { window.location.hash = ""; setScreen("create"); }} style={{
              background: "none", border: "1px solid #383838", borderRadius: "8px",
              color: "#707070", fontFamily: "Georgia, serif", fontSize: "12px",
              letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer",
              padding: "14px 24px"
            }}>
              Create a new invitation
            </button>
          </div>
        )}

        <div style={{ textAlign: "center", marginTop: "48px", paddingTop: "24px", borderTop: "1px solid #252525" }}>
          <p style={{ fontSize: "16px", margin: "0 0 6px", opacity: 0.3 }}>🏍️ 📖</p>
          <p style={{ fontSize: "10px", letterSpacing: "0.14em", color: "#505050", fontFamily: "Georgia, serif", textTransform: "uppercase", margin: 0 }}>
            Ride & Read — An intellectual pursuit on two wheels
          </p>
        </div>
      </div>
    </div>
  );
}
