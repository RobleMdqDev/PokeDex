
export const fetchCustom = async ({
  keyValue = true,
  API_URL,
  BASE = "",
  ID = "",
  METHOD = "get",
  HEADER = "",
  data,
}) => {
  const AUTH_HEADER = {
    Authorization: !keyValue ? "" : sessionStorage.getItem("token"),
  };

  let url = `${API_URL}`;
  if (BASE) url = url + `/${BASE}`;
  if (ID) url = url + `/${ID}`;

  let options = {
    method: METHOD,
    headers: {
      ...HEADER,
      ...AUTH_HEADER,
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "*",
      "Access-Control-Allow-Credentials": true,
    },
  };

  if (data) options.body = JSON.stringify(data);

  try {
    const response = await fetch(url, options)
      .then((resp) => resp.json())
      .then((resp) => resp)
      .catch((error)=>{throw new Error(error)});
    return response;
  } catch (error) {
    throw new Error({error: error.message})    
  }
};
