import { createContext, useEffect, useState } from "react"
import { Event } from "../types/Event"
import { useHttp } from "../custom-hooks/useHttp"



type EventsContextType = {
    events: Event[]
    refresh: () => Promise<unknown>
}

export const EventContext = createContext<Partial<EventsContextType>>({})

export const EventProvider = (props: any) => {

    const { data: events = [], error, loading, request } = useHttp<Event[]>('/event', 'get');


    useEffect(() => {
        console.log("Events:", events); // לוג של הנתונים
        console.log("Error:", error); // לוג של השגיאות
    }, [events, error]);
    
    const contextValue: EventsContextType = {
        events: events!,
        async refresh() {
            await request();
        }
    }

    return <EventContext.Provider value={contextValue}>
        {props.children}
    </EventContext.Provider >;
}