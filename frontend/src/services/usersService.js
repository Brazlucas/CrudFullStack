import axios from "axios";

const API_URL = "http://localhost:8800";

export const getUsers = async () => {
  try {
    const res = await axios.get(API_URL);
    return res.data.sort((a, b) => (a.nome > b.nome ? 1 : -1));
  } catch (error) {
    throw error;
  }
};

export const createUser = (user) => {
  return axios.post(API_URL, user);
};

export const updateUser = (user, id) => {
  return axios.put(`${API_URL}/${id}`, user);
};

export const deleteUser = async (id) => {
  return await axios.delete(`${API_URL}/${id}`);
};