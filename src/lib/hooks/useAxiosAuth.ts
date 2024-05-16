import { useSession } from "next-auth/react";
import { useEffect } from "react";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BE_URL;
export const axiosAuth = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const useAxiosAuth = () => {
  const { data: session } = useSession();
  useEffect(() => {
    const requestIntercept = axiosAuth.interceptors.request.use(
      (config: any) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${session?.access_token}`;
        }
        return config;
      }
    );
    return () => {
      axiosAuth.interceptors.request.eject(requestIntercept);
    };
  }, [session?.access_token]);
  return axiosAuth;
};

export default useAxiosAuth;
