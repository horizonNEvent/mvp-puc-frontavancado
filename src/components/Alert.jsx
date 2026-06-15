// Componente de Alerta/Feedback reutilizável.
// Mostra mensagens de sucesso, erro, aviso ou informação ao usuário.
// Usado para dar feedback visual após ações (ex: adicionar jogo à lista).

import './Alert.css'

function Alert({ type = 'info', children, onClose }) {
  return (
    <div className={`alert alert--${type}`} role="alert">
      <span className="alert__message">{children}</span>
      {onClose && (
        <button
          className="alert__close"
          onClick={onClose}
          aria-label="Fechar alerta"
        >
          ×
        </button>
      )}
    </div>
  )
}

export default Alert
