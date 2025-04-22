import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useHttp } from "../custom-hooks/useHttp";
import { EditableField } from "./EditableField";
import { Event } from "../types/Event";
import { useNavigate } from 'react-router-dom';

export const EventDetailsForProducer = () => {
    const { id } = useParams();
    const { data: events } = useHttp<Event[]>('/event', 'get');
    const [event, setEvent] = useState<Event | undefined>();
    const { request } = useHttp<Event[]>(`event/${event?._id}`, 'put');
    const navigate = useNavigate();

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

    const update = async () => {
        navigate('/ProducerDetails', { replace: true });
    }
    return (
        <div>
            <h1>your choose:</h1>
            {event && (
                <>
                    <EditableField value={event.name} setValue={(val: string) => updateField('name', val)} />
                    <EditableField value={event.description} setValue={(val: string) => updateField('description', val)} />
                    <EditableField value={event.price} setValue={(val: Number) => updateField('price', val)} />
                    <button onClick={update}>Update</button>
                </>
            )}
        </div>
    );
};

