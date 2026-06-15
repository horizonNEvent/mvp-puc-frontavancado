// Componente de Loader (indicador de carregamento).
// Exibido enquanto os dados estão sendo "buscados" no servidor simulado.

import './Loader.css'

function Loader({ label = 'Carregando...' }) {
  return (
    <div className="loader" role="status" aria-live="polite">
      <div className="loader__spinner" />
      <p className="loader__label">{label}</p>
    </div>
  )
}

export default Loader
