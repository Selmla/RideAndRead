import { useState, useEffect } from "react";
import { decodeRequest } from "./utils.js";
import GrainOverlay from "./components/GrainOverlay.jsx";
import Logo from "./components/Logo.jsx";
import StepDots from "./components/StepDots.jsx";
import CreateScreen from "./screens/CreateScreen.jsx";
import LinkScreen from "./screens/LinkScreen.jsx";
import RecipientScreen from "./screens/RecipientScreen.jsx";
import YesScreen from "./screens/YesScreen.jsx";
import NoScreen from "./screens/NoScreen.jsx";

export default function App() {
  const [screen, setScreen] = useState("create");
  const [requestData, setRequestData] = useState(null);
  const [shareUrl, setShareUrl] = useState("");
  const [chosenDate, setChosenDate] = useState(null);
  const [chosenActivity, setChosenActivity] = useState(null);
  const [isRecipient, setIsRecipient] = useState(false);

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) {
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

  const handleCreate = ({ data, url }) => {
    setRequestData(data);
    setShareUrl(url);
    setScreen("link");
  };

  const handleYes = (date, activity) => {
    setChosenDate(date);
    setChosenActivity(activity);
    setScreen("yes");
  };

  return (
    <div style={{
      minHeight: "100vh", color: "#E8E0D0",
      fontFamily: "'Crimson Text', Georgia, serif",
      background: "#0D0D0D",
      backgroundImage: "linear-gradient(rgba(8,4,4,0.72) 0%, rgba(8,4,4,0.65) 100%), url('/darkromancebg.png')",
      backgroundSize: "cover",
      backgroundPosition: "center top",
      backgroundAttachment: "fixed"
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

      <GrainOverlay />

      <div style={{ maxWidth: "420px", margin: "0 auto", padding: "0 20px 60px", position: "relative", zIndex: 1 }}>
        <div style={{
          padding: "20px 0 16px", display: "flex", justifyContent: "space-between",
          alignItems: "center", borderBottom: "1px solid #252525", marginBottom: "8px"
        }}>
          <Logo />
          <span style={{ fontSize: "10px", color: "#585858", letterSpacing: "0.1em", fontFamily: "Georgia, serif", textTransform: "uppercase" }}>
            {screen === "create" ? "Ride · Read" : screen === "link" ? "Ready" : screen === "recipient" ? "For you" : screen === "yes" ? "It's a date" : screen === "invalid" ? "" : ""}
          </span>
        </div>

        {!isRecipient && screen !== "create" && (
          <StepDots current={screen === "link" ? 1 : 0} total={2} />
        )}

        {screen === "create" && <CreateScreen onNext={handleCreate} />}
        {screen === "link" && <LinkScreen data={requestData} url={shareUrl} onBack={() => setScreen("create")} />}
        {screen === "recipient" && <RecipientScreen data={requestData} onYes={handleYes} onNo={() => setScreen("no")} />}
        {screen === "yes" && <YesScreen data={requestData} date={chosenDate} activity={chosenActivity} />}
        {screen === "no" && <NoScreen data={requestData} />}
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
