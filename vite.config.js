import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "src/",

  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        about: resolve(__dirname, "src/about/index.html"),
        adopt: resolve(__dirname, "src/adopt/index.html"),
        care: resolve(__dirname, "src/care/index.html"),
        visit: resolve(__dirname, "src/visit/index.html"),
      },
    },
  },
});
