import { createRoot } from "react-dom/client";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import "./index.css";
import App from "./App.jsx";

export const queryClient = new QueryClient();

const rootElement = document.getElementById("root");

if (!rootElement._root) {
  rootElement._root = createRoot(rootElement);
}

rootElement._root.render(
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </QueryClientProvider>
);
