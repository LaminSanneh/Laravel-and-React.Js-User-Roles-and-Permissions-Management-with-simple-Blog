import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // This allows Vite to accept connections from outside the container
    port: 5173, // The port Vite will run on
    strictPort: true, // If the port is already used, Vite will fail instead of picking another port
    watch: {
      usePolling: true, // This is needed to work well inside Docker
    },
  },
})
