import axios from "axios";

export const registerUser = async (data) => {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_URL}/auth/register
`,
    data
  );

  return res;
};

export const loginUser = async (data) => {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_URL}/auth/login
`,
    data
  );

  return res;
};

export const verifyEmail = async (token) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_URL}/auth/verify-email?token=${token}`
  );

  return res;
};

export const forgotPassword = async (email) => {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_URL}/auth/forgot-password`,
    {
      email,
    }
  );

  return res;
};
export const verifyOtp = async (otp, token) => {
  const config = {
    headers: {
      'x-reset-token': token
    },
  };
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_URL}/auth/verify-otp`,
    {
      otp
    },
    config
  );

  return res;
};
export const resetPassword = async (newPassword, token) => {
  const config = {
    headers: {
      'x-reset-token': token
    },
  };
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_URL}/auth/reset-password`,
    {
      newPassword,
    },
    config
  );

  return res;
};
