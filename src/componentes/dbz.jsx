import useFetchApi from '../hooks/useFetchApi';

export default function Dbz(){
    const{loading, error, ret} = useFetchApi("https://dragonball-api.com/api/characters/", "65")
    if(loading){
        return(<div>Loading</div>)
    }
    if(error){
        return(<div>Ocorreu um erro</div>)
    }
    return(
        <div>
            <img src={ret.image} className="base" width="170" height="179" alt="" />
        </div>
    )
}

