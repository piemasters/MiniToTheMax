import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4321/',
    // A build on your machine can carry analytics, which tests mustn't reach
    blockHosts: ['*googletagmanager.com', '*google-analytics.com'],
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
  },
})
