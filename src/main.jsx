// Ponto de entrada da aplicação React.
// Envolve o App com o BrowserRouter (habilita o roteamento) e com o
// GamesProvider (estado global dos jogos + CRUD).

import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { GamesProvider } from './context/GamesContext.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <GamesProvider>
        <App />
      </GamesProvider>
    </BrowserRouter>
  </React.StrictMode>
)
