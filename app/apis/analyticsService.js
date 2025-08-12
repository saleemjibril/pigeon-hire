// services/analyticsService.js
import axios from "axios";

// Cookie utility function
const getCookie = (name) => {
  if (typeof window === 'undefined') return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return decodeURIComponent(parts.pop().split(';').shift());
  return null;
};

// Get user analytics dashboard data
export const getUserAnalytics = async () => {
  try {
    // Get user_id and auth_token from cookies
    const userId = getCookie('user_id');
    const authToken = getCookie('auth_token');

    if (!userId || !authToken) {
      throw new Error('Missing authentication credentials');
    }

    const config = {
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
    };

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_URL}/analytics/dashboard/${userId}`,
      config
    );

    return {
      success: true,
      data: response.data
    };

  } catch (error) {
    console.error('Error fetching analytics:', error);
    return {
      success: false, 
      error: error.response?.data?.message || error.message || 'Failed to fetch analytics'
    };
  }
};