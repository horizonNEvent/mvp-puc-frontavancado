// Página 1 - Catálogo de Jogos.
// Lista todos os jogos em cards, com busca por nome e filtro por gênero.
// Demonstra: useState, useEffect, leitura de "servidor" (JSON), loading e
// mensagens condicionais (nenhum item encontrado / erro ao carregar).

import { useState } from 'react'
import { useGames } from '../context/GamesContext'
import GameCard from '../components/GameCard'
import SearchBar from '../components/SearchBar'
import Loader from '../components/Loader'
import Alert from '../components/Alert'
import './Catalog.css'

function Catalog() {
  // Pega os jogos do contexto (já carregados do "servidor" / localStorage)
  const { games, loading, error } = useGames()

  const [searchTerm, setSearchTerm] = useState('')
  const [genre, setGenre] = useState('')

  // Lista de gêneros únicos para o filtro
  const genres = [...new Set(games.map((g) => g.genre))].sort()

  // Aplica busca + filtro
  const filtered = games.filter((game) => {
    const matchName = game.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
    const matchGenre = genre ? game.genre === genre : true
    return matchName && matchGenre
  })

  return (
    <section>
      <div className="catalog__header">
        <h1 className="catalog__title">Catálogo de Jogos</h1>
        <p className="catalog__subtitle">
          Descubra e explore os jogos. Para criar, editar ou excluir, acesse
          "Gerenciar Jogos".
        </p>
      </div>

      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        genre={genre}
        onGenreChange={setGenre}
        genres={genres}
      />

      {/* Estado de carregamento */}
      {loading && <Loader label="Carregando jogos..." />}

      {/* Estado de erro */}
      {!loading && error && <Alert type="error">{error}</Alert>}

      {/* Lista vazia (nenhum resultado para a busca) */}
      {!loading && !error && filtered.length === 0 && (
        <Alert type="warning">
          Nenhum jogo encontrado para a sua busca. Tente outro termo ou gênero.
        </Alert>
      )}

      {/* Grade de jogos */}
      {!loading && !error && filtered.length > 0 && (
        <>
          <p className="catalog__count">
            {filtered.length} jogo(s) encontrado(s)
          </p>
          <div className="catalog__grid">
            {filtered.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </>
      )}
    </section>
  )
}

export default Catalog
