import { useContext } from "react"
import { EventContext } from "../context/EventContext"
import { NavLink } from "react-router";

export const EventListForAUsers = () =>{
    const {events} = useContext(EventContext);

    return <>
        <div>
            <h1>Our Events</h1>
            {events?.map(e => <li key = {e.id}><NavLink to={`EventDetailsForAUser/${e.id}`}> {e.name}</NavLink></li>)}
        </div>
    </>
}