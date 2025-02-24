import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/";

export const getClients = async () => {
  const response = await axios.get(`${API_URL}clients/`);
  return response.data;
};

export const createClient = async (data) => {
  const response = await axios.post(`${API_URL}clients/`, data);
  return response.data;
};

export const getRequests = async (page = 1) => {
  const response = await axios.get(`${API_URL}requests/?page=${page}`);
  return response.data;
};

export const createRequest = async (data) => {
  const response = await axios.post(`${API_URL}requests/`, data);
  return response.data;
};
