// Frontend/src/services/authService.js
import API from './api';




export const login = async (username, password) => {
  try {
    const response = await API.post('users/auth/login/', { username, password });
    console.log("Login response:", response.data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const register = async (userData) => {
  try {
    await getCSRFToken(); // Ensure CSRF token is set before making the request
    console.log("Registering user with data:", userData);
    const response = await API.post('users/auth/register/', userData);
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const passwordResetRequest = async(email)=>{
  try{
    await getCSRFToken();
    const response = await API.post('users/auth/password/reset/',{email});
    console.log("password response:",response.data);
    return response.data;
  } catch(error){
    throw error.response?.data || error.message;
  }
};

export const passwordResetConfirm = async (uidb64, token, password) => {
  try {
    await getCSRFToken();
    const response = await API.post(`users/auth/password/reset/confirm/${uidb64}/${token}/`, { password });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const verifyEmail = async (uidb64, token) => {
  try {
    const response = await API.get(`users/auth/activate/${uidb64}/${token}/`);
    // After successful verification, get the user data and return them
    
    return response.data;
  } catch (error) {
    const errorDetail = error.response?.data?.detail || 
                       error.response?.data?.message || 
                       'Activation failed';
    throw new Error(errorDetail);
  }
};


export const logout = async () => {
  try {
    const response = await API.post('users/auth/logout/');
      // Clear tokens from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await API.get('users/me/');
    console.log('userdata from authservice.js ',response.data);
    return response.data;
  } catch (error) {
    return null;
  }
};


// Frontend/src/services/authService.js
export const getCSRFToken = async () => {
  const response = await API.get('users/csrf/');
  API.defaults.headers.common['X-CSRFToken'] = response.data.csrfToken;
  console.log("CSRF Token:", response.data.csrfToken);
  return response.data.csrfToken;
};