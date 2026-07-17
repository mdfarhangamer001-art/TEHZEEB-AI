import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { PerformanceProvider } from './lib/performanceTier'
import './styles.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PerformanceProvider>
      <App />
    </PerformanceProvider>
  </React.StrictMode>
)
