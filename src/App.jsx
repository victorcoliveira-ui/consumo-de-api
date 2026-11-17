import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dragonball from "./paginas/dragonball";
import Filme from "./paginas/filme";
import PokemonPage from "./paginas/pokemon";
import './App.css';

function App(){
   return(
       <BrowserRouter>
          <Routes>
            <Route path="/" element={<Dragonball />} />
            <Route path="/filme" element={<Filme />} />
            <Route path="/pokemon" element={<PokemonPage />} />
          </Routes>
       </BrowserRouter>
   )
}

export default App;
