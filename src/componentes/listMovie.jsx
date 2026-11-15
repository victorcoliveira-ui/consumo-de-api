import { useState, useEffect } from 'react'

function MovieEe() {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [query, setQuery] = useState('Avengers')
  const [error, setError] = useState('')

  const API_KEY = import.meta.env.VITE_OMDB_API_KEY

  useEffect(() => {
    const delay = setTimeout(async () => {
      if (query.trim() === '') {
        setMovies([])
        setError('')
        return
      }

      if (!API_KEY) {
        setError('A chave da API não foi configurada.')
        return
      }

      setLoading(true)
      setError('')

      try {
        const response = await fetch(
          `https://www.omdbapi.com/?s=${encodeURIComponent(query)}&apikey=${API_KEY}`
        )

        const data = await response.json()

        if (data.Response === 'True') {
          setMovies(data.Search)
        } else {
          setMovies([])
          setError(data.Error || 'Nenhum filme encontrado.')
        }
      } catch (error) {
        console.error('Erro ao buscar filmes:', error)
        setError('Não foi possível buscar os filmes.')
      } finally {
        setLoading(false)
      }
    }, 800)

    return () => clearTimeout(delay)
  }, [query, API_KEY])

  return (
    <div className="movie-search">
      <h2>Buscar filmes</h2>
      <p>Digite o nome de um filme para fazer a busca.</p>

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar filme..."
      />

      {loading && <p>Carregando filmes...</p>}

      {error && <p role="alert">{error}</p>}

      {!loading && movies.length > 0 && (
        <ul className="movie-list">
          {movies.map((movie) => (
            <li key={movie.imdbID}>
              <strong>{movie.Title}</strong> ({movie.Year})
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default MovieEe