// api/auth.ts
import axios from 'axios';

const API_URL = 'https://phoenixlabs-server.onrender.com/api';

export const loginUser = async (credentials: { email: string; password: string }) => {
  const response = await axios.post(`${API_URL}/auth/login`, credentials);
  return response.data;
};

export const registerUser = async (userData: {
  fullName: string;
  email: string;
  password: string;
}) => {
  const response = await axios.post(`${API_URL}/auth/register`, userData);
  return response.data;
};

export const getDashboardData = async (token: string) => {
  const response = await axios.get(`${API_URL}/dashboard`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getShipments = async (token: string) => {
  const response = await axios.get(`${API_URL}/shipments`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};