import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwind from "tailwindcss";
import { screenGraphPlugin } from "@animaapp/vite-plugin-screen-graph";

export default defineConfig(({ mode }) => ({
  plugins: [react(), mode === "development" && screenGraphPlugin()],
  publicDir: "static", // ✅ 루트/static 폴더를 publicDir로 등록
  base: "./",
  css: {
    postcss: {
      plugins: [tailwind()],
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
      },
    },
  },
}));
