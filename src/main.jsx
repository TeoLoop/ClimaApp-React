import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AppClima } from './AppClima'
import './styles.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppClima/>
  </StrictMode>,
)
