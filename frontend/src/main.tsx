import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Nav } from "./components/Nav.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import { TaskList } from "./pages/TaskList.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <main className="bg-gray-100 dark:text-white dark:bg-gray-900 min-h-screen font-mono w-full">
          <Nav />
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/tasks" element={<TaskList />} />
          </Routes>
        </main>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);
