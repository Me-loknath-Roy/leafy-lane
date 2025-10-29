import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// If deploying to GitHub Pages, set base to '/<REPO_NAME>/'
// Example: base: '/leafy-lane/'
export default defineConfig({
  plugins: [react()],
  // base: '/leafy-lane/',
})
