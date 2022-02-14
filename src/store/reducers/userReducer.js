import { GET_USER, LOADING, LOGIN, LOGOUT, RELOAD } from "../../constants";

const initialState = {
  user: {},
  token: "",
  loading: false,
  status: "",
  team: "",
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        user: action.payload,
        team: action.payload.team,
        loading: false,
      };
    case LOGIN:
      sessionStorage.setItem("token", action.payload.token);
      sessionStorage.setItem("user", action.payload.user.username);
      sessionStorage.setItem("id", action.payload.user.id);
      return {
        ...state,
        status: action.payload.status,
        user: action.payload.user,
        team: action.payload.user.team,
        token: action.payload.token,
        loading: false,
      };
    case RELOAD:
      return {
        ...state,
        status: action.payload.status,
        user: action.payload.user,
        team: action.payload.user.team,
        token: action.payload.token,
        loading: false,
      };
    case LOGOUT:
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("user");
      sessionStorage.removeItem("id");

      return {
        ...state,
        user: {},
        token: "",
        loading: false,
        team: "",
        status: "",
      };
    case LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};

export const userStatusSelector = (state) => state.userReducer.status;
export const userSelector = (state) => state.userReducer.user;
export const userTeamSelector = (state) => state.userReducer.team;
export const userLoading = (state) => state.userReducer.loading;

export default userReducer;
