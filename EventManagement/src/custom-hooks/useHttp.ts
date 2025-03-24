import { useCallback, useEffect, useState } from "react";
import Axios from "axios";

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
        try {
            const result = await axiosInstance[method]<T>(url, ...params);
            setData(result.data);
        } catch (error) {
            console.error(error);
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
