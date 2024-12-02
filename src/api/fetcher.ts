import axios from "axios";
import { isLoggedin, getToken, redirectToLogin } from "../utils/authGuard";

const apiClient = axios.create({
  // Can set any default configurations here, such as base URL, headers, etc.
  baseURL: "https://aryabhat.ai/",
});

apiClient.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response) {
      switch (error.response.status) {
        case 322:
          console.error("Bad request", error);
          break;
        case 400:
          console.error("Bad request");
          break;
        case 401:
          console.error("Unauthorized");
          localStorage.removeItem("auth");
          redirectToLogin();
          break;
        case 403:
          console.error("Forbidden");
          break;
        case 404:
          console.error(error.response);
          break;
        case 500:
          console.error("Internal server error");
          break;
        default:
          console.error("Unknown error");
      }
    } else if (error.request) {
      console.error("No response");
    } else {
      console.error("Request error");
    }
    return Promise.reject(error.response);
  }
);

// Fetcher object with all methods
const fetcher = {
  get: async function (endpoint: string, params = null) {
    const headers = { Authorization: "" };
    if (isLoggedin()) {
      headers.Authorization = "Bearer " + localStorage.getItem("auth");
    }
    const response = await apiClient.get(endpoint, { params, headers });
    return response.data;
  },
  post: async function (endpoint: string, data: any) {
    const headers = { Authorization: "" };
    if (isLoggedin()) {
      headers.Authorization = "Bearer " + localStorage.getItem("auth");
    }
    const response = await apiClient.post(endpoint, data, { headers });
    return response.data;
  },
  patch: async function (endpoint: string, data = null) {
    const response = await apiClient.patch(endpoint, data);
    return response.data;
  },
  delete: async function (endpoint: string) {
    const response = await apiClient.delete(endpoint);
    return response.data;
  },
  put: async function (endpoint: string, data = null) {
    const headers = { Authorization: "" };
    if (isLoggedin()) {
      headers.Authorization = "Bearer " + localStorage.getItem("auth");
    }
    const response = await apiClient.put(endpoint, data, { headers });
    return response.data;
  },
  postFile: async function (endpoint: string, formData: FormData) {
    const headers = {
      "Content-Type": "multipart/form-data",
      Authorization: "",
    };
    if (isLoggedin()) {
      headers.Authorization = "Bearer " + localStorage.getItem("auth");
    }
    const response = await apiClient.post(endpoint, formData, { headers });
    return response.data;
  },
};
export default fetcher;
