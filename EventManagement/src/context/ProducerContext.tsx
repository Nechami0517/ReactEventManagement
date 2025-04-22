import { createContext, useState } from "react"
import { Producer } from "../types/Producer"
import { Event } from "../types/Event"
//import { useHttp } from '../custom-hooks/useHttp'

type ProducerContextType = {
    currentProducer: Producer | undefined,
    currentEvents: Event[] | undefined
    setCurrentProducer: (p: Producer | undefined, e: Event[] | undefined) => void |never
}

export const ProducerContext = createContext<Partial<ProducerContextType>>({})

export const ProducerProvider = (props: any) => {

    const [prod, setProd] = useState<Producer | undefined>();
    const [events, setEvents] = useState<Event[] | undefined>();

    const contextValue: ProducerContextType = {
        currentProducer: prod || undefined,
        currentEvents: events,
        setCurrentProducer(p: Producer | undefined, e: Event[] | undefined) {
            setProd(p);
            setEvents(e);
            console.log("111111111111111111111111")
        },
    }
    return <ProducerContext.Provider value={contextValue}>
        {props.children}
    </ProducerContext.Provider >;
}