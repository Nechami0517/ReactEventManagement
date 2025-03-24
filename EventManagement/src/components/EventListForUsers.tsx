import { useContext, useState } from "react"
import { EventContext } from "../context/EventContext";
import { NavLink } from "react-router";

export const EventListForUsers = () => {
    const { events } = useContext(EventContext);
    const [eventToDisplay, setEventToDisplay] = useState(events)
    const filterEvent = (e: any) => {
        setEventToDisplay(events?.filter(e1 => e1.name.includes(e.target.value)))
    }
    return <>
        <h1>Our Events</h1>
        <input type="text" onChange={filterEvent} />
        <div>
            {eventToDisplay?.map(event =>
                <li key={Number(event._id)}><NavLink to={`EventDetailsForAUser/${event._id}`}>
                    {event.name}</NavLink></li>)}
        </div>
    </>
}