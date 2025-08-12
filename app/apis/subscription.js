import axios from "axios";

export const getSubscriptionPlans = async (token) => {
  
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_URL}/subscriptions/plans`,
      config
    );
    console.log("here", res);
  
    return res;
  };