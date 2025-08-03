import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import htmlInject from "vite-plugin-html-inject";

// https://vite.dev/config/
export default defineConfig({
  build: {
    sourcemap: true,
  },
  plugins: [
    react(),
    tailwindcss(),
    htmlInject({
      injectData: {
        nonce: "abc123secure",
      },
    }),
  ],
});
