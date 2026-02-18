import { useState } from 'react'
import { Button } from '@/components/ui/button'

function App() {
  const [status, setStatus] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const handleTrigger = async () => {
    setLoading(true)
    setStatus('Triggering Playwright tests...')

    try {
      const response = await fetch('http://localhost:3001/api/trigger-tests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const data = await response.json()
      
      if (data.success) {
        setStatus('✓ ' + data.message)
      } else {
        setStatus('✗ ' + data.message)
      }
    } catch (error) {
      setStatus(`Error: ${error instanceof Error ? error.message : 'Failed to connect to server'}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="w-full max-w-md p-8 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
            Command Trigger
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Click the button below to execute the command
          </p>
        </div>

        <div className="space-y-4">
          <Button
            onClick={handleTrigger}
            disabled={loading}
            size="lg"
            className="w-full text-lg"
          >
            {loading ? 'Processing...' : 'Trigger'}
          </Button>

          {status && (
            <div className="p-4 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <p className="text-sm text-slate-700 dark:text-slate-300 text-center">
                {status}
              </p>
            </div>
          )}
        </div>

        <div className="text-center">
          <p className="text-xs text-slate-500 dark:text-slate-500">
            Powered by React + shadcn/ui
          </p>
        </div>
      </div>
    </div>
  )
}

export default App
