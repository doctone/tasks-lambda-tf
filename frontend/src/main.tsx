import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Nav } from "./components/Nav.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <main className="bg-gray-100 dark:bg-gray-900 min-h-screen font-mono">
      <Nav />
      <App />
    </main>
  </StrictMode>
);
