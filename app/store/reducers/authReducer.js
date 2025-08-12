"use client";

import jwt_decode from 'jwt-decode'

const authState = {
  userInfo: {},
  token: null
}

const tokenDecode = (token) => {
  const tokenDecoded = jwt_decode(token)

  const expTime = new Date(tokenDecoded.exp * 1000)
  if (new Date() > expTime) {
    return null
  }
  return tokenDecoded
}


const isClient = typeof window !== 'undefined';

if (isClient) {
  const getToken = localStorage.getItem('token')

  if (getToken) {
    const getInfo = tokenDecode(getToken)
    if (getInfo) {
      authState.token = getToken
      authState.userInfo = getInfo
    }
  }
  
}


export const authReducer = (state = authState, action) => {
  const { payload, type } = action

  switch (type) {
    case 'USER_LOGIN_SUCCESS':
      const userInfo = tokenDecode(payload.token)
      return {
        ...state,
        userInfo: { ...userInfo, ...payload.userInfo },
        token: payload.token,
      }

    case 'REGISTER_SUCCESS':
      const userInfos = tokenDecode(payload.token)
      return {
        ...state,
        userInfo: { ...userInfos, ...payload.userInfo },
        token: payload.token,
      }
    case 'KYC_SUBMIT_SUCCESS':
      const kycUserInfo = tokenDecode(payload.token)
      return {
        ...state,
        userInfo: { ...kycUserInfo, ...payload.userInfo },
        token: payload.token,
      }
    case 'LOGOUT_SUCCESS':
      return {
        ...state,
        authenticate: false,
        userInfo: '',
        token: '',
        message: 'Logout Successful',
      }
    default:
      return state
  }
}



// "use client";

// import jwt_decode from 'jwt-decode'

// const authState = {
//   userInfo: {},
//   token: null,
//   refreshToken: null,
//   loading: false,
//   error: null,
//   isAuthenticated: false
// }

// const tokenDecode = (token) => {
//   try {
//     const tokenDecoded = jwt_decode(token)
//     const expTime = new Date(tokenDecoded.exp * 1000)
//     if (new Date() > expTime) {
//       return null
//     }
//     return tokenDecoded
//   } catch (error) {
//     console.error('Token decode error:', error)
//     return null
//   }
// }

// const isClient = typeof window !== 'undefined';

// // Initialize state from localStorage
// if (isClient) {
//   const getToken = localStorage.getItem('token')
//   const getRefreshToken = localStorage.getItem('refreshToken')

//   if (getToken) {
//     const getInfo = tokenDecode(getToken)
//     if (getInfo) {
//       authState.token = getToken
//       authState.refreshToken = getRefreshToken
//       authState.userInfo = getInfo.user || getInfo
//       authState.isAuthenticated = true
//     } else {
//       // Token expired, clean up
//       localStorage.removeItem('token')
//       localStorage.removeItem('refreshToken')
//     }
//   }
// }

// export const authReducer = (state = authState, action) => {
//   const { payload, type } = action

//   switch (type) {
//     case 'USER_LOGIN_REQUEST':
//     case 'USER_REGISTER_REQUEST':
//       return {
//         ...state,
//         loading: true,
//         error: null
//       }

//     case 'USER_LOGIN_SUCCESS':
//       const loginToken = payload.accessToken
//       const loginUser = payload.user
      
//       if (!loginToken) {
//         console.error('No accessToken in login response')
//         return {
//           ...state,
//           loading: false,
//           error: 'No access token received'
//         }
//       }

//       // Store tokens in localStorage
//       if (isClient) {
//         localStorage.setItem('token', loginToken)
//         if (payload.refreshToken) {
//           localStorage.setItem('refreshToken', payload.refreshToken)
//         }
//       }

//       const loginDecodedToken = tokenDecode(loginToken)
      
//       return {
//         ...state,
//         loading: false,
//         error: null,
//         isAuthenticated: true,
//         userInfo: {
//           // Merge decoded token data with API response user data
//           ...(loginDecodedToken?.user || {}),
//           ...loginUser,
//           // Ensure consistent field mapping
//           id: loginUser?.id,
//           email: loginUser?.email,
//           name: loginUser?.fname && loginUser?.lname ? 
//             `${loginUser.fname} ${loginUser.lname}` : loginUser?.name,
//           firstName: loginUser?.fname,
//           lastName: loginUser?.lname,
//           subscribed: loginUser?.subscribed,
//           role: loginUser?.role,
//           currency: loginUser?.currency
//         },
//         token: loginToken,
//         refreshToken: payload.refreshToken || state.refreshToken,
//       }

//     case 'REGISTER_SUCCESS':
//       const regToken = payload.accessToken
//       const regUser = payload.user
      
//       if (isClient && regToken) {
//         localStorage.setItem('token', regToken)
//         if (payload.refreshToken) {
//           localStorage.setItem('refreshToken', payload.refreshToken)
//         }
//       }

//       const regDecodedToken = tokenDecode(regToken)
      
//       return {
//         ...state,
//         loading: false,
//         error: null,
//         isAuthenticated: true,
//         userInfo: {
//           ...(regDecodedToken?.user || {}),
//           ...regUser,
//           id: regUser?.id,
//           email: regUser?.email,
//           name: regUser?.fname && regUser?.lname ? 
//             `${regUser.fname} ${regUser.lname}` : regUser?.name,
//           firstName: regUser?.fname,
//           lastName: regUser?.lname,
//           subscribed: regUser?.subscribed,
//           role: regUser?.role,
//           currency: regUser?.currency
//         },
//         token: regToken,
//         refreshToken: payload.refreshToken || state.refreshToken,
//       }

//     case 'USER_LOGIN_FAIL':
//     case 'USER_REGISTER_FAIL':
//       return {
//         ...state,
//         loading: false,
//         error: payload,
//         isAuthenticated: false,
//         token: null,
//         refreshToken: null,
//         userInfo: {}
//       }

//     case 'LOGOUT_SUCCESS':
//       if (isClient) {
//         localStorage.removeItem('token')
//         localStorage.removeItem('refreshToken')
//       }
//       return {
//         ...state,
//         isAuthenticated: false,
//         userInfo: {},
//         token: null,
//         refreshToken: null,
//         error: null,
//         loading: false,
//         message: 'Logout Successful',
//       }

//     case 'CLEAR_ERROR':
//       return {
//         ...state,
//         error: null
//       }

//     default:
//       return state
//   }
// }