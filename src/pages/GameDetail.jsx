// Página 2 - Detalhe do Jogo.
// Mostra a imagem, descrição completa, plataformas e nota.
// Demonstra: useParams (captura o id da URL) e useNavigate (botões de navegação).

import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useGames } from '../context/GamesContext'
import Button from '../components/Button'
import Alert from '../components/Alert'
import Loader from '../components/Loader'
import './GameDetail.css'

function GameDetail() {
  // useParams: captura o parâmetro :id da URL (ex: /jogo/3)
  const { id } = useParams()
  // useNavigate: usado para os botões de navegação
  const navigate = useNavigate()

  const { getGameById, loading } = useGames()
  const [imgErro, setImgErro] = useState(false)

  // Enquanto o contexto carrega os jogos, mostra o loader
  if (loading) return <Loader label="Carregando jogo..." />

  const game = getGameById(id)

  // Jogo não encontrado (id inválido ou jogo excluído)
  if (!game) {
    return (
      <div className="detail__error">
        <Alert type="error">Jogo não encontrado.</Alert>
        <Button variant="secondary" onClick={() => navigate('/')}>
          Voltar ao catálogo
        </Button>
      </div>
    )
  }

  const coverStyle = {
    background: `linear-gradient(135deg, ${game.cover[0]}, ${game.cover[1]})`,
  }
  const temImagem = game.image && !imgErro

  return (
    <section className="detail">
      <Button
        variant="ghost"
        onClick={() => navigate(-1)}
        title="Voltar para a página anterior"
      >
        ← Voltar
      </Button>

      <div className="detail__content">
        <div className="detail__cover">
          {temImagem ? (
            <img
              className="detail__img"
              src={game.image}
              alt={`Capa de ${game.title}`}
              onError={() => setImgErro(true)}
            />
          ) : (
            <div className="detail__fallback" style={coverStyle} />
          )}
        </div>

        <div className="detail__info">
          <span className="detail__genre">{game.genre}</span>
          <h1 className="detail__title">{game.title}</h1>

          <div className="detail__meta">
            <span className="detail__rating">Nota {game.rating.toFixed(1)}</span>
            <span>·</span>
            <span>{game.year}</span>
            <span>·</span>
            <span>{game.developer}</span>
          </div>

          <p className="detail__description">{game.description}</p>

          <div className="detail__platforms">
            <h3 className="detail__platforms-title">Plataformas</h3>
            <div className="detail__platforms-list">
              {game.platforms.length > 0 ? (
                game.platforms.map((p) => (
                  <span key={p} className="detail__platform">
                    {p}
                  </span>
                ))
              ) : (
                <span className="detail__platform">Não informado</span>
              )}
            </div>
          </div>

          <div className="detail__actions">
            <Button
              variant="primary"
              onClick={() => navigate('/gerenciar')}
              title="Editar ou excluir na página Gerenciar Jogos"
            >
              Editar este jogo
            </Button>
            <Button variant="secondary" onClick={() => navigate('/')}>
              Ver catálogo
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default GameDetail
