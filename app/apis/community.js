import axios from "axios";

export const getCommunityTypes = async () => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_URL}/communitytypes`
  );
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
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_URL}/contentshared`
  );
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
