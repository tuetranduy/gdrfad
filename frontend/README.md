# Command Trigger App

A modern React web application built with Vite, TypeScript, and shadcn/ui.

## Features

- **Trigger Button**: A prominent button that executes a tentative command
- **Clean UI**: Modern, responsive design using shadcn/ui components
- **Dark Mode**: Automatic dark/light theme support
- **Status Feedback**: Real-time status updates when commands are triggered

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Fast build tool
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - High-quality component library

## Getting Started

### Install Dependencies
```bash
npm install
```

### Development Server
```bash
npm run dev
```
Opens at http://localhost:5173/

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

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
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── tsconfig.json
```

## Customizing the Trigger Command

The trigger button currently executes a placeholder command. To implement actual functionality:

1. Open `src/App.tsx`
2. Find the `handleTrigger` function
3. Replace the placeholder logic with your actual command:

```typescript
const handleTrigger = async () => {
  setLoading(true)
  setStatus('Command triggered...')
  
  try {
    // Replace this with your actual command
    await yourCommandFunction()
    setStatus('Command executed successfully!')
  } catch (error) {
    setStatus(\`Error: \${error}\`)
  } finally {
    setLoading(false)
  }
}
```

## License

MIT
