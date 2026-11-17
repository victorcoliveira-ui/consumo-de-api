import PokemonComponent from "../componentes/pokemon";
import Name from "../componentes/name";
import NavigateButton from "../componentes/navigateButtom";
import '../App.css';

export default function Pokemon(){
    return(
        <section id="center">
            <div className="hero">

                <nav className="navigation">
                    <NavigateButton caminho="/pokemon" nome="Pet" />
                    <NavigateButton caminho="/filme" nome="Filme" />
                    <NavigateButton caminho="/" nome="DBZ" />
                </nav>

                <Name />

                <PokemonComponent />

            </div>
        </section>
    )
}
