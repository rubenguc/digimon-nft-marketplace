import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import million from "million/compiler";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import { resolve } from "path";

export default defineConfig({
  plugins: [million.vite({ auto: true }), react(), nodePolyfills()],
  define: {
    "process.env": {},
  },
  server: {
    port: 3300,
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
});
