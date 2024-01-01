import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/auth": {
        target: "http://localhost:7000",
        secure: false,
      },
      "/add": {
        target: "http://localhost:7000",
        secure: false,
      },
    },
  },
  plugins: [react()],
});
