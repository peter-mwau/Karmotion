import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(),
    VitePWA({
    registerType: "autoUpdate",
    includeAssets: ["karmotion_logo.png",],
    manifest: {
      name: "Karmotion",
      short_name: "Karmotion",
      description: "Karmotion is a web application that helps you track and manage your car points.",
      theme_color: "#111111",
      background_color: "#ffffff",
      display: "standalone",
      start_url: "/",
      icons: [
        {
          src: "/karmotion_logo.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "/karmotion_logo.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "any maskable",
        },
      ],
    },
  }),
  ],
  server: {
    allowedHosts: ['.ngrok-free.app', '.ngrok-free.app:3000'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
