// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    react({
      fastRefresh: false, // Disable Fast Refresh
    }),
  ],
  server: {
    host: true, // Allow external connections
    port: process.env.PORT || 5173,
  },
  preview: {
    host: true, // Allow external connections in preview mode
    port: process.env.PORT || 4173,
    allowedHosts: 'all', // Allow all hosts for deployment
  },
});
