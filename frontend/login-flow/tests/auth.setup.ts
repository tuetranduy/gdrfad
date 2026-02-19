import test from '@fixtures/all.fixture';
import path from 'path';

const authFile = path.join(__dirname, '../.auth/user.json');

test('authenticate', async ({ page, loginPage }) => {
    await page.goto("");
    await page.context().storageState({ path: authFile });
});