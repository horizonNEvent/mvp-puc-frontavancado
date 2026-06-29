// Página — Jogo Aleatório (/aleatorio).
// Sorteia um jogo do catálogo com animação de dados (Spline) enquanto "rola".

import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGames } from '../context/GamesContext'
import SplineDice from '../components/SplineDice'
import GameCard from '../components/GameCard'
import Button from '../components/Button'
import Alert from '../components/Alert'
import Loader from '../components/Loader'
import './Random.css'

const ROLL_MS = 2400
const ROLL_MS_REDUCED = 400

function Random() {
  const { games, loading, error } = useGames()
  const navigate = useNavigate()
  const timeoutRef = useRef(null)

  const [status, setStatus] = useState('idle')
  const [picked, setPicked] = useState(null)

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  function sortear() {
    if (games.length === 0 || status === 'rolling') return

    setStatus('rolling')
    setPicked(null)

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    const duration = reducedMotion ? ROLL_MS_REDUCED : ROLL_MS

    timeoutRef.current = setTimeout(() => {
      const index = Math.floor(Math.random() * games.length)
      setPicked(games[index])
      setStatus('done')
    }, duration)
  }

  if (loading) return <Loader label="Carregando catálogo..." />

  if (error) {
    return <Alert type="error">{error}</Alert>
  }

  const isRolling = status === 'rolling'
  const showDice = status !== 'done' || isRolling

  return (
    <section className="random">
      <div className="random__header">
        <h1 className="random__title">Jogo Aleatório</h1>
        <p className="random__subtitle">
          Não sabe o que jogar? Deixe os dados decidirem por você.
        </p>
      </div>

      {games.length === 0 ? (
        <Alert type="warning">
          Nenhum jogo no catálogo. Adicione jogos em Gerenciar Jogos.
        </Alert>
      ) : (
        <>
          <div className="random__stage">
            {showDice && (
              <div
                className={`random__dice-wrap ${isRolling ? 'random__dice-wrap--active' : ''}`}
              >
                <SplineDice rolling={isRolling} />
                {isRolling && (
                  <p className="random__rolling-label" aria-live="polite">
                    Rolando os dados...
                  </p>
                )}
              </div>
            )}

            {status === 'done' && picked && (
              <div className="random__result random__result--reveal">
                <p className="random__result-label">Sua sorte caiu em:</p>
                <div className="random__result-card">
                  <GameCard game={picked} />
                </div>
              </div>
            )}
          </div>

          <div className="random__actions">
            <Button
              variant="primary"
              onClick={sortear}
              disabled={isRolling}
              title="Sortear um jogo aleatório do catálogo"
            >
              {isRolling
                ? 'Sorteando...'
                : status === 'done'
                  ? 'Sortear outro'
                  : 'Sortear jogo'}
            </Button>

            {status === 'idle' && (
              <Button variant="secondary" onClick={() => navigate('/')}>
                Ver catálogo
              </Button>
            )}
          </div>
        </>
      )}
    </section>
  )
}

export default Random
