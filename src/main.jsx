// src/main.jsx (or src/index.js)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
// CHANGE THIS LINE: Import AuthProvider as a named export
import { AuthProvider } from './contexts/AuthProvider'; 

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider> 
      <App />
    </AuthProvider>
  </StrictMode>,
)