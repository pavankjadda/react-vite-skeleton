import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import mkcert from 'vite-plugin-mkcert';

export default defineConfig({
	server: {
		https: true,
		/* proxy: {
            '/api': {
                target: 'http://localhost:8080',
                changeOrigin: true,
                secure: true,
                ws: true,
            }
        }*/
	},
	plugins: [
		react({
			babel: {
				plugins: [['babel-plugin-react-compiler', {}]],
			},
		}),
		mkcert(),
	],
});
