// Componente de Card de Jogo reutilizável.
// Mostra a imagem (capa), título, nota e gênero.
// É reutilizado no Catálogo e na página Gerenciar Jogos.
// Usa useNavigate para redirecionar para a página de detalhe.
// As ações de Editar/Excluir só aparecem quando as props onEdit/onDelete
// são passadas (por isso o mesmo card serve para listar e para gerenciar).

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from './Button'
import Tooltip from './Tooltip'
import './GameCard.css'

function GameCard({ game, onEdit, onDelete }) {
  // useNavigate: permite navegar por código (ex: ao clicar em "Ver detalhes")
  const navigate = useNavigate()
  const [imgErro, setImgErro] = useState(false)

  function goToDetail() {
    navigate(`/jogo/${game.id}`)
  }

  // Gradiente usado como fallback caso não haja imagem ou ela falhe ao carregar
  const coverStyle = {
    background: `linear-gradient(135deg, ${game.cover[0]}, ${game.cover[1]})`,
  }

  const temImagem = game.image && !imgErro

  return (
    <article className="card">
      <div className="card__cover" onClick={goToDetail}>
        {temImagem ? (
          <img
            className="card__img"
            src={game.image}
            alt={`Capa de ${game.title}`}
            loading="lazy"
            onError={() => setImgErro(true)}
          />
        ) : (
          <div className="card__fallback" style={coverStyle} />
        )}
        <span className="card__rating" title={`Nota ${game.rating}`}>
          Nota {game.rating.toFixed(1)}
        </span>
      </div>

      <div className="card__body">
        <span className="card__genre">{game.genre}</span>
        <h3 className="card__title">{game.title}</h3>
        <p className="card__year">
          {game.year} · {game.developer}
        </p>

        <div className="card__actions">
          <Button
            variant="primary"
            onClick={goToDetail}
            title="Abrir página de detalhes"
          >
            Ver detalhes
          </Button>

          {onEdit && (
            <Tooltip text="Editar este jogo">
              <Button
                variant="secondary"
                onClick={(e) => {
                  e.stopPropagation()
                  onEdit(game)
                }}
              >
                Editar
              </Button>
            </Tooltip>
          )}

          {onDelete && (
            <Tooltip text="Excluir este jogo">
              <Button
                variant="danger"
                onClick={(e) => {
                  e.stopPropagation()
                  onDelete(game)
                }}
              >
                Excluir
              </Button>
            </Tooltip>
          )}
        </div>
      </div>
    </article>
  )
}

export default GameCard
