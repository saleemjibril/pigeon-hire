import axios from "axios";

export const getCommunityTypes = async () => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}/communitytypes`);
  return res;
};

export const getGoals = async () => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}/goals`);
  return res;
};

export const getEngagementLevels = async () => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_URL}/engagementLevels`
  );
  return res;
};

export const getCommunitySizes = async () => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}/sizes`);
  return res;
};

export const getContentSharedTypes = async () => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}/contentshared`);
  return res;
};

export const getConnectionCategories = async () => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_URL}/connectioncategories`
  );
  return res;
};

export const getCurrencies = async () => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}/currencies`);
  return res;
};
export const getCommunities = async () => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}/communities`);
  console.log("here", res);

  return res;
};
export const getPlatformUsed = async () => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_URL}/communicationPlatforms`
  );
  console.log("here", res);

  return res;
};
export const createCommunity = async (data, token) => {
  console.log("request", data);
  
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_URL}/communities/create`,
    data,
    config
  );
  console.log("here", res);

  return res;
};


export const getCommunity = async (id) => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}/communities/${id}`);
  return res;
};


