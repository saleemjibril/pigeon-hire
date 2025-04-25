import axios from "axios";

export const registerUser = async (data) => {  
      const res = await axios.post(`${process.env.NEXT_PUBLIC_URL}/auth/register
`, data);
  
      return res;
   
  };

export const loginUser = async (data) => {  
      const res = await axios.post(`${process.env.NEXT_PUBLIC_URL}/auth/login
`, data);
  
      return res;
   
  };

export const verifyEmail = async  (token) => {  
      const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}/auth/verify-email?token=${token}` );
  
      return res;
   
  };