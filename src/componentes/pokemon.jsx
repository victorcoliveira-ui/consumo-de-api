import useFetchApi from '../hooks/useFetchApi';

export default function Pokemon() {
    const { loading, error, ret } = useFetchApi(
        "https://pokeapi.co/api/v2/pokemon/",
        "ditto"
    );

    if (loading) return <p>Carregando...</p>;
    if (error || !ret) return <p>Ocorreu um erro.</p>;

    return (
        <div>
            <h2>Meu pet</h2>
            <p>{ret.name}</p>
            <img
                src={ret.sprites.front_default}
                alt={ret.name}
            />
            <p>{ret.types[0].type.name}</p>
        </div>
    );
}