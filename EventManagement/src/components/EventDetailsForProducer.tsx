import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useHttp } from "../custom-hooks/useHttp";
import { EditableField } from "./EditableField";
import { Event } from "../types/Event";

export const EventDetailsForProducer = () => {
    const { id } = useParams();
    const { data: events } = useHttp<Event[]>('/event', 'get');
    const [event, setEvent] = useState<Event | undefined>();
    const { request } = useHttp<Event[]>(`event/${event?._id}`, 'put');

    useEffect(() => {
        const currentEvent = events?.find(e => e._id === id);
        setEvent(currentEvent);
    }, [events, id]);


    
    const updateField = async (field: keyof Event, value: any) => {
        if (event) {
            const updatedEvent = { ...event, [field]: value };
            try {
                await request(updatedEvent);
                setEvent(updatedEvent);
            } catch (error) {
                console.error("Error updating producer:", error);
            }
        }
    };

    return (
        <div>
            <h1>your choose:</h1>
            {event && (
                <>
                    <EditableField value={event.name} setValue={(val: string) => updateField('name', val)} />
                    <EditableField value={event.description} setValue={(val: string) => updateField('description', val)} />
                    <EditableField value={event.price} setValue={(val: string) => updateField('price', val)} />
                </>
            )}
        </div>
    );
};
