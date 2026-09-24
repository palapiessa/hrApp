import { expect, test } from '@playwright/test';

test('lists all employees on the home page', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveURL(/\/$/);
  await expect(
    page.getByRole('heading', { name: 'HR Management System' })
  ).toBeVisible();

  await page.getByRole('link', { name: 'Employee Table' }).click();
  await page.waitForURL('**/table');

  const employeeNames = [
    'Aino Virtanen',
    'Liina Koskinen',
    'Juha Mäkelä',
    'Emma Koskinen',
    'Ville Lehtonen',
    'Maria Rantanen',
    'Laura Jarvinen',
    'Petra Keskinen',
    'Sara Lahtinen',
    'Mikko Salminen',
    'Bita Yeganeh',
  ];

  for (const employeeName of employeeNames) {
    await expect(page.getByText(employeeName, { exact: false }).first()).toBeVisible();
  }
});