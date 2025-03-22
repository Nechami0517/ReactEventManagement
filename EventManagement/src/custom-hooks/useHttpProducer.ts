import { useCallback, useEffect, useState } from "react";
import Axios from "axios";

const ProducerInstance = Axios.create({
    baseURL: "http://localhost:27017",
})
type HttpMethod = 'get' | 'post' | 'put' | 'delete';

export const useHttpProducer = <T>(url: string, method: HttpMethod) => {
    
    const [data,setData] = useState<T | null>(null);
    const [loading,setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>('');
    const request = useCallback(async (...params: any[]) => {
        try
        {
            setLoading(true);
            setError('');
            const result = await ProducerInstance[method]<T>(url,...params);
            setLoading(false);
            setData(result.data);
        }
        catch(error)
        {
            console.log(error+"/////////////////////////");

            setLoading(false);
            setError("error while fetching data producer")

        }

    },[])
    useEffect(() => {
        if(method === 'get')
        {
            request();
        }
    },[])
    return {data,loading,error,request}
}