import { fetchCustom } from "../../functions/fetchCustom"

export const getEvolutionPokemons = (chain)=>{
    const auxArr = []
    auxArr.push(chain.species)
    if(chain.evolves_to){
       chain.evolves_to.map(item => { 
           auxArr.push(item.species)
           if (item.evolves_to) {
               item.evolves_to.map(items => auxArr.push(items.species))     
           }
           return ''
       })
    }
    return auxArr.map(item => ({
        name: item.name,
        id: item.url.slice(42).replace('/', '')
    }))
}

export const fillData = async (id) => {  
        
    const pokemonData = await fetchCustom({
      keyValue: false,
      API_URL: `https://pokeapi.co/api/v2/pokemon/${id}`,
    });
    
    const pokemonSpeciesData = await fetchCustom({
        keyValue: false,
        API_URL: `https://pokeapi.co/api/v2/pokemon-species/${id}`,
      });
         
    const pokemonChainEvolution = await fetchCustom({
        keyValue: false,
        API_URL: pokemonSpeciesData.evolution_chain.url,
      });

    const pokemonEvolutions = getEvolutionPokemons(pokemonChainEvolution.chain)
       
    return {pokemonSpeciesData, pokemonData, pokemonEvolutions}
};
