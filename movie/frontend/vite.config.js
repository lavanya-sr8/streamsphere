import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		extensions: [".js", ".jsx", ".ts", ".tsx", ".css"],
	},
	server: {
		proxy: {
		  "/api": {
			target: "https://movie-hs59.onrender.com",
			changeOrigin: true,
			secure: false, // 👈 ignore SSL issues
		  },
		},
	  },
	  
});
