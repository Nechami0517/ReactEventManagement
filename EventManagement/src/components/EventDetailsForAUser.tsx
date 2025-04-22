import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router"
import { EventContext } from "../context/EventContext";
import { Event } from "../types/Event";
import { Producer } from "../types/Producer";
import { useHttp } from "../custom-hooks/useHttp";
export const EventDetailsForAUser = () => {
    console.log("event");

    const { id } = useParams();
    const { events } = useContext(EventContext);
    const [event, setEvent] = useState<Event | undefined>();

    const { data: producers } = useHttp<Producer[]>('/producer', 'get');
    const [producer, setProducer] = useState<Producer | undefined>();
    useEffect(() => {
        const currentEvent = events?.find(e => e._id == id);
        setEvent(currentEvent);
        const currentProducer = producers?.find(p => p._id == currentEvent?._id);
        setProducer(currentProducer);
        setEvent(currentEvent);
    }, [id])


    return <div>
        <h1>your choose:</h1>
        <h2>{event?.name}</h2>
        <h3>{event?.description}</h3>
        <h3>{event?.price}</h3>
        <h3>{producer?.name}</h3>
    </div>
}