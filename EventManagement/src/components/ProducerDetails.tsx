import { useContext, useEffect, useState } from "react";
import { Producer } from "../types/Producer";
import { Event } from "../types/Event";
import { useHttp } from "../custom-hooks/useHttp";
import { NavLink } from "react-router";
import { EditableField } from "./EditableField";
// import "../styles/ProducerDetails.css";
import { ProducerContext } from "../context/ProducerContext";

export const ProducerDetails = () => {

    const { data: producers } = useHttp<Producer[]>('/producer', 'get');

    const { currentProducer, currentEvents, setCurrentProducer } = useContext(ProducerContext)
    //const [producer, setProducer] = useState<Producer | undefined>(currentProducer);
    const { data: initialEvents } = useHttp<Event[] | undefined>('/event', 'get');
    const [events, setEvents] =  useState<Event[] | undefined>(initialEvents ?? undefined);
    
    //  const [eventsProducer, setEventsProducer] = useState<Event[] | undefined>();

    const { request } = useHttp<Producer[]>(`producer/${currentProducer?.email}`, `put`);
    const { request: deleteEventRequest } = useHttp<Event>(`event`, `delete`);

    useEffect(() => {
        if (initialEvents) {
            setEvents(initialEvents);
        }
    }, [initialEvents]);


    const findProducerAndEvents = (e: any) => {

        const selectedProducer = producers?.find(p => p.email === e.target.email.value);
        if (selectedProducer) {
            if (selectedProducer && events) {
                const filteredEvents = events.filter(event => event.emailProducer === selectedProducer.email);
                if (setCurrentProducer)
                    setCurrentProducer(selectedProducer, filteredEvents);

            }
        }

    }



    const updateEvents = () => {
        if (events && currentProducer) {
            const filteredEvents = events.filter(event => event.emailProducer === currentProducer.email);
            // בדוק אם filteredEvents שונה מהערך הנוכחי של currentEvents
            if (JSON.stringify(filteredEvents) !== JSON.stringify(currentEvents)) {
                if (setCurrentProducer) {
                    setCurrentProducer(currentProducer, filteredEvents);
                }
            }
        }
    };
    useEffect(() => {

        updateEvents();
    }, [currentProducer, events, currentEvents, setCurrentProducer]);


    const updateField = async (field: keyof Producer, value: any) => {
        if (currentProducer) {
            const updatedProducer = { ...currentProducer, [field]: value };
            try {
                await request(updatedProducer);
                if (setCurrentProducer) {
                    setCurrentProducer(updatedProducer, currentEvents);
                }
            } catch (error) {
                console.error("Error updating producer:", error);
            }
        }
    }

    const deleteEvent = async (eventId: string) => {
        try {
            await deleteEventRequest(`${eventId}`);
            setEvents(prevEvents => prevEvents?.filter(event => event._id !== eventId)); // עדכון ה-state של האירועים
           
            const newEvents = currentEvents?.filter(event => event._id !== eventId);
            if (currentProducer) {
                if (setCurrentProducer) {
                    setCurrentProducer(currentProducer, newEvents); // עדכון ה-state
                    updateEvents(); // קריאה ל-updateEvents כאן
                }
            }
        } catch (error) {
            console.error("Error deleting event:", error);
        }
    }
    
    const exit = () => {
        if (setCurrentProducer)
            setCurrentProducer(undefined, undefined);
    }

    return (
        <>
            <h1>Producer Details</h1>
            {!currentProducer && (
                <form onSubmit={findProducerAndEvents}>
                    <label htmlFor="">email</label><br /><br />
                    <input type="email" name="email" /><br /><br /><br /><br /><br />
                    <button type="submit">check</button>
                </form>
            )}
            {currentProducer && (
                <>
                    <EditableField value={currentProducer.name} setValue={(val: string) => updateField('name', val)} />
                    <EditableField value={currentProducer.email} setValue={(val: string) => updateField('email', val)} />
                    <EditableField value={currentProducer.phone} setValue={(val: string) => updateField('phone', val)} />
                    <EditableField value={currentProducer.description} setValue={(val: string) => updateField('description', val)} />
                    <NavLink to={`AddAnEvent/${currentProducer.email}`}>add event</NavLink>
                    {currentEvents?.map(event => (
                        <div key={event._id}> {/* ודא ש-event._id הוא ייחודי */}
                            <li>
                                <NavLink to={`EventDetailsForProducer/${event._id}`}>
                                    {event.name}
                                </NavLink>
                            </li>
                            <button onClick={() => deleteEvent(event._id)}>מחק אירוע</button>
                        </div>
                    ))}
                    <button onClick={exit}>exit</button>
                </>
            )}
        </>
    );
}
