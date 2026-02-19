import test from "@fixtures/all.fixture";
import fs from 'fs';

test('upload auth file', async ({ page }) => {
    console.log('Upload auth file');

    const response = await page.request.post('http://localhost:3000/login', {
        data: {
            username: process.env.API_USERNAME || 'admin',
            password: process.env.API_PASSWORD || 'admin123'
        }
    });

    const token = response.ok() ? (await response.json()).token : null;
    console.log('Received token:', token);

    const authFile = '.auth/user.json';
    if (fs.existsSync(authFile)) {
        const formData = new FormData();
        const fileBuffer = fs.readFileSync(authFile);
        const blob = new Blob([fileBuffer], { type: 'application/json' });
        formData.append('file', blob, 'user.json');

        const response = await fetch('http://localhost:3000/upload', {
            method: 'POST',
            body: formData,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            console.log('Auth file uploaded successfully');
        } else {
            console.error('Failed to upload auth file:', response.statusText);
            console.error('Failed to upload auth file');
        }
    } else {
        console.log('Auth file does not exist, skipping upload.');
    }
})
