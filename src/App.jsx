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
      minHeight: "100vh", background: "#0D0D0D", color: "#E8E0D0",
      fontFamily: "'Crimson Text', Georgia, serif",
      backgroundImage: "radial-gradient(ellipse at 50% 0%, rgba(107,30,30,0.12) 0%, transparent 60%)"
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400;1,700&family=Crimson+Text:ital,wght@0,400;0,600;1,400&display=swap');
        * { box-sizing: border-box; }
        input::placeholder, textarea::placeholder { color: #3A3A3A; }
        input:focus, textarea:focus { border-color: #6B1E1E !important; outline: none; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #111; }
        ::-webkit-scrollbar-thumb { background: #6B1E1E; border-radius: 2px; }
      `}</style>

      <GrainOverlay />

      <div style={{ maxWidth: "420px", margin: "0 auto", padding: "0 20px 60px" }}>
        <div style={{
          padding: "20px 0 16px", display: "flex", justifyContent: "space-between",
          alignItems: "center", borderBottom: "1px solid #1A1A1A", marginBottom: "8px"
        }}>
          <Logo />
          <span style={{ fontSize: "10px", color: "#3A3A3A", letterSpacing: "0.1em", fontFamily: "Georgia, serif", textTransform: "uppercase" }}>
            {screen === "create" ? "Ride · Read" : screen === "link" ? "Ready" : screen === "recipient" ? "For you" : screen === "yes" ? "It's a date" : ""}
          </span>
        </div>

        {!isRecipient && screen !== "create" && (
          <StepDots current={screen === "link" ? 1 : 0} total={2} />
        )}

        {screen === "create" && <CreateScreen onNext={handleCreate} />}
        {screen === "link" && <LinkScreen data={requestData} url={shareUrl} onBack={() => setScreen("create")} />}
        {screen === "recipient" && <RecipientScreen data={requestData} onYes={handleYes} onNo={() => setScreen("no")} />}
        {screen === "yes" && <YesScreen data={requestData} date={chosenDate} activity={chosenActivity} />}
        {screen === "no" && <NoScreen senderName={requestData?.from} />}

        <div style={{ textAlign: "center", marginTop: "48px", paddingTop: "24px", borderTop: "1px solid #1A1A1A" }}>
          <p style={{ fontSize: "16px", margin: "0 0 6px", opacity: 0.3 }}>🏍️ 📖</p>
          <p style={{ fontSize: "10px", letterSpacing: "0.14em", color: "#2A2A2A", fontFamily: "Georgia, serif", textTransform: "uppercase", margin: 0 }}>
            Ride & Read — An intellectual pursuit on two wheels
          </p>
        </div>
      </div>
    </div>
  );
}
