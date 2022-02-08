import jwt_decode from "jwt-decode";

export const getAccessToken = () => {
  const accessToken = sessionStorage.getItem("token");
  const id = sessionStorage.getItem("id");

  if (!accessToken || accessToken === "null" || !id || id === "null") {
    return false;
  }

  const metaToken = jwt_decode(accessToken);

  if (tokenExpira(accessToken, metaToken) || metaToken.id === id) {
    return false;
  } else {
    return true;
  }
};

// FUNCION PARA VERIFICAR FECHA DE EXPIRACION TOKEN

const tokenExpira = (accessToken, metaToken) => {
  const seconds = 60;
  const { exp } = metaToken;
  const now = (Date.now() + seconds) / 1000;
  return exp < now;
};
