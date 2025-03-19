import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
// https://vite.dev/config/
export default defineConfig({
  //setting alias
  base: "./",
  build: {
    outDir: "build",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@redux" :  path.resolve(__dirname,"./src/redux"),
      "@pages" : path.resolve(__dirname,"./src/pages")
    },
  },
  //end setting alias
  plugins: [react(),
    tailwindcss()
  ]
});
