import express from 'express';
import cors from 'cors';
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.post('/api/trigger-tests', (req, res) => {
  console.log('Triggering Playwright tests...');
  
  const loginFlowPath = join(__dirname, '..', 'login-flow');
  
  const child = spawn('npx', ['playwright', 'test'], {
    cwd: loginFlowPath,
    stdio: 'pipe'
  });

  let stdout = '';
  let stderr = '';

  child.stdout.on('data', (data) => {
    stdout += data.toString();
    console.log(data.toString());
  });

  child.stderr.on('data', (data) => {
    stderr += data.toString();
    console.error(data.toString());
  });

  child.on('close', (code) => {
    if (code === 0) {
      res.json({
        success: true,
        message: 'Playwright tests completed successfully'
      });
    } else {
      res.json({
        success: false,
        message: `Playwright tests failed with exit code ${code}`
      });
    }
  });

  child.on('error', (error) => {
    console.error('Failed to start tests:', error);
    res.status(500).json({
      success: false,
      message: `Failed to start tests: ${error.message}`
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
