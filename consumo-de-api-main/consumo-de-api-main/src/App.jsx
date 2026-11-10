import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import axios from 'axios'
import MovieTc from './componentes/listMovie'

function App() {
const API_KEY = 'a8b4ad1b'; 
const [perfil, setPerfil] = useState({})
const [filme , setFilme ] = useState([]);
const [pokemon , setPokemon ] = useState([]);
const [ DBZ, setDBZ ] = useState([]);
const [count, setCount] = useState([0]); 
const [person, setPerson] = useState({}); 
const [loading, setLoading] = useState(true); 
const [error, setError] = useState(false); 
const [text, setText] = useState(() => {
  return localStorage.getItem('easy-input') || '';
});


useEffect(() => { 
const getData = async () => { 
try { 
const res = await axios.get( "https://6a79e554674f43f4db11ebc8.mockapi.io/api/person" ); 
setPerson(res.data); 
const res2 = await axios.get( "https://dragonball-api.com/api/characters/65" ); 
setDBZ(res2.data); 
const respokemon = await axios.get("https://pokeapi.co/api/v2/pokemon/ditto " );
setPokemon(respokemon.data);
const resfilme = await axios.get("https://www.omdbapi.com/?i=tt3896198&apikey=a8b4ad1b");
setFilme(resfilme.data);
console.log("Success:", res.data); 
setLoading(false); 
} 
catch (e) { 
console.error( "Erro ao carregar API", e ); 
setLoading(false); 
setError(true); 
} 
} 
getData(); 
}, []);

 useEffect(() => {
    localStorage.setItem('easy-input', text);
    console.log('Fácil: Salvando no localStorage ->', text);
  }, [text]); 



if(loading){ return(<div>carregando</div>)}
if(error){ return(<div>ocorreu um erro</div>)}

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={DBZ.image} className="base" width="170" height="179" alt="" />
          
        </div>
        <div>
          <h1>{person[39].nome}</h1>
          <MovieTc />
          <p>
            Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
          </p>
        </div>
        <button
          type="button"
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>meu filme</h2>
          <img src={filme.Poster} alt="" />
          <p>{filme.Title}</p>
          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank">
                <img className="logo" src={viteLogo} alt="" />
                Explore Vite
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank">
                <img className="button-icon" src={reactLogo} alt="" />
                Learn more
              </a>
            </li>
          </ul>
        </div>
        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>meu pet</h2>
          <p>{pokemon.nome}</p>
          <img src={pokemon.sprites.front_default} alt="" />
          <ul>
            <li>
              <a href="https://github.com/vitejs/vite" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://chat.vite.dev/" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
                Discord
              </a>
            </li>
            <li>
              <a href="https://x.com/vite_js" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#x-icon"></use>
                </svg>
                X.com
              </a>
            </li>
            <li>
              <a href="https://bsky.app/profile/vite.dev" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#bluesky-icon"></use>
                </svg>
                Bluesky
              </a>
            </li>
          </ul>
        </div>
      </section>
      
      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
