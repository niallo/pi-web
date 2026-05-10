import { svelte } from "@sveltejs/vite-plugin-svelte";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [svelte()],
  build: {
    outDir: "../../web-dist",
    emptyOutDir: true,
    target: "esnext",
    cssMinify: "lightningcss",
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Group mermaid + cytoscape + katex together since they're always co-loaded
          if (
            id.includes("node_modules/mermaid") ||
            id.includes("node_modules/cytoscape") ||
            id.includes("node_modules/katex")
          ) {
            return "vendor-mermaid";
          }
        },
      },
    },
  },
  server: {
    proxy: {
      "/ws": {
        target: "ws://localhost:8080",
        ws: true,
      },
    },
  },
});
