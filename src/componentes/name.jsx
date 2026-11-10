import useFetchApi from '../hooks/useFetchApi';

export default function Name(){
    const { loading, error, ret } = useFetchApi("https://6a79e554674f43f4db11ebc8.mockapi.io/api/person/", "39");

    if (loading) {
        return (<div>Loading</div>);
    }
    if (error || !ret) {
        return (<div>Ocorreu um erro</div>);
    }

    return (
        <div>
           <h1>{ret.nome || ret.name}</h1> 
        </div>
    );
}
