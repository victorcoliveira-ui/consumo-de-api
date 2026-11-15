import MovieEe from './componentes/listMovie'
import Pokemon from './componentes/pokemon'
import Poster from './componentes/postermovie'
import Name from './componentes/name'
import Dbz from './componentes/dbz'
import Card from './componentes/Card'
import './App.css'

function App() {
  return (
    <main className="app">
      <header className="app-header">
        <h1>Projeto de consumo de APIs</h1>
        <p>Consultas à PokéAPI e OMDb.</p>
      </header>

      <section className="app-section">
        <h2>Pokémon</h2>

        <Card
          title="Pikachu"
          mediaUrl="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"
          tags={['Elétrico']}
          metadata={['Número: 25', 'Região: Kanto']}
        />

        <Pokemon />
      </section>

      <section className="app-section">
        <h2>Filmes</h2>
        <MovieEe />
        <Poster />
      </section>

      <section className="app-section">
        <h2>Outras consultas</h2>
        <Name />
        <Dbz />
      </section>
    </main>
  )
}

export default App