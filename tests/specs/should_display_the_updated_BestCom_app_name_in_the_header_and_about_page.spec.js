import { expect, test } from '@playwright/test';

test.describe('Application branding', () => {
  test('header and About page display BestCom\'s Employee App', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('heading', { name: "BestCom's Employee App" }).first()).toBeVisible();
    await expect(page.getByText('HR Management System')).toHaveCount(0);

    await page.getByRole('link', { name: /about/i }).click();

    await expect(page.getByRole('heading', { name: /about/i })).toBeVisible();
    await expect(page.getByText("BestCom's Employee App").first()).toBeVisible();
    await expect(page.getByText('HR Management System')).toHaveCount(0);
  });
});
