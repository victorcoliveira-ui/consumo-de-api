import useFetchApi from '../hooks/useFetchApi';

export default function Poster(){
    const{loading, error, ret} = useFetchApi("https://www.omdbapi.com/?i=tt3896198&apikey=a8b4ad1b")
    if(loading){
        return(<div>Loading</div>)
    }
    if(error){
        return(<div>Ocorreu um erro</div>)
    }
    return(
        <div>
          <h2>Meu filme</h2>
          <p>{ret.Title}</p>
          <img src={ret.Poster} alt="" />
        </div>
    )
}
