import test from "@fixtures/all.fixture";

test('upload auth file', async ({ page }) => {
    console.log('Upload auth file');

    // check if the auth file exists
    const authFile = '.auth/user.json';
    const fs = require('fs');
    if (fs.existsSync(authFile)) {
        console.log('Auth file exists, uploading...');
        await page.context().addCookies(JSON.parse(fs.readFileSync(authFile, 'utf-8')).cookies);
    } else {
        console.log('Auth file does not exist, skipping upload.');
    }
})
