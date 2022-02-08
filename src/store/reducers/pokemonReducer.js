
const initialState = {
    area: '',
    pokemonsData: [],        
}

const pokemonReducer = (state = initialState, action)=>{
    switch (action.type) {
        case 'FETCH_POKEMONS':
            console.log("LO QUE LLEGA EN POKEMON REDUCER: ", action.payload)
            return{
                ...state,
                area: action.payload.descriptions[0].description,
                pokemonsData: action.payload.pokemon_entries,                           
            };        
        default:
           return state;
    }

}

export const pokemonsSelector = (state) => state.pokemonReducer.pokemonsData;

export default pokemonReducer;