import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import { BrowserRouter as Router } from "react-router-dom";
import { Providers } from "./pages/provider.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Providers>
        <main>
          <App />
        </main>
      </Providers>
    </Router>
  </React.StrictMode>,
)
