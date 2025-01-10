import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Nav } from "./components/Nav.tsx";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { TaskList } from "./pages/TaskList.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ChakraProvider } from "@chakra-ui/react";
import { defaultSystem } from "@chakra-ui/react";
import { AuthProvider } from "./auth/authContext.tsx";
import { SignIn } from "./auth/SignIn.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider value={defaultSystem}>
        <BrowserRouter>
          <AuthProvider>
            <main className="bg-gray-100 dark:text-white dark:bg-gray-900 min-h-screen font-mono w-full">
              <Nav />
              <Routes>
                <Route path="/" element={<App />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/dashboard" element={<Navigate to="/" />} />
                <Route path="/tasks" element={<TaskList />} />
              </Routes>
            </main>
          </AuthProvider>
        </BrowserRouter>
      </ChakraProvider>
    </QueryClientProvider>
  </StrictMode>
);
