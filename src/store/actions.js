import { fetchCustom } from "../functions/fetchCustom";
import { customAlert } from "../functions/sweetAlert";

//USER ACTIONS

export const loadUser = (userData) => async (dispatch) => {  

  try {
    dispatch({ type: "LOADING", payload: true });
    const resp = await fetchCustom({
      keyValue: false,
      METHOD: "post",
      API_URL: "http://localhost:8000",
      BASE: "login",
      data: {
        ...userData,
      },
    });

    dispatch({
      type: "LOGIN",
      payload: resp,
    });
    dispatch({ type: "LOADING", payload: false });
  } catch (error) {
    customAlert({
      description:{title: 'Error', description:error.message},
      icon:{icon: 'error'}
    })
    dispatch({ type: "LOADING", payload: false });
  }
};

export const logoutUser = () => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });
  try {
    customAlert({
      description: {
        title: "You are about to log out!",
        text: "You won't be able to revert this!",
      },
      cancel: true,
      img: { imageUrl: require("../img/logout.png") },
      then: async () => {
        await fetchCustom({
          keyValue: false,
          METHOD: "put",
          API_URL: "http://localhost:8000",
          BASE: "logout",
          data: 'Logout'
        });
        
        dispatch({
          type: "LOGOUT"
        });
      },
    });
    dispatch({ type: "LOADING", payload: false });
  } catch (error) {
    customAlert({
      description:{title: 'Error', description:error.message},
      icon:{icon: 'error'}
    })
    dispatch({ type: "LOADING", payload: false });
  }
};

export const getUser = (user) => async (dispatch) => {
  if (!user && !sessionStorage.getItem("user"))
    return customAlert({
      description: {
        title: "Error!",
        text: "User not found",
      },
      icon: { icon: "error" },
    });
  const userSelected = user.username
    ? user.username
    : sessionStorage.getItem("user");  
  try {
    dispatch({ type: "LOADING", payload: true });
    const resp = await fetchCustom({
      keyValue: true,
      METHOD: "get",
      API_URL: "http://localhost:8000",
      HEADER: { "Cache-Control": "no-cache" },
      BASE: "users",
      ID: userSelected,
    });

    dispatch({
      type: "GET_USER",
      payload: resp,
    });
    dispatch({ type: "LOADING", payload: false });
  } catch (error) {
    customAlert({
      description:{title: 'Error', description:error.message},
      icon:{icon: 'error'}
    })
    dispatch({ type: "LOADING", payload: false });
  }
};

export const updateUser = (user, data) => async (dispatch) => {
      console.log(data)
      dispatch({ type: "LOADING", payload: true });
      await fetchCustom({
        METHOD: "put",
        API_URL: "http://localhost:8000",
        BASE: "users",
        ID: user.id,
        data: data,
      });
      await dispatch(getUser(user));
      await customAlert({
        description: {
          title: 'Done!',
          text: " ",
        },        
        img: {
          imageUrl: require('../img/pokegif.gif'),
        }
      });
      dispatch({ type: "LOADING", payload: false });

}

//POKEMON ACTIONS

export const fetchPokemons = () => async (dispatch) => {
  try {
    dispatch({ type: "LOADING", payload: true });
    const resp = await fetchCustom({
      keyValue: false,
      API_URL: `https://pokeapi.co/api/v2/pokedex/1`,
    });
    
    dispatch({
      type: "FETCH_POKEMONS",
      payload: resp,
    });
    dispatch({ type: "LOADING", payload: false });
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOADING", payload: false });
  }
};

export const updateMyTeam = (pokeID, user) => async (dispatch) => {  

  const urlPokemon = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeID}.png`;

  let userTeam = "";
  let titleAlert = `Do you want to add this pokemon to your team?`;
  
  if (user.team === null) {
    userTeam = `${pokeID}`;
  } else if (
    user.team
      .split("-")
      .filter((e) => e !== "-" && e !== "")
      .includes(pokeID)
  ) {
    const aux = user.team.split("-").filter((e) => e !== "-" && e !== "");
    userTeam = aux.filter((e) => !e.includes(pokeID)).join("-");
    titleAlert = `Are you sure to remove this pokémon from your team?`;
  } else if (
    user.team.split("-").filter((e) => e !== "-" && e !== "").length < 6
  ) {
    userTeam = user.team + `-${pokeID}`;
  } else {
    return customAlert({
      description: {
        title: "Error!",
        text: "You can only have 6 pokemons!!",
      },
      img: {
        imageUrl: urlPokemon,
      },
    });
  }

  const data = { team: userTeam };

  customAlert({
    description: {
      title: titleAlert,
      text: " ",
    },
    cancel: true,
    img: {
      imageUrl: urlPokemon,
    },
    then: async () => {
      dispatch(updateUser(user, data))
    },
  });  

};
