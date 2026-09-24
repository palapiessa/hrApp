import { defineConfig, devices } from '@playwright/test';

const baseURL =
  process.env.PLAYWRIGHT_BASE_URL ||
  'http://localhost:5173';

const useAzureDeployment =
  !!process.env.PLAYWRIGHT_BASE_URL;

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
  webServer: useAzureDeployment
    ? undefined
    : {
        command: 'npm run dev -- --host localhost --port 5173',
        cwd: '../web',
        url: 'http://localhost:5173',
        reuseExistingServer: !process.env.CI
      }
});
