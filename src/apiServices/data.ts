import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { apiUrl } from './apiUrl';

const accessToken = localStorage.getItem('serviceToken');

// Create an Axios instance with default settings
const apiClient: AxiosInstance = axios.create({
  baseURL: apiUrl, // Replace with your API base URL
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`
    // Add other headers here if needed
  }
});

const formApiClient: AxiosInstance = axios.create({
  baseURL: apiUrl, // Replace with your API base URL
  headers: {
    'Content-Type': 'multipart/form-data',
    Authorization: `Bearer ${accessToken}`
    // Add other headers here if needed
  }
});
// Define common request and response types
export type ApiResponse<T> = AxiosResponse<T>;

//Get General Data
export const getGeneralData = async <T>(config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
  try {
    const response = await apiClient.get<T>('/general-data', config);
    return response;
  } catch (error) {
    // Handle error (e.g., log it, show notification, etc.)
    throw error;
  }
};
export const getAboutMe = async <T>(data: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
  try {
    const response = await apiClient.post<T>('/get-about-me-samples', data, config);
    return response;
  } catch (error) {
    // Handle error (e.g., log it, show notification, etc.)
    throw error;
  }
};
export const getMatchResults = async <T>(userId: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
  try {
    const response = await apiClient.get<T>(`/matchmaking-results?userId=${userId}`, config);
    return response;
  } catch (error) {
    // Handle error (e.g., log it, show notification, etc.)
    throw error;
  }
};
export const getSubscriptionPlan = async <T>(config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
  try {
    const response = await apiClient.get<T>(`/subscriptions`, config);
    return response;
  } catch (error) {
    // Handle error (e.g., log it, show notification, etc.)
    throw error;
  }
};
export const getUserDetails = async <T>(userId: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
  try {
    const response = await apiClient.get<T>(`/user-details?userId=${userId}&profile=true&preference=true`, config);
    return response;
  } catch (error) {
    // Handle error (e.g., log it, show notification, etc.)
    throw error;
  }
};
export const getQuestionDetails = async <T>(config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
  try {
    const response = await apiClient.get<T>(`/questions`, config);
    return response;
  } catch (error) {
    // Handle error (e.g., log it, show notification, etc.)
    throw error;
  }
};
export const sendQuestionAnswers = async <T>(data: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
  try {
    const response = await apiClient.post<T>(`/add-answer`, data, config);
    return response;
  } catch (error) {
    // Handle error (e.g., log it, show notification, etc.)
    throw error;
  }
};
