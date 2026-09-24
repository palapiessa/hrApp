import { expect, test } from '@playwright/test';

test.describe('Employee table search', () => {
  test('shows surname search controls and filters employees by partial name', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveURL(/\/$/);
    await expect(page.getByRole('heading', { name: 'HR Management System' })).toBeVisible();

    await page.getByRole('link', { name: 'Employee Table' }).click();
    await page.waitForURL('**/table');

    const surnameInput = page.getByRole('textbox', { name: /surname/i });
    const searchButton = page.getByRole('button', { name: /search/i });

    await expect(surnameInput).toBeVisible();
    await expect(searchButton).toBeVisible();

    const employeeTable = page.locator('table');
    await expect(employeeTable).toBeVisible();

    const getEmployeeRows = () =>
      employeeTable.locator('tbody tr').filter({
        has: page.locator('td'),
      });

    const getEmployeeNames = async () => {
      const rowCount = await getEmployeeRows().count();
      const names = [];
      for (let i = 0; i < rowCount; i++) {
        const row = getEmployeeRows().nth(i);
        const cells = row.locator('td');
        const cellCount = await cells.count();
        let rowText = '';
        for (let j = 0; j < cellCount; j++) {
          const text = (await cells.nth(j).innerText()).trim();
          if (text) rowText += `${text} `;
        }
        names.push(rowText.trim());
      }
      return names;
    };

    const initialNames = await getEmployeeNames();
    expect(initialNames.length).toBeGreaterThan(0);

    const sampleSurname = initialNames[0].split(/\s+/).pop();
    expect(sampleSurname).toBeTruthy();

    const partial = sampleSurname.slice(0, Math.max(1, Math.min(3, sampleSurname.length))).toLowerCase();

    await surnameInput.fill(partial);
    await searchButton.click();

    await expect.poll(async () => getEmployeeNames()).toEqual(
      initialNames.filter((name) => name.toLowerCase().includes(partial))
    );

    await surnameInput.fill('');
    await searchButton.click();
    await expect.poll(async () => getEmployeeNames()).toEqual(initialNames);

    await surnameInput.fill('*');
    await searchButton.click();
    await expect.poll(async () => getEmployeeNames()).toEqual(initialNames);
  });
});
