import { defineConfig, devices } from '@playwright/test';

const baseURL =
  process.env.PLAYWRIGHT_BASE_URL ||
  'https://calm-wave-0e0265e03-test.westeurope.6.azurestaticapps.net';

const useLocalServer = baseURL === 'http://localhost:5173';

export default defineConfig({
  testDir: './specs',
  fullyParallel: true,
  reporter: [['html', { open: 'never' }]],
  use: {
    baseURL,
    video: 'on',
    screenshot: 'only-on-failure'
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    }
  ],
  webServer: useLocalServer
    ? {
        command: 'npm run dev -- --host localhost --port 5173',
        cwd: '../web',
        url: 'http://localhost:5173',
        reuseExistingServer: !process.env.CI
      }
    : undefined
});
