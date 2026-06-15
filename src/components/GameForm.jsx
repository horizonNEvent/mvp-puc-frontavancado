// Formulário reutilizável para CRIAR e EDITAR um jogo.
// Quando recebe "initialData", funciona em modo edição (campos preenchidos).
// Faz validação simples e mostra uma pré-visualização da imagem informada.

import { useState } from 'react'
import Button from './Button'
import Alert from './Alert'
import './GameForm.css'

const GENEROS = [
  'Ação',
  'Aventura',
  'Corrida',
  'Estratégia',
  'Puzzle',
  'RPG',
  'Simulação',
]

function GameForm({ initialData, onSubmit, onCancel, submitLabel = 'Salvar' }) {
  const [form, setForm] = useState(() => ({
    title: initialData?.title || '',
    image: initialData?.image || '',
    rating: initialData?.rating ?? '',
    genre: initialData?.genre || '',
    developer: initialData?.developer || '',
    year: initialData?.year || new Date().getFullYear(),
    platforms: initialData?.platforms ? initialData.platforms.join(', ') : '',
    description: initialData?.description || '',
  }))
  const [erro, setErro] = useState(null)
  const [salvando, setSalvando] = useState(false)

  function handleChange(campo, valor) {
    setForm((prev) => ({ ...prev, [campo]: valor }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    setErro(null)

    // Validações simples dos campos obrigatórios
    if (!form.title.trim()) {
      setErro('Informe o nome do jogo.')
      return
    }
    if (!form.genre) {
      setErro('Selecione um gênero.')
      return
    }
    const nota = Number(form.rating)
    if (form.rating === '' || isNaN(nota) || nota < 0 || nota > 10) {
      setErro('A nota deve ser um número entre 0 e 10.')
      return
    }

    // Simula um pequeno tempo de "salvamento no servidor"
    setSalvando(true)
    setTimeout(() => {
      const dados = {
        title: form.title.trim(),
        image: form.image.trim(),
        rating: nota,
        genre: form.genre,
        developer: form.developer.trim() || 'Desconhecido',
        year: Number(form.year) || new Date().getFullYear(),
        platforms: form.platforms
          .split(',')
          .map((p) => p.trim())
          .filter(Boolean),
        description: form.description.trim() || 'Sem descrição.',
        cover: initialData?.cover || ['#6366F1', '#8B5CF6'],
      }
      onSubmit(dados)
      setSalvando(false)
    }, 400)
  }

  return (
    <form className="gameform" onSubmit={handleSubmit}>
      {erro && <Alert type="error">{erro}</Alert>}

      <div className="gameform__field">
        <label htmlFor="gf-title">Nome do jogo *</label>
        <input
          id="gf-title"
          type="text"
          value={form.title}
          onChange={(e) => handleChange('title', e.target.value)}
          placeholder="Ex: The Last Quest"
        />
      </div>

      <div className="gameform__field">
        <label htmlFor="gf-image">Link da imagem (URL)</label>
        <input
          id="gf-image"
          type="url"
          value={form.image}
          onChange={(e) => handleChange('image', e.target.value)}
          placeholder="https://exemplo.com/capa.jpg"
        />
      </div>

      {/* Pré-visualização da imagem informada */}
      {form.image && (
        <div className="gameform__preview">
          <img
            src={form.image}
            alt="Pré-visualização da capa"
            onError={(e) => {
              e.currentTarget.style.display = 'none'
            }}
          />
        </div>
      )}

      <div className="gameform__row">
        <div className="gameform__field">
          <label htmlFor="gf-rating">Nota (0 a 10) *</label>
          <input
            id="gf-rating"
            type="number"
            min="0"
            max="10"
            step="0.1"
            value={form.rating}
            onChange={(e) => handleChange('rating', e.target.value)}
            placeholder="8.5"
          />
        </div>

        <div className="gameform__field">
          <label htmlFor="gf-genre">Gênero *</label>
          <select
            id="gf-genre"
            value={form.genre}
            onChange={(e) => handleChange('genre', e.target.value)}
          >
            <option value="">Selecione...</option>
            {GENEROS.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="gameform__row">
        <div className="gameform__field">
          <label htmlFor="gf-developer">Desenvolvedora</label>
          <input
            id="gf-developer"
            type="text"
            value={form.developer}
            onChange={(e) => handleChange('developer', e.target.value)}
            placeholder="Ex: Studio X"
          />
        </div>

        <div className="gameform__field">
          <label htmlFor="gf-year">Ano</label>
          <input
            id="gf-year"
            type="number"
            value={form.year}
            onChange={(e) => handleChange('year', e.target.value)}
            placeholder="2025"
          />
        </div>
      </div>

      <div className="gameform__field">
        <label htmlFor="gf-platforms">Plataformas (separadas por vírgula)</label>
        <input
          id="gf-platforms"
          type="text"
          value={form.platforms}
          onChange={(e) => handleChange('platforms', e.target.value)}
          placeholder="PC, PlayStation 5, Xbox Series X"
        />
      </div>

      <div className="gameform__field">
        <label htmlFor="gf-description">Descrição</label>
        <textarea
          id="gf-description"
          rows="3"
          value={form.description}
          onChange={(e) => handleChange('description', e.target.value)}
          placeholder="Breve descrição do jogo..."
        />
      </div>

      <div className="gameform__actions">
        <Button type="submit" disabled={salvando}>
          {salvando ? 'Salvando...' : submitLabel}
        </Button>
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancelar
        </Button>
      </div>
    </form>
  )
}

export default GameForm
