// services/communityService.js - Updated for current env variable
import axios from "axios";

const getCookie = (name) => {
  if (typeof window === 'undefined') return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return decodeURIComponent(parts.pop().split(';').shift());
  return null;
};

export const createCommunity = async (communityData, token) => {
  try {
    const authToken = token || getCookie('auth_token');
    
    console.log("Auth token:", authToken ? "Present" : "Missing");
    console.log("Community data being sent:", communityData);
    
    if (!authToken) {
      throw new Error('Missing authentication token');
    }

    // Since NEXT_PUBLIC_URL already includes /api, just add the specific endpoint
    const apiUrl = `${process.env.NEXT_PUBLIC_URL}/communities/create`;
    console.log("API URL:", apiUrl);

    const config = {
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
      timeout: 30000,
    };

    const response = await axios.post(apiUrl, communityData, config);

    console.log("Response status:", response.status);
    console.log("Response data:", response.data);

    if (response.status >= 200 && response.status < 300) {
      if (response.data && (response.data.record || response.data.msg)) {
        return {
          success: true,
          data: response.data,
          message: response.data.msg || "Community created successfully",
          record: response.data.record
        };
      }
    }

    return {
      success: false,
      error: "Unexpected response format",
      fullError: response.data
    };

  } catch (error) {
    console.error('Full error object:', error);
    console.error('Error response:', error.response);
    console.error('Error response data:', error.response?.data);
    console.error('Error response status:', error.response?.status);
    console.error('Error message:', error.message);
    
    let errorMessage = 'Failed to create community';
    let errorType = 'UnknownError';
    
    if (error.response?.data?.error?.name === 'SequelizeUniqueConstraintError') {
      errorType = 'UniqueConstraintError';
      const field = error.response.data.error.errors?.[0]?.path;
      const value = error.response.data.error.errors?.[0]?.value;
      
      if (field === 'name') {
        errorMessage = `A community with the name "${value}" already exists. Please choose a different name.`;
      } else if (field === 'email') {
        errorMessage = `This email address is already registered. Please use a different email.`;
      } else {
        errorMessage = `This ${field} is already taken. Please use a different value.`;
      }
    } else if (error.response?.data?.msg) {
      errorMessage = error.response.data.msg;
    } else if (error.response?.data?.message) {
      errorMessage = error.response.data.message;
    } else if (error.message) {
      errorMessage = error.message;
    }
    
    return {
      success: false, 
      error: errorMessage,
      errorType: errorType,
      statusCode: error.response?.status,
      fullError: error.response?.data
    };
  }
};