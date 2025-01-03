import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Nav } from "./components/Nav.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import { TaskList } from "./pages/TaskList.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <main className="bg-gray-100 dark:text-white dark:bg-gray-900 min-h-screen font-mono w-full">
        <Nav />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/tasks" element={<TaskList />} />
        </Routes>
      </main>
    </BrowserRouter>
  </StrictMode>
);
