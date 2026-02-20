# Command Trigger App

A modern React web application built with Vite, TypeScript, and shadcn/ui that triggers Playwright tests via a backend API. Available as both a web app and a cross-platform desktop app (Electron).

## Features

- **Trigger Button**: Click to run Playwright tests in the `/login-flow` folder
- **Clean UI**: Modern, responsive design using shadcn/ui components
- **Dark Mode**: Automatic dark/light theme support
- **Status Feedback**: Real-time status updates when tests are running
- **Desktop App**: Self-contained Electron app with embedded backend server

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS, shadcn/ui
- **Backend**: Express.js, Node.js
- **Desktop**: Electron (optional)

## Getting Started

### Web Application Mode

### 1. Install Dependencies

**Frontend:**
```bash
npm install
```

**Backend:**
```bash
cd server
npm install
cd ..
```

### 2. Start the Backend Server

```bash
cd server
npm start
```

The server runs on http://localhost:3001

### 3. Start the Frontend Development Server

In a separate terminal:
```bash
npm run dev
```

Opens at http://localhost:5173/

### 4. Click the Trigger Button

The button will send a request to the backend, which runs the Playwright tests in `/login-flow` and returns the results.

---

## Electron Desktop App

The app can be packaged as a self-contained desktop application for macOS, Windows, and Linux.

### Development Mode

Run the Electron app in development mode (requires Vite dev server running):

1. Start the Vite dev server:
```bash
npm run dev
```

2. In another terminal, start Electron:
```bash
npm run electron:dev
```

### Building the Desktop App

Build a portable executable for your current platform:

```bash
npm run electron:build
```

This will:
1. Build the Vite frontend
2. Package the Electron app with embedded backend server and Playwright tests
3. Create a portable app in `dist-electron/`

**Build output locations:**
- **macOS**: `dist-electron/mac-arm64/Command Trigger App.app` (or `mac/` on Intel)
- **Windows**: `dist-electron/win-unpacked/`
- **Linux**: `dist-electron/linux-unpacked/`

### Building for All Platforms

To build for macOS, Windows, and Linux simultaneously:

```bash
npm run electron:build:all
```

**Note**: Cross-platform builds may have limitations depending on your OS. For best results, build on the target platform.

### Running the Built App

**macOS:**
```bash
open "dist-electron/mac-arm64/Command Trigger App.app"
```

**Windows:**
```bash
dist-electron\win-unpacked\Command Trigger App.exe
```

**Linux:**
```bash
./dist-electron/linux-unpacked/command-trigger-app
```

### How the Desktop App Works

The Electron app is fully self-contained:
- The Express backend server starts automatically when the app launches
- Playwright tests and dependencies are bundled in the app
- No separate backend server setup required
- All functionality from the web version works identically

---

## Project Structure

```
frontend/
├── electron/
│   ├── main.js              # Electron main process
│   └── preload.js           # Preload script
├── src/
│   ├── components/
│   │   └── ui/
│   │       └── button.tsx    # shadcn Button component
│   ├── lib/
│   │   └── utils.ts          # Utility functions
│   ├── App.tsx               # Main application with Trigger button
│   ├── main.tsx              # Application entry point
│   └── index.css             # Global styles & Tailwind config
├── server/
│   ├── index.js              # Express server
│   └── package.json          # Backend dependencies
├── login-flow/               # Playwright tests
├── dist/                     # Vite build output
├── dist-electron/            # Electron build output
└── package.json              # Frontend dependencies
```

## How It Works

1. User clicks "Trigger" button in the React app
2. Frontend sends POST request to `http://localhost:3001/api/trigger-tests`
3. Backend runs `npx playwright test` in the `/login-flow` directory
4. Test results are returned to the frontend
5. Status message displays success or failure

## License

MIT
