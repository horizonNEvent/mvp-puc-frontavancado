// Componente de Botão reutilizável.
// Recebe props para variar o estilo (variant), tamanho e estado.
// É usado em várias páginas (catálogo, detalhe, formulário, 404).

import './Button.css'

function Button({
  children,
  onClick,
  variant = 'primary',
  type = 'button',
  disabled = false,
  fullWidth = false,
  title,
}) {
  const classes = [
    'btn',
    `btn--${variant}`,
    fullWidth ? 'btn--full' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
      title={title}
    >
      {children}
    </button>
  )
}

export default Button
