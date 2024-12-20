import axios from "axios";
import { isLoggedin } from "../utils/authGuard";

const apiClient = axios.create({
  // Can set any default configurations here, such as base URL, headers, etc.
  // baseURL: "https://aryabhat.ai/",
  baseURL: "https://20.40.41.252/",
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
          console.log(error.response.data.detail);
          window.location.reload();
          break;
        case 403:
          console.error("Forbidden", error.response.status);
          break;
        case 404:
          console.error(error.response.data.detail);
          break;
        case 500:
          console.error("Internal server error");
          break;
        default:
          console.error("Unknown error");
      }
    } else if (error.request) {
      console.error("No response");
      // localStorage.removeItem("auth");
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
    return response;
  },
  post: async function (endpoint: string, data: any) {
    const headers = { Authorization: "" };
    if (isLoggedin()) {
      headers.Authorization = "Bearer " + localStorage.getItem("auth");
    }
    const response = await apiClient.post(endpoint, data, { headers });
    return response;
  },
  patch: async function (endpoint: string, data = null) {
    const headers = { Authorization: "" };
    if (isLoggedin()) {
      headers.Authorization = "Bearer " + localStorage.getItem("auth");
    }
    const response = await apiClient.patch(endpoint, data);
    return response;
  },
  delete: async function (endpoint: string) {
    const headers = { Authorization: "" };
    if (isLoggedin()) {
      headers.Authorization = "Bearer " + localStorage.getItem("auth");
    }
    const response = await apiClient.delete(endpoint, { headers });
    return response;
  },
  put: async function (endpoint: string, data: any) {
    const headers = { Authorization: "" };
    if (isLoggedin()) {
      headers.Authorization = "Bearer " + localStorage.getItem("auth");
    }
    const response = await apiClient.put(endpoint, data, { headers });
    return response;
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
    return response;
  },
  putFile: async function (endpoint: string, formData: FormData) {
    const headers = {
      "Content-Type": "multipart/form-data",
      Authorization: "",
    };
    if (isLoggedin()) {
      headers.Authorization = "Bearer " + localStorage.getItem("auth");
    }
    const response = await apiClient.put(endpoint, formData, { headers });
    return response;
  },
};
export default fetcher;
