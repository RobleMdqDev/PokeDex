import { API_URL_POKEMON, API_URL_SPECIES } from "../../constants";
import { fetchCustom } from "../../functions/fetchCustom";

export const getEvolutionPokemons = (chain) => {
  const auxArr = [];
  auxArr.push(chain.species);
  if (chain.evolves_to) {
    chain.evolves_to.map((item) => {
      auxArr.push(item.species);
      if (item.evolves_to) {
        item.evolves_to.map((items) => auxArr.push(items.species));
      }
      return "";
    });
  }
  return auxArr.map((item) => ({
    name: item.name,
    id: item.url.slice(42).replace("/", ""),
  }));
};

export const fillData = async (id) => {
  try {
    const pokemonData = await fetchCustom({
      keyValue: false,
      API_URL: API_URL_POKEMON(id),
    });
  
    const pokemonSpeciesData = await fetchCustom({
      keyValue: false,
      API_URL: API_URL_SPECIES(id),
    });
  
    const pokemonChainEvolution = await fetchCustom({
      keyValue: false,
      API_URL: pokemonSpeciesData.evolution_chain.url,
    });
  
    
    const pokemonEvolutions = getEvolutionPokemons(pokemonChainEvolution.chain);
  
    return { pokemonSpeciesData, pokemonData, pokemonEvolutions };
  } catch (error) {
    return undefined;
  }
  
};
