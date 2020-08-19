const container: HTMLElement | any = document.getElementById("app");

const pokemons: number = 100;
const urlApi = `https://pokeapi.co/api/v2/pokemon/`;

interface IPokemon { 
    id: number;
    name: string;
    image: string;
    type: string;
}

const fetchData = (): void => {
    for (let index = 1; index < pokemons; index++) {
        getPokemon(index);
        
    }
}

const getPokemon = async (id: number): Promise<void> => {
    const data: Response = await fetch(`${urlApi}${id}`);
    const pokemon: any = await data.json();
    const pokemonType: string = pokemon.types 
       .map((poke: any) => poke.type.name)
        .join(", ");
    
        const transformedPokemon: IPokemon = {
            id: pokemon.id,
            name: pokemon.name,
            image: `${pokemon.sprites.front_default}`,
            type: pokemonType,
    }
    
    showPokemon(transformedPokemon)
     
}

const showPokemon = (pokemon: IPokemon): void => {
    let output: string = `
       <div class="card">
            <span class="card--id">#${pokemon.id}</span>
            <img class="card--image" src=${pokemon.image} alt=${pokemon.name} />
            <h1 class="card--name">${pokemon.name}</h1>
            <div class="card--details">${pokemon.type}</div>
       </div>
    `;
    container.innerHTML += output;
}

fetchData();