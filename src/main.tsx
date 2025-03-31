import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ChallengeProgressProvider } from "./contexts/ChallengeContext.tsx";

createRoot(document.getElementById("root")!).render(
  <ChallengeProgressProvider>
    <App />
  </ChallengeProgressProvider>
);
