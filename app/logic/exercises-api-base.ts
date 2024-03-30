import axios, {AxiosResponse} from 'axios';

// const BASE_URL = 'https://api.api-ninjas.com/v1/exercises?muscle=';
// const API_KEY = 'cS7oy2HxYq2froailrAaaQ==CFsgINyKSQHRRqtb'; // Your API key

import {NINJA_API_KEY, NINJA_API_URL} from '@env';

// For GET request
export async function getRequest(endpoint: string): Promise<any> {
  const url = `${NINJA_API_URL}${endpoint}`;
  try {
    const response: AxiosResponse = await axios.get(url, {
      headers: {
        'X-Api-Key': NINJA_API_KEY,
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(`An error occurred during GET request: ${error.message}`);
  }
}

// For POST request
export async function postRequest(endpoint: string, data: any): Promise<any> {
  const url = `${NINJA_API_URL}${endpoint}`;
  try {
    const response: AxiosResponse = await axios.post(url, data, {
      headers: {
        'X-Api-Key': NINJA_API_KEY,
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(`An error occurred during POST request: ${error.message}`);
  }
}
