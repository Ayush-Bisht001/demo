import { API_ENDPOINTS } from "../constants/api";
import apiClient from "./apiClient";

export const authService = {
  login: (payload) => apiClient.post(API_ENDPOINTS.AUTH.LOGIN, payload),
  register: (payload) => apiClient.post(API_ENDPOINTS.AUTH.REGISTER, payload),
  me: () => apiClient.get(API_ENDPOINTS.AUTH.ME),
};
