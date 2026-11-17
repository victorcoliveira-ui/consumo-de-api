import Dbz from "../componentes/dbz";
import Name from "../componentes/name";
import NavigateButton from "../componentes/navigateButtom";
import '../App.css';

export default function Dragonball(){
    return(
        <section id="center">
            <div className="hero">

                <nav className="navigation">
                    <NavigateButton caminho="/pokemon" nome="Pet" />
                    <NavigateButton caminho="/filme" nome="Filme" />
                    <NavigateButton caminho="/" nome="DBZ" />
                </nav>

                <Name />

                <Dbz />

            </div>
        </section>
    )
}
