// Página 404 - Rota de erro para URLs inexistentes.
// É renderizada pela rota "*" no App.jsx.
// Demonstra: useLocation (mostra a URL errada) e useNavigate (voltar ao início).

import { useLocation, useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import './NotFound.css'

function NotFound() {
  // useLocation: lê a URL atual que não existe, para exibir ao usuário
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <div className="notfound">
      <h1 className="notfound__code">404</h1>
      <h2 className="notfound__title">Página não encontrada</h2>
      <p className="notfound__text">
        A rota <code>{location.pathname}</code> não existe.
      </p>
      <Button variant="primary" onClick={() => navigate('/')}>
        Voltar ao catálogo
      </Button>
    </div>
  )
}

export default NotFound
