// Componente de Campo de Busca reutilizável.
// Combina um input controlado com um seletor de filtro por gênero.
// Recebe os valores e callbacks por props (componente controlado).

import './SearchBar.css'

function SearchBar({
  searchTerm,
  onSearchChange,
  genre,
  onGenreChange,
  genres = [],
}) {
  return (
    <div className="searchbar">
      <div className="searchbar__field">
        <input
          type="text"
          className="searchbar__input"
          placeholder="Buscar jogo pelo nome..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          aria-label="Buscar jogo pelo nome"
        />
        {searchTerm && (
          <button
            className="searchbar__clear"
            onClick={() => onSearchChange('')}
            aria-label="Limpar busca"
            title="Limpar busca"
          >
            ×
          </button>
        )}
      </div>

      <select
        className="searchbar__select"
        value={genre}
        onChange={(e) => onGenreChange(e.target.value)}
        aria-label="Filtrar por gênero"
      >
        <option value="">Todos os gêneros</option>
        {genres.map((g) => (
          <option key={g} value={g}>
            {g}
          </option>
        ))}
      </select>
    </div>
  )
}

export default SearchBar
