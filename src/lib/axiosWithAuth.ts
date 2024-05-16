import axios, { AxiosInstance } from "axios";

export const axiosWithAuth = (
  token?: string,
  formData = false
): AxiosInstance => {
  if (!token) {
    throw new Error("No token");
  }
  const headers: Record<string, string> = {
    "Content-Type":
      formData === false ? "application/json" : "multipart/form-data",
  };

  // If token is provided, add Authorization header
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return axios.create({
    headers: headers,
  });
};
