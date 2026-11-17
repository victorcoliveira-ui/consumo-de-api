import {Link} from "react-router-dom";

function NavigateButton({caminho, nome}){
    return <Link to={`${caminho}`}>
        {nome}
    </Link>
}
export default NavigateButton