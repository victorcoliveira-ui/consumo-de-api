import {useState, useEffect} from 'react'

function MovieEe(){
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(false)
    const [query, setQuery] = useState('Avengers')
    const API_KEY = '8b4ad1b'

useEffect(() => {
    const getData = async() => {
        setLoading(true)
        try{
            const response = await
            fetch(`https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`)
            const data = await response.json()

            if(data.Response === 'True'){
                setMovies(data.Search)
            }else{
                setMovies([])
            }
        }catch(error){
            console.error("Erro ao buscar filmes:", error)
        }finally{
            setLoading(false)
        }
    }
    const delayDebounceFn = setTimeout(() => {
        if(query.trim() !== ''){
            getData()
        }else{
            setMovies([])
        }
    }, 800)

    return() => clearTimeout(delayDebounceFn)
    }, [query])

    return(
        <div className="card">
            <h2>Nível Médio: Consumo de API OMDb com Debounce</h2>
            <p>Busca filmes assim que você para de digitar</p>
            <input
             type="text" 
             value={query}
             onChange={(e) => setQuery(e.target.value)}
             placeholder="Buscar filme..."
             />

             {loading && <p>Carregando filmes...</p>}
             {!loading && movies.length > 0 &&(
                <ul className="movie-list">
                    {movies.map((movie) => (
                        <li key={movie.imdbID}>
                            <strong>{movie.Title}</strong> ({movie.Year})
                        </li>
                    ))}
                </ul>
             )}

             {!loading && movies.length === 0 &&(
                <p>Nenhum filme encontrado.</p>
             )}
             </div>
    )
}

export default MovieEe