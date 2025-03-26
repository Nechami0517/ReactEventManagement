import { useCallback, useEffect, useState } from "react";
import Axios, { AxiosError } from "axios";

const axiosInstance = Axios.create({
    baseURL: "http://localhost:27017",
});

type HttpMethod = 'get' | 'post' | `put` | 'delete';

export const useHttp = <T>(url: string, method: HttpMethod) => {

    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const request = useCallback(async (...params: any[]) => {
        setLoading(true);
        setError(null);
        if (method === 'delete')
            url += `/${params[0]}`;
        try {
            const result = await axiosInstance[method]<T>(url, ...params);
            setData(result.data);
        } catch (error) {
            if (method === 'post')
                if (error instanceof AxiosError) {
                    return error.response?.data || "Unknown error";
                } else {
                   return "An unexpected error occurred";
                }
            setError("Error while fetching data");
        } finally {
            setLoading(false);
        }
    }, [url, method]);

    useEffect(() => {
        if (method === 'get') {
            request();
        }
    }, [request, method]);

    return { data, loading, error, request };
}
