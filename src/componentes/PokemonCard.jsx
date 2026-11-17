import './PokemonCard.css'

function PokemonCard({ name, image, type, hp, attack }) {
  return (
    <div className={`pokemon-card tipo-${type || 'normal'}`}>
      <img src={image} alt={name} />

      <div className="pokemon-info">
        <h3>{name}</h3>

        <p>Tipo: {type}</p>
        <p>HP: {hp}</p>
        <p>Ataque: {attack}</p>
      </div>
    </div>
  )
}

export default PokemonCard