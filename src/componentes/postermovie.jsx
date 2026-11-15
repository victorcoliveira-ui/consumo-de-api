import useFetchApi from '../hooks/useFetchApi'
import Card from './Card'

export default function Poster() {
  const API_KEY = import.meta.env.VITE_OMDB_API_KEY

  const { loading, error, ret } = useFetchApi(
    API_KEY
      ? `https://www.omdbapi.com/?i=tt0816692&apikey=${API_KEY}`
      : ''
  )

  if (!API_KEY) {
    return <p>Configure a chave da API para mostrar o filme.</p>
  }

  if (loading) {
    return <p>Carregando filme...</p>
  }

  if (error || !ret || ret.Response === 'False') {
    return <p>Não foi possível carregar o filme.</p>
  }

  return (
    <div className="featured-movie">
      <h2>Meu filme</h2>

      <Card
        title={ret.Title}
        mediaUrl={ret.Poster !== 'N/A' ? ret.Poster : ''}
        tags={[ret.Genre, ret.Year].filter(Boolean)}
        metadata={[
          `Diretor: ${ret.Director}`,
          `Elenco: ${ret.Actors}`,
          `Nota: ${ret.imdbRating}`
        ].filter((item) => !item.endsWith('undefined'))}
      />
    </div>
  )
}