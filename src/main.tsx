import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { initEmail } from './lib/email';

// Initialize EmailJS once on startup (like the other project)
initEmail();

createRoot(document.getElementById("root")!).render(<App />);
