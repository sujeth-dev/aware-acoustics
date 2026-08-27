import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

import { generatePages } from "./scripts/generate-pages.js";

const root = path.dirname(fileURLToPath(import.meta.url));

/**
 * Materialises the route tree before Vite reads it, and regenerates it when a
 * template, component, library module or data file changes. Generated HTML is
 * an artefact, never a source file — see scripts/generate-pages.js.
 */
function routeGenerator() {
  const watched = ["src/pages", "src/components", "src/lib", "data", "scripts/generate-pages.js"];

  return {
    name: "aware-route-generator",
    configureServer(server) {
      for (const entry of watched) server.watcher.add(path.join(root, entry));

      server.watcher.on("change", (file) => {
        const relative = path.relative(root, file);
        if (!watched.some((entry) => relative === entry || relative.startsWith(`${entry}${path.sep}`))) return;
        try {
          generatePages({ silent: true });
          server.ws.send({ type: "full-reload" });
        } catch (error) {
          server.config.logger.error(`route generation failed: ${error.message}`);
        }
      });
    }
  };
}

const { written } = generatePages({ silent: true });

const input = Object.fromEntries(
  written.map((relative) => [relative.replace(/\.html$/, "").replace(/[/\\]/g, "-") || "index", path.join(root, relative)])
);

export default defineConfig({
  root,
  publicDir: "public",
  appType: "mpa",
  plugins: [routeGenerator()],
  build: {
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: { input }
  },
  server: { port: 5173 }
});
