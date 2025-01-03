import httpClient from './httpClient';

export const getUsers = (limit = null, page = null, email = null) => {
  return httpClient.get(`/users/`, {params: {limit, page, email}});
};

export const getUserById = (id) => {
  return httpClient.get(`/user/${id}`);
};

export const updateUser = (id, data) => {
  return httpClient.put(`/user/${id}`, data);
};

export const createUser = (email)  => {
  return httpClient.post('/user/', {email});
};
