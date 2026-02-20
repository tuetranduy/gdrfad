const { app, BrowserWindow } = require('electron');
const path = require('path');

// Better production detection - check if app is packaged
const isDev = !app.isPackaged;

let mainWindow;
let serverProcess;
const SERVER_PORT = 3001;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.cjs')
    }
  });

  if (isDev) {
    // In development, load from Vite dev server
    mainWindow.loadURL('http://localhost:5173');
    mainWindow.webContents.openDevTools();
  } else {
    // In production, load from built files in app.asar
    const indexPath = path.join(__dirname, '../dist/index.html');
    mainWindow.loadFile(indexPath);
    
    // Enable DevTools in production for debugging
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

async function startBackendServer() {
  return new Promise((resolve, reject) => {
    const serverPath = isDev
      ? path.join(__dirname, '../server/index.js')
      : path.join(process.resourcesPath, 'server/index.js');

    console.log('Starting server from:', serverPath);
    
    // Use dynamic import with file:// protocol for ES module server
    const serverUrl = `file://${serverPath}`;
    import(serverUrl)
      .then(() => {
        console.log('Backend server started on port', SERVER_PORT);
        resolve();
      })
      .catch((error) => {
        console.error('Failed to start backend server:', error);
        // Don't reject - continue without server
        resolve();
      });
  });
}

app.whenReady().then(async () => {
  // Start the backend server before creating window
  try {
    await startBackendServer();
  } catch (error) {
    console.error('Server startup failed:', error);
  }

  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('quit', () => {
  // Clean up server if needed
  if (serverProcess) {
    serverProcess.kill();
  }
});
