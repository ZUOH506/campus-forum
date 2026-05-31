export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt'
  ],

  app: {
    head: {
      title: '校园论坛',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: '校园论坛 - 发现校园生活' }
      ]
    }
  },

  css: ['~/assets/css/main.css'],

  typescript: {
    strict: true
  },

  routeRules: {
    '/': { prerender: true },
    '/posts/**': { swr: 3600 },
    '/api/**': { cors: true }
  },

  nitro: {
    preset: 'vercel'
  },

  vercel: {
    regions: ['iad1'],
    serverless: true
  },

  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || '/api'
    }
  },

  experimental: {
    payloadExtraction: false
  }
})
