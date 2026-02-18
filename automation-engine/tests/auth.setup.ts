import test, { expect } from '@fixtures/all.fixture';
import path from 'path';

const authFile = path.join(__dirname, '../.auth/user.json');

test('authenticate', async ({ page }) => {
    await page.goto("")
});