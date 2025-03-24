import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { apiUrl } from './apiUrl';

const token = localStorage.getItem('token');

// Create an Axios instance with default settings
const apiClient: AxiosInstance = axios.create({
  baseURL: apiUrl, // Replace with your API base URL
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
    // Add other headers here if needed
  }
});

const formApiClient: AxiosInstance = axios.create({
  baseURL: apiUrl, // Replace with your API base URL
  headers: {
    'Content-Type': 'multipart/form-data',
    Authorization: `Bearer ${token}`
    // Add other headers here if needed
  }
});
// Define common request and response types
export type ApiResponse<T> = AxiosResponse<T>;

// Upload Biodata
export const uploadBiodata = async <T>(data: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
  try {
    const response = await formApiClient.post<T>('/upload-biodata', data, config);
    return response;
  } catch (error) {
    // Handle error (e.g., log it, show notification, etc.)
    throw error;
  }
};

// Upload Biodata
export const profileDetails = async <T>(data: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
  try {
    const response = await apiClient.post<T>('/profile-details', data, config);
    return response;
  } catch (error) {
    // Handle error (e.g., log it, show notification, etc.)
    throw error;
  }
};

// Upload Photo
export const uploadPhoto = async <T>(data: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
  try {
    const response = await formApiClient.post<T>('/profile/upload-photos', data, config);
    return response;
  } catch (error) {
    // Handle error (e.g., log it, show notification, etc.)
    throw error;
  }
};
