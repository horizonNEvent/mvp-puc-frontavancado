// Embed 3D do Spline — animação de dados para a página Jogo Aleatório.
// Cena externa: https://my.spline.design/dices-ZXx4pQJwF92BYVtrDkImN1TL/

import './SplineDice.css'

function SplineDice({ rolling = false }) {
  return (
    <div
      className={`spline-dice ${rolling ? 'spline-dice--rolling' : ''}`}
      aria-hidden={rolling ? undefined : true}
    >
      <iframe
        src="https://my.spline.design/dices-ZXx4pQJwF92BYVtrDkImN1TL/"
        title="Animação de dados 3D"
        frameBorder="0"
        loading="lazy"
        allow="autoplay; fullscreen"
      />
    </div>
  )
}

export default SplineDice
