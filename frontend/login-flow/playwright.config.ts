import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  timeout: 600 * 1000,
  use: {
    baseURL: 'https://smart.gdrfad.gov.ae/',
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'setup', testMatch: /.*\.setup\.ts/,
      use: { headless: true }
    },
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      dependencies: ['setup'],
    },
  ]
});
