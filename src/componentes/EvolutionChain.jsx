import { useEffect, useState } from 'react'
import axios from 'axios'

function EvolutionNode({ pokemon }) {
  if (!pokemon) return null

  return (
    <li className="evolution-node">
      <span>{pokemon.species.name}</span>
      {pokemon.evolves_to.length > 0 && (
        <ul>
          {pokemon.evolves_to.map((evolution, index) => (
            <EvolutionNode
              key={`${evolution.species.name}-${index}`}
              pokemon={evolution}
            />
          ))}
        </ul>
      )}
    </li>
  )
}

function EvolutionChain({ chainUrl }) {
  const [chain, setChain] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!chainUrl) return

    let ativo = true
    const controller = new AbortController()

    const timer = setTimeout(async () => {
      setLoading(true)
      setChain(null)

      try {
        const response = await axios.get(chainUrl, {
          signal: controller.signal
        })

        if (ativo) setChain(response.data.chain)
      } catch (error) {
        if (ativo && !controller.signal.aborted) {
          console.error('Erro ao buscar evoluções:', error)
          setChain(null)
        }
      } finally {
        if (ativo) setLoading(false)
      }
    }, 0)

    return () => {
      ativo = false
      clearTimeout(timer)
      controller.abort()
    }
  }, [chainUrl])

  if (loading) return <p>Carregando evoluções...</p>
  if (!chain) return null

  if (chain.evolves_to.length === 0) {
    return (
      <div className="evolution-section">
        <h3>Evoluções</h3>
        <p>Esse Pokémon não possui evoluções.</p>
      </div>
    )
  }

  return (
    <div className="evolution-section">
      <h3>Evoluções</h3>
      <ul className="evolution-tree">
        <EvolutionNode pokemon={chain} />
      </ul>
    </div>
  )
}

export default EvolutionChain
