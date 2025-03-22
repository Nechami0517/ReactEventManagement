import { useContext, useState } from "react"
import { ProducerContext } from "../context/ProducerContext"
import { Producer } from "../types/Producer";
import { useHttp } from "../custom-hooks/useHttp";
import { NavLink } from "react-router";


export const ProducerDetails = () => {

    //chang http----------
    //const { producers } = useContext(ProducerContext);
    
   const {data:producers} =useHttp<Producer[]>('/producer','get');
    const [producer, setProducer] = useState<Producer | undefined>();

    const findProducer = (e: any) => {
        setProducer(producers?.find(p => p.email === e.target.email.value));
    }

    return <>
        {!producer && <form onSubmit={findProducer}>
            <label htmlFor="">email</label><br /><br />
            <input type="email" name="email" /><br /><br /><br /><br /><br />
            <button type="submit">check</button>
        </form>
        }
        {producer && (
            <><h3>{producer.name}</h3>
            <h3>{producer.email}</h3>
            <h3>{producer.phone}</h3>
            <NavLink to ="AddAnEvent">add event</NavLink></>)
        }
    </>
}
