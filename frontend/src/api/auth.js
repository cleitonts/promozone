import httpClient from './httpClient';

export const login = async (credentials) => {
  return await httpClient.post('/login', { credentials });
};

export const register = (data) => {
  return httpClient.post('/auth/register', data);
};

export const logout = () => {
  return httpClient.post('/auth/logout');
};
