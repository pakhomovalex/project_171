import axios, { AxiosError } from 'axios';
import 'dotenv/config';
import { authService } from '../services/authService';
import { accessTokenService } from '../services/accessTokenService';

export const authClient = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/auth`,
  withCredentials: true,
});

authClient.interceptors.response.use(
  res => res.data,
);


export const httpClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL as string,
  withCredentials: true,
});



// add `Authorization` header to all requests
// httpClient.interceptors.request.use(request => {
//   const accessToken = localStorage.getItem('accessToken');

//   if (accessToken) {
//     request.headers.Authorization = `Bearer ${accessToken}`;
//   }

//   return request;
// });

httpClient.interceptors.response.use(
  res => res.data,

  // retry request after refreshing access token
  async (error: AxiosError) => {
    if (error.response?.status !== 401) {
      throw error;
    }

    const originalRequest = error.config;
    const { accessToken } = await authService.refresh();

    accessTokenService.save(accessToken);

    return httpClient.request(originalRequest!);
  },
);