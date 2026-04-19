import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Required for BrowserRouter: serve index.html for all unmatched routes
  server: {
    historyApiFallback: true,
  },
})
