import axios from "axios";

export const createLead = async (data, token) => {
  console.log("createLead request", data);
  
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_URL}/analytics/leads`,
    data,
    config
  );
  console.log("createLead response", res);

  return res;
};