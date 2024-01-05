import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/server/auth": {
        target: "http://localhost:7000",
        secure: false,
      },
      "/server/listing": {
        target: "http://localhost:7000",
      },
      "/server/delete": {
        target: "http://localhost:7000",
        rewrite: (path) => path.replace(/^\/delete/, ""),
      },
    },
  },
  plugins: [react()],
});
