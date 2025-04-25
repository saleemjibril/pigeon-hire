import axios from "axios";

export const createCommunity = async (data) => {  
      const res = await axios.post(`${process.env.NEXT_PUBLIC_URL}/communitytypes/create

`, data);
  
      return res;
   
  };

