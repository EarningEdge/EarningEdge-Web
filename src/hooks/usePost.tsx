import { useState } from 'react';
import useAxios from './useAxios';
import { AxiosError, AxiosResponse, AxiosRequestConfig } from 'axios';

interface UsePostData<T, R> {
  data: R | null;
  loading: boolean;
  error: AxiosError | null;
  postData: (data: T, config?: AxiosRequestConfig) => Promise<R | null>;
}

const usePostData = <T, R>(endpoint: string): UsePostData<T, R> => {
  const [data, setData] = useState<R | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AxiosError | null>(null);
  const axiosInstance = useAxios();

  const postData = async (postData: T, config?: AxiosRequestConfig): Promise<R | null> => {
    setLoading(true);
    setError(null);
    try {
      const response: AxiosResponse<R> = await axiosInstance.post<R>(endpoint, postData, config);
      setData(response.data);
      return response.data;
    } catch (err) {
      const axiosError = err as AxiosError;
      setError(axiosError);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, postData };
};

export default usePostData;