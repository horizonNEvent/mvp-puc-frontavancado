// Context que centraliza todos os jogos e as operações de CRUD
// (Criar, Ler, Atualizar e Excluir). Os dados iniciais vêm do "servidor"
// simulado (JSON) e as alterações ficam salvas no navegador (localStorage),
// para que as edições não se percam ao recarregar a página.

import { createContext, useContext, useState, useEffect } from 'react'
import { fetchGames } from '../services/gamesService'

const GamesContext = createContext(null)
// A versão (v2) na chave garante que, ao trocar a lista base de jogos,
// dados antigos salvos no navegador sejam descartados automaticamente.
const STORAGE_KEY = 'gamevault:games:v2'

export function GamesProvider({ children }) {
  const [games, setGames] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Carrega os jogos ao iniciar a aplicação
  useEffect(() => {
    let ativo = true

    async function carregar() {
      try {
        setLoading(true)
        setError(null)

        const salvos = localStorage.getItem(STORAGE_KEY)
        if (salvos) {
          // Já existem dados salvos pelo usuário -> usa eles
          await new Promise((r) => setTimeout(r, 400))
          if (ativo) setGames(JSON.parse(salvos))
        } else {
          // Primeira vez -> busca os dados iniciais no "servidor" (JSON)
          const dados = await fetchGames()
          if (ativo) setGames(dados)
        }
      } catch {
        if (ativo) setError('Erro ao carregar os jogos. Tente novamente.')
      } finally {
        if (ativo) setLoading(false)
      }
    }

    carregar()
    return () => {
      ativo = false
    }
  }, [])

  // Salva no localStorage sempre que a lista de jogos muda
  useEffect(() => {
    if (!loading) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(games))
    }
  }, [games, loading])

  // CREATE - adiciona um novo jogo
  function createGame(data) {
    const novo = { ...data, id: Date.now() }
    setGames((prev) => [novo, ...prev])
    return novo
  }

  // UPDATE - atualiza um jogo existente pelo id
  function updateGame(id, data) {
    setGames((prev) =>
      prev.map((g) => (g.id === id ? { ...g, ...data, id } : g))
    )
  }

  // DELETE - remove um jogo pelo id
  function deleteGame(id) {
    setGames((prev) => prev.filter((g) => g.id !== id))
  }

  // READ - busca um jogo específico pelo id
  function getGameById(id) {
    return games.find((g) => g.id === Number(id))
  }

  const value = {
    games,
    loading,
    error,
    createGame,
    updateGame,
    deleteGame,
    getGameById,
  }

  return <GamesContext.Provider value={value}>{children}</GamesContext.Provider>
}

// Hook para consumir o contexto nos componentes
export function useGames() {
  const context = useContext(GamesContext)
  if (!context) {
    throw new Error('useGames deve ser usado dentro de <GamesProvider>')
  }
  return context
}
