export const setAuthTokens = (access_token, refresh_token, user_id) => {
    localStorage.setItem('access_token', access_token);
    localStorage.setItem('refresh_token', refresh_token);
    localStorage.setItem('user_id', user_id);
  };
  
  export const getAuthTokens = () => {
    return {
      access_token: localStorage.getItem('access_token'),
      refresh_token: localStorage.getItem('refresh_token'),
      user_id: localStorage.getItem('user_id')
    };
  };
  
  export const clearAuthTokens = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user_id');
  };
  
  // api.js - API utility functions
  const BASE_URL = 'http://localhost:8000';
  
  export const fetchWithAuth = async (endpoint, options = {}) => {
    const { access_token } = getAuthTokens();
    
    const defaultHeaders = {
      'Content-Type': 'application/json',
      ...(access_token && { 'Authorization': `Bearer ${access_token}` })
    };
  
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers
      }
    });
  
    // Handle 401 Unauthorized errors (expired token)
    if (response.status === 401) {
      // Here you could implement token refresh logic
      clearAuthTokens();
      window.location.href = '/login';
      throw new Error('Session expired');
    }
  
    return response;
  };
  