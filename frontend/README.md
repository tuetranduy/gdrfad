# Command Trigger App

A modern React web application built with Vite, TypeScript, and shadcn/ui that triggers Playwright tests via a backend API.

## Features

- **Trigger Button**: Click to run Playwright tests in the `/login-flow` folder
- **Clean UI**: Modern, responsive design using shadcn/ui components
- **Dark Mode**: Automatic dark/light theme support
- **Status Feedback**: Real-time status updates when tests are running

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS, shadcn/ui
- **Backend**: Express.js, Node.js

## Getting Started

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

## Project Structure

```
frontend/
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
