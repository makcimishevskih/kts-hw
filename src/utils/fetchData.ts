import axios, { isAxiosError, AxiosResponse } from 'axios';
import { API_BASE_URL, config } from 'config/api';

export type Response<T> =
  | {
      isError: false;
      data: T;
    }
  | {
      isError: true;
      data: null;
    };

export async function getData<T, K>(url: string, normalize: (data: T) => K): Promise<Response<K>> {
  try {
    const { data }: AxiosResponse<T> = await axios.get(API_BASE_URL + url, config);
    return { isError: false, data: normalize(data) };
  } catch (error) {
    if (isAxiosError(error)) {
      return { isError: true, data: null };
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
}
