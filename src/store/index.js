import { combineReducers } from "redux";
import userReducer from "./reducers/userReducer";
import pokemonReducer from "./reducers/pokemonReducer";

export default combineReducers({
    userReducer,
    pokemonReducer,    
  })
