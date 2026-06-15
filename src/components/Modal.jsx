// Componente de Modal (janela) reutilizável.
// Usado para abrir o formulário de criar/editar jogos e a confirmação
// de exclusão. Fecha ao clicar fora, no botão X ou ao pressionar Esc.

import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import './Modal.css'

function Modal({ title, isOpen, onClose, children }) {
  // Só fecha o overlay se o clique começar E terminar nele (evita fechar
  // com o mesmo clique que abriu o modal ou ao usar <select> no formulário).
  const overlayPointerDown = useRef(false)

  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.addEventListener('keydown', handleKey)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  function handleOverlayPointerDown(e) {
    overlayPointerDown.current = e.target === e.currentTarget
  }

  function handleOverlayPointerUp(e) {
    if (overlayPointerDown.current && e.target === e.currentTarget) {
      onClose()
    }
    overlayPointerDown.current = false
  }

  return createPortal(
    <div
      className="modal__overlay"
      onPointerDown={handleOverlayPointerDown}
      onPointerUp={handleOverlayPointerUp}
    >
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        onPointerDown={(e) => e.stopPropagation()}
        onPointerUp={(e) => e.stopPropagation()}
      >
        <div className="modal__header">
          <h2 className="modal__title">{title}</h2>
          <button
            className="modal__close"
            onClick={onClose}
            aria-label="Fechar"
          >
            ×
          </button>
        </div>
        <div className="modal__body">{children}</div>
      </div>
    </div>,
    document.body
  )
}

export default Modal
