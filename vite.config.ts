import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/", // If you are deploying to https://<USERNAME>.github.io/, you can omit base as it defaults to '/'
});
