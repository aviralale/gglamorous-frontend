import axios from "axios";
import { apiURL, apiAuthURL } from "@/utils/apiUrl";

interface UserRegistrationData {
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  password: string;
}

interface UserRegistrationResponse {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  [key: string]: any;
}

export const registerUser = async (
  data: UserRegistrationData
): Promise<UserRegistrationResponse> => {
  try {
    const response = await axios.post<UserRegistrationResponse>(
      `${apiAuthURL}users/`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw error.response.data;
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

export const loginUser = async (data: { email: string; password: string }) => {
  try {
    const response = await axios.post(`${apiAuthURL}jwt/create/`, data);
    if (response.data.access) {
      localStorage.setItem("token", response.data.access);
      return true;
    }
  } catch (error: any) {
    throw error.response ? error.response.data : { detail: error.detail };
  }
  return false;
};

export const logout = (callback?: () => void) => {
  localStorage.removeItem("token");
  if (callback) {
    callback();
  }
};

export const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  return token !== null;
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const axiosInstance = axios.create({
  baseURL: apiURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${getToken()}`,
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const myUserData = async () => {
  try {
    const response = await axiosInstance.get(`auth/users/me/`);
    return response.data;
  } catch (error: any) {
    throw error;
  }
};
