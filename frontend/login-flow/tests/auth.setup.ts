import test, { expect } from '@fixtures/all.fixture';
import path from 'path';

const authFile = path.join(__dirname, '../.auth/user.json');

test('authenticate', async ({ page, loginPage }) => {
    await page.goto("");
    await loginPage.clickLoginLink();
    await loginPage.login('testauto1@mailnesia.com', '@Password11');
    await page.context().storageState({ path: authFile });
});