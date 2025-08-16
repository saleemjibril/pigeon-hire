
import axios from 'axios';

export const updateUserProfile = async (userId, profileData, token) => {
  console.log("Updating profile for user:", userId, profileData);
  
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
  };

  const res = await axios.put(
    `${process.env.NEXT_PUBLIC_URL}/users/profile/${userId}`,
    profileData,
    config
  );
  
  console.log("Profile update response:", res);
  return res;
};

export const getUserProfile = async (userId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_URL}/users/profile/${userId}`,
    config
  );
  
  return res;
};

export const uploadProfileImage = async (userId, imageUrl, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
  };

  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_URL}/users/profile/${userId}/upload-image`,
    { imageUrl },
    config
  );
  
  return res;
};

export const changeUserPassword = async (userId, passwordData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
  };

  const res = await axios.put(
    `${process.env.NEXT_PUBLIC_URL}/users/profile/${userId}/change-password`,
    passwordData,
    config
  );
  
  return res;
};