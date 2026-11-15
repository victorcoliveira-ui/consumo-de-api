import { useCallback, useEffect, useRef, useState } from 'react'
import axios from 'axios'
import PokemonCard from './PokemonCard'
import EvolutionChain from './EvolutionChain'

const MAX_POKEMON_ID = 1025

export default function Pokemon() {
  const [pokemon, setPokemon] = useState(null)
  const [chainUrl, setChainUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const requestInProgress = useRef(false)

  const sortearPokemon = useCallback(async () => {
    if (requestInProgress.current) return

    requestInProgress.current = true
    setLoading(true)
    setError('')
    setPokemon(null)
    setChainUrl('')

    try {
      const id = Math.floor(Math.random() * MAX_POKEMON_ID) + 1

      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${id}`
      )

      setPokemon(response.data)

      try {
        const speciesResponse = await axios.get(response.data.species.url)
        setChainUrl(speciesResponse.data.evolution_chain.url)
      } catch (speciesError) {
        console.error('Erro ao buscar evolução:', speciesError)
      }
    } catch (requestError) {
      console.error('Erro ao buscar Pokémon:', requestError)

      setError(
        'Não foi possível buscar um Pokémon. Verifique sua internet e tente novamente.'
      )
    } finally {
      requestInProgress.current = false
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      sortearPokemon()
    }, 0)

    return () => clearTimeout(timer)
  }, [sortearPokemon])

  const mainType = pokemon?.types?.[0]?.type?.name || 'normal'

  const hp = pokemon?.stats?.find(
    (stat) => stat.stat.name === 'hp'
  )?.base_stat

  const attack = pokemon?.stats?.find(
    (stat) => stat.stat.name === 'attack'
  )?.base_stat

  const image =
    pokemon?.sprites?.other?.['official-artwork']?.front_default ||
    pokemon?.sprites?.front_default

  return (
    <div className="pokemon-area">
      <p>Encontre um Pokémon aleatório.</p>

      <button
        type="button"
        onClick={sortearPokemon}
        disabled={loading}
      >
        {loading ? 'Sorteando...' : 'Sortear outro Pokémon'}
      </button>

      {loading && <p>Carregando Pokémon...</p>}

      {error && <p role="alert">{error}</p>}

      {pokemon && !loading && (
        <>
          <PokemonCard
            name={pokemon.name}
            image={image}
            type={mainType}
            hp={hp}
            attack={attack}
          />

          <EvolutionChain chainUrl={chainUrl} />
        </>
      )}
    </div>
  )
}
