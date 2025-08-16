import axios from "axios";

export const createConnector = async (data, token) => {
  console.log("request", data);
  
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_URL}/connectors/create`,
    data,
    config
  );
  console.log("here", res);

  return res;
};



export const getConnectors = async () => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}/connectors`);
  return res;
};

export const getConnector = async (id) => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}/connectors/${id}`);
  return res;
};



export const createConnectorReview = async (data, connectorId, token) => {
  console.log("request", data);
  
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_URL}/connectorreviews/connectors/${connectorId}/reviews`,
    data,
    config
  );
  console.log("here", res);

  return res;
};

export const getConnectorReviews = async (connectorId, token) => {
  
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_URL}/connectorreviews/connectors/${connectorId}/reviews`,
    config
  );
  console.log("here", res);

  return res;
};


// Assuming you need these connector favorite functions (similar to community favorites)
export const favoriteConnector = async (userId, connectorId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_URL}/favorites/connectors/add`,
    {
      userId,
      connectorId
    },
    config
  );
  console.log("favoriteConnector response", res);

  return res;
};

export const connectorFavoriteChecker = async (userId, connectorId, token) => {
  console.log("connectorFavoriteChecker called with:", { userId, connectorId, hasToken: !!token });
  
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_URL}/favorites/connectors/check/${userId}/${connectorId}`, // Fixed: was /favorites/connector/check/
      config
    );
    console.log("connectorFavoriteChecker response", res);
    return res;
  } catch (error) {
    console.error("connectorFavoriteChecker error:", error);
    throw error;
  }
};

export const removeFavoriteConnector = async (userId, connectorId, token) => {
  console.log("removeFavoriteConnector called with:", { userId, connectorId, hasToken: !!token });
  
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const res = await axios.delete(
      `${process.env.NEXT_PUBLIC_URL}/favorites/connectors/${userId}/${connectorId}`, // Fixed: was /favorites/connector/remove/
      config
    );
    console.log("removeFavoriteConnector response", res);
    return res;
  } catch (error) {
    console.error("removeFavoriteConnector error:", error);
    throw error;
  }
};

export const favoriteConnectorGeneric = async (userId, connectorId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_URL}/favorites/add`,
    {
      userId,
      connectorId,
      favoriteType: "connector"
    },
    config
  );
  console.log("favoriteConnectorGeneric response", res);

  return res;
};