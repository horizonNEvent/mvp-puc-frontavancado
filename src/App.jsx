// Componente principal da aplicação.
// Define a estrutura geral (Header + conteúdo) e configura todas as rotas
// usando o React Router, incluindo a rota de erro 404 ("*").

import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Catalog from './pages/Catalog'
import GameDetail from './pages/GameDetail'
import Manage from './pages/Manage'
import NotFound from './pages/NotFound'

function App() {
  return (
    <div className="app">
      <Header />

      <main className="app__main">
        <Routes>
          {/* Página 1 - Catálogo */}
          <Route path="/" element={<Catalog />} />

          {/* Página 2 - Detalhe do jogo (com parâmetro :id na URL) */}
          <Route path="/jogo/:id" element={<GameDetail />} />

          {/* Página 3 - Gerenciar Jogos (CRUD) */}
          <Route path="/gerenciar" element={<Manage />} />

          {/* Rota de erro 404 para qualquer URL inexistente */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <footer className="app__footer">
        <p>GameVault · MVP Front-end Avançado · PUC-Rio</p>
      </footer>
    </div>
  )
}

export default App
