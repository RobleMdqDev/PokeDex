export const API_URL = "http://localhost:8000";
export const API_POKEDEX = "https://pokeapi.co/api/v2/pokedex/1";
export const API_URL_POKEMON = (id)=> `https://pokeapi.co/api/v2/pokemon/${id}`;
export const API_URL_SPECIES = (id)=> `https://pokeapi.co/api/v2/pokemon-species/${id}`;

//POKEMON REDUCER
export const FETCH_POKEMONS = "FETCH_POKEMONS";
//USER REDUCER
export const GET_USER = "GET_USER";
export const LOADING = "LOADING";
export const RELOAD = "RELOAD";
export const LOGOUT = "LOGOUT";
export const LOGIN = "LOGIN";

// LOGIN
export const GO_SIGN_IN = "If you still don't have an account, create one by clicking here!";
export const GO_LOGIN = "Back to login!";
export const LOGIN_BUTTON = "Login!";
export const CREATE_BUTTON = "Create!";
export const PLACEHOLDER_USERNAME = "Type your PokeName!";
export const PLACEHOLDER_PASSWORD = "Type your PokePassword!";
//MyTeam
export const SAVE_AVATAR = 'Save New Avatar!';
export const MYTEAM_TITLE = "My Team";
export const NO_POKEMONS = "You don't have pokemons, catch them all!";
//PAGE404
export const PAGE_NOT_FOUND = "PAGE NOT FOUND";

//ACTIONS
export const SUCCESS = "Success!";
export const ERROR = "Error!";
export const YOU_LOGOUT = "You are about to log out!";
export const USER_NOT_FOUND = "User not found";
export const ADD_TEAM = "Do you want to add this pokemon to your team?";
export const REMOVE_TEAM = "Are you sure to remove this pokémon from your team?";
export const ONLY_SIX = "You can only have 6 pokemons!!";

export const IMG_POKEMON = (id) => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;


