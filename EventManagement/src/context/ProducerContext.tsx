import { createContext, useState } from "react"
import { Producer } from "../types/Producer"
import {useHttp} from '../custom-hooks/useHttp' 

type ProducerContextType = {
    producers: Producer[],
    refresh:()=>Promise<unknown>
}

export const ProducerContext = createContext<Partial<ProducerContextType>>({})

export const ProducerProvider = (props: any) => {

    const {data: producers = [],loading,error,request} = useHttp<Producer[]>('/producer','get');
    // const [producers, setProducers] = useState<Producer[]>([{
    //     id: "100",
    //     name: "maya",
    //     email:"a@a",
    //     phone:"055555555",
    //     description: "producer maya"
    // }, {
    //     id: "200",
    //     name: "maayan",
    //     email:"B@b",
    //     phone:"022222222",
    //     description: "producer maayan"
    // }]);

    const contextValue: ProducerContextType = {
        producers : producers || [],
        
        async refresh(){
            await request();
        }
    }
    return <ProducerContext.Provider value={contextValue}>
        {props.children}
    </ProducerContext.Provider >;
}