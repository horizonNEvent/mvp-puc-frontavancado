// Componente de Tooltip reutilizável.
// Mostra uma pequena explicação quando o usuário passa o mouse
// sobre o elemento filho. Usado em botões e ícones para melhorar a usabilidade.

import './Tooltip.css'

function Tooltip({ text, children }) {
  return (
    <span className="tooltip">
      {children}
      <span className="tooltip__bubble" role="tooltip">
        {text}
      </span>
    </span>
  )
}

export default Tooltip
