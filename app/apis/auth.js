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


// import axios from "axios";

// // API Service Functions
// export const registerUser = async (data) => {
//   const res = await axios.post(
//     `${process.env.NEXT_PUBLIC_URL}/auth/register`,
//     data
//   );
//   return res;
// };

// export const loginUser = async (data) => {
//   const res = await axios.post(
//     `${process.env.NEXT_PUBLIC_URL}/auth/login`,
//     data
//   );
//   return res;
// };

// export const verifyEmail = async (token) => {
//   const res = await axios.get(
//     `${process.env.NEXT_PUBLIC_URL}/auth/verify-email?token=${token}`
//   );
//   return res;
// };

// export const forgotPassword = async (email) => {
//   const res = await axios.post(
//     `${process.env.NEXT_PUBLIC_URL}/auth/forgot-password`,
//     {
//       email,
//     }
//   );
//   return res;
// };

// export const verifyOtp = async (otp, token) => {
//   const config = {
//     headers: {
//       'x-reset-token': token
//     },
//   };
//   const res = await axios.post(
//     `${process.env.NEXT_PUBLIC_URL}/auth/verify-otp`,
//     {
//       otp
//     },
//     config
//   );
//   return res;
// };

// export const resetPassword = async (newPassword, token) => {
//   const config = {
//     headers: {
//       'x-reset-token': token
//     },
//   };
//   const res = await axios.post(
//     `${process.env.NEXT_PUBLIC_URL}/auth/reset-password`,
//     {
//       newPassword,
//     },
//     config
//   );
//   return res;
// };

// // Redux Action Creators
// export const loginUserAction = (credentials) => async (dispatch) => {
//   try {
//     dispatch({ type: 'USER_LOGIN_REQUEST' });
    
//     const response = await loginUser(credentials);
    
//     if (response.data) {
//       // Dispatch success with the API response data
//       dispatch({
//         type: 'USER_LOGIN_SUCCESS',
//         payload: {
//           accessToken: response.data.accessToken,
//           refreshToken: response.data.refreshToken,
//           user: response.data.user
//         }
//       });
      
//       return { success: true, data: response.data };
//     }
//   } catch (error) {
//     const errorMessage = error.response?.data?.message || error.message || 'Login failed';
    
//     dispatch({
//       type: 'USER_LOGIN_FAIL',
//       payload: errorMessage
//     });
    
//     return { success: false, error: errorMessage };
//   }
// };

// export const registerUserAction = (userData) => async (dispatch) => {
//   try {
//     dispatch({ type: 'USER_REGISTER_REQUEST' });
    
//     const response = await registerUser(userData);
    
//     if (response.data) {
//       dispatch({
//         type: 'REGISTER_SUCCESS',
//         payload: {
//           accessToken: response.data.accessToken,
//           refreshToken: response.data.refreshToken,
//           user: response.data.user
//         }
//       });
      
//       return { success: true, data: response.data };
//     }
//   } catch (error) {
//     const errorMessage = error.response?.data?.message || error.message || 'Registration failed';
    
//     dispatch({
//       type: 'USER_REGISTER_FAIL',
//       payload: errorMessage
//     });
    
//     return { success: false, error: errorMessage };
//   }
// };

// export const logoutUserAction = () => (dispatch) => {
//   // Clear localStorage
//   if (typeof window !== 'undefined') {
//     localStorage.removeItem('token');
//     localStorage.removeItem('refreshToken');
//   }
  
//   dispatch({
//     type: 'LOGOUT_SUCCESS'
//   });
// };