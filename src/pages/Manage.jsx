// Página 3 - Gerenciar Jogos (CRUD).
// Aqui é possível CRIAR, EDITAR (nome, imagem, nota e mais) e EXCLUIR jogos.
// Usa o GamesContext (estado global + persistência) e os componentes
// Modal e GameForm. Mostra feedback visual após cada ação.

import { useState } from 'react'
import { useGames } from '../context/GamesContext'
import GameCard from '../components/GameCard'
import Button from '../components/Button'
import Alert from '../components/Alert'
import Loader from '../components/Loader'
import Modal from '../components/Modal'
import GameForm from '../components/GameForm'
import './Manage.css'

function Manage() {
  const { games, loading, error, createGame, updateGame, deleteGame } = useGames()

  const [modalAberto, setModalAberto] = useState(false)
  const [editando, setEditando] = useState(null) // jogo em edição (ou null = criar)
  const [confirmando, setConfirmando] = useState(null) // jogo a excluir
  const [feedback, setFeedback] = useState(null)

  function abrirCriacao() {
    setEditando(null)
    setModalAberto(true)
  }

  function abrirEdicao(game) {
    setEditando(game)
    setModalAberto(true)
  }

  function fecharModal() {
    setModalAberto(false)
    setEditando(null)
  }

  // Chamado pelo GameForm ao salvar (cria ou atualiza)
  function salvar(dados) {
    if (editando) {
      updateGame(editando.id, dados)
      setFeedback({ type: 'success', msg: `"${dados.title}" foi atualizado!` })
    } else {
      createGame(dados)
      setFeedback({ type: 'success', msg: `"${dados.title}" foi adicionado!` })
    }
    fecharModal()
  }

  // Confirma a exclusão do jogo selecionado
  function excluir() {
    deleteGame(confirmando.id)
    setFeedback({ type: 'success', msg: `"${confirmando.title}" foi removido.` })
    setConfirmando(null)
  }

  return (
    <section>
      <div className="manage__header">
        <div>
          <h1 className="manage__title">Gerenciar Jogos</h1>
          <p className="manage__subtitle">
            Crie, edite (nome, imagem e nota) e exclua os jogos do catálogo.
          </p>
        </div>
        <Button variant="primary" onClick={abrirCriacao}>
          + Novo jogo
        </Button>
      </div>

      {feedback && (
        <div className="manage__feedback">
          <Alert type={feedback.type} onClose={() => setFeedback(null)}>
            {feedback.msg}
          </Alert>
        </div>
      )}

      {loading && <Loader label="Carregando jogos..." />}

      {!loading && error && <Alert type="error">{error}</Alert>}

      {!loading && !error && games.length === 0 && (
        <Alert type="info">
          Nenhum jogo cadastrado. Clique em "+ Novo jogo" para começar.
        </Alert>
      )}

      {!loading && !error && games.length > 0 && (
        <div className="manage__grid">
          {games.map((game) => (
            <GameCard
              key={game.id}
              game={game}
              onEdit={abrirEdicao}
              onDelete={setConfirmando}
            />
          ))}
        </div>
      )}

      {/* Modal de criação / edição */}
      <Modal
        isOpen={modalAberto}
        onClose={fecharModal}
        title={editando ? 'Editar jogo' : 'Novo jogo'}
      >
        <GameForm
          key={editando?.id ?? 'novo'}
          initialData={editando}
          onSubmit={salvar}
          onCancel={fecharModal}
          submitLabel={editando ? 'Salvar alterações' : 'Adicionar jogo'}
        />
      </Modal>

      {/* Modal de confirmação de exclusão */}
      <Modal
        isOpen={Boolean(confirmando)}
        onClose={() => setConfirmando(null)}
        title="Confirmar exclusão"
      >
        <p className="manage__confirm-text">
          Tem certeza que deseja excluir{' '}
          <strong>{confirmando?.title}</strong>? Esta ação não pode ser desfeita.
        </p>
        <div className="manage__confirm-actions">
          <Button variant="danger" onClick={excluir}>
            Sim, excluir
          </Button>
          <Button variant="secondary" onClick={() => setConfirmando(null)}>
            Cancelar
          </Button>
        </div>
      </Modal>
    </section>
  )
}

export default Manage
