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
