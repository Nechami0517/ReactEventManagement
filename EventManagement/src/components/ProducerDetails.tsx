import { useState } from "react";
import { Producer } from "../types/Producer";
import { Event } from "../types/Event";
import { useHttp } from "../custom-hooks/useHttp";
import { NavLink } from "react-router";
import { EditableField } from "./EditableField";

export const ProducerDetails = () => {
    const { data: producers } = useHttp<Producer[]>('/producer', 'get');
    const [producer, setProducer] = useState<Producer | undefined>();
    const { request } = useHttp<Producer[]>(`producer/${producer?.email}`, `put`);
    const { request: deleteEventRequest } = useHttp<Event>(`event`, `delete`);

    const { data: events } = useHttp<Event[]>('/event', 'get');
    const [eventsProducer, setEventsProducer] = useState<Event[] | undefined>();

    const findProducerAndEvents = (e: any) => {
        const selectedProducer = producers?.find(p => p.email === e.target.email.value);
        setProducer(selectedProducer);

        if (selectedProducer && events) {
            const filteredEvents = events.filter(event => event.emailProducer === selectedProducer.email);
            setEventsProducer(filteredEvents);
        } else {
            setEventsProducer(undefined);
        }

        console.log("---------------------------------");
    }

    const updateField = async (field: keyof Producer, value: any) => {
        if (producer) {
            const updatedProducer = { ...producer, [field]: value };
            try {
                await request(updatedProducer);
                setProducer(updatedProducer);
            } catch (error) {
                console.error("Error updating producer:", error);
            }
        }
    }

    const deleteEvent = async (eventId: string) => {
        try {
            await deleteEventRequest(`${eventId}`);
            setEventsProducer((prevEvents) => prevEvents?.filter(event => event._id !== eventId));
        } catch (error) {
            console.error("Error deleting event:", error);
        }
    }
    return (
        <>
            {!producer && (
                <form onSubmit={findProducerAndEvents}>
                    <label htmlFor="">email</label><br /><br />
                    <input type="email" name="email" /><br /><br /><br /><br /><br />
                    <button type="submit">check</button>
                </form>
            )}
            {producer && (
                <>
                    <EditableField value={producer.name} setValue={(val: string) => updateField('name', val)} />
                    <EditableField value={producer.email} setValue={(val: string) => updateField('email', val)} />
                    <EditableField value={producer.phone} setValue={(val: string) => updateField('phone', val)} />
                    <EditableField value={producer.description} setValue={(val: string) => updateField('description', val)} />
                    <NavLink to={`AddAnEvent/${producer.email}`}>add event</NavLink>
                    {eventsProducer?.map(event => (
                        <div key={event._id}> {/* ודא ש-event._id הוא ייחודי */}
                            <li>
                                <NavLink to={`EventDetailsForProducer/${event._id}`}>
                                    {event.name}
                                </NavLink>
                            </li>
                            <button onClick={() => deleteEvent(event._id)}>מחק אירוע</button>
                        </div>
                    ))}
                </>
            )}
        </>
    );
}
