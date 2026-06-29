// Componente de Header reutilizável (aparece em todas as páginas).
// Contém o logo e os links de navegação.
// Usa o hook useLocation para destacar o link da página atual.

import { Link, useLocation } from 'react-router-dom'
import './Header.css'

function Header() {
  // useLocation: lê a URL atual para saber qual link está ativo
  const location = useLocation()

  const links = [
    { path: '/', label: 'Catálogo', exact: true },
    { path: '/aleatorio', label: 'Aleatório' },
    { path: '/gerenciar', label: 'Gerenciar Jogos' },
  ]

  return (
    <header className="header">
      <div className="header__content">
        <Link to="/" className="header__logo">
          <span className="header__logo-text">
            Game<strong>Vault</strong>
          </span>
        </Link>

        <nav className="header__nav">
          {links.map((link) => {
            const isActive = link.exact
              ? location.pathname === link.path
              : location.pathname.startsWith(link.path)
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`header__link ${isActive ? 'header__link--active' : ''}`}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}

export default Header
