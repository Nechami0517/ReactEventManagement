import { createContext, useState } from "react"
import { Event } from "../types/Event"


type EventContextType = {
    events : Event[],
    //updateEvent : (id:string,newEvent:Event) => void,
   // refresh : () => Promise<unknown>
}

export const EventContext = createContext<Partial<EventContextType>>({});

export const EventProvider = (props : any) => {
    const [ events ,SetEvents] = useState<Event[]>([{
        name: "dancing",
        id: 1,
        producer: {
            name: "Nechami",
            id: 215310517,
            phone: "0583212449",
            email: "Nechami0517@gmail.com"
        },
        price: 2500,
        hours: 1
    },{
        name: "movie: We stayed last",
        id:2,
        producer: {
            name: "Pnina Paksher",
            id: 2558974556,
            phone: "0532145879",
            email: "Pnina@gmail.com"
        },
        price: 10000,
        hours: 2.25
    }]);

    const contextValue: EventContextType = {
        events,
        // updateEvent: (id: string, newEvent: Event): void {
        //     const newEvent = events!.map(e => e.id === ? newEvent : e);
        // },
        // refresh: function (): Promise<unknown> {
        //     throw new Error("Function not implemented.");
        // }
    }

    return <EventContext.Provider value={contextValue}>
        {props.children}
    </EventContext.Provider>

}