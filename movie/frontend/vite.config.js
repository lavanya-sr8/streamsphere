	// import { defineConfig, loadEnv } from "vite";
	// import react from "@vitejs/plugin-react";

	// // https://vitejs.dev/config/
	// export default defineConfig({
	// 	plugins: [react()],
	// 	resolve: {
	// 		extensions: [".js", ".jsx", ".ts", ".tsx", ".css"],
	// 	},
	// 	server: {
	// 		proxy: {
	// 			"/api": {
	// 				target: "http://localhost:5000",
	// 			},
	// 		},
	// 	},
	// });

import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd());

	const backendPort = env.VITE_BACKEND_PORT || "5000";

	return {
		plugins: [react()],
		resolve: {
			extensions: [".js", ".jsx", ".ts", ".tsx", ".css"],
		},
		server: {
			proxy: {
				"/api": {
					target: `http://localhost:${backendPort}`,
					changeOrigin: true,
				},
			},
		},
	};
});
