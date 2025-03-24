import { useContext, useState } from "react"
import { ProducerContext } from "../context/ProducerContext"
import { Producer } from "../types/Producer";
import { useHttp } from "../custom-hooks/useHttp";
import { NavLink } from "react-router";
import { EditableField } from "./EditableField";


export const ProducerDetails = () => {



    const { data: producers } = useHttp<Producer[]>('/producer', 'get');
    const [producer, setProducer] = useState<Producer | undefined>();
    const { request } = useHttp<Producer[]>(`producer/${producer?.email}`,`put`);

    const findProducer = (e: any) => {
        setProducer(producers?.find(p => p.email === e.target.email.value));
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
    return <>
        {!producer && <form onSubmit={findProducer}>
            <label htmlFor="">email</label><br /><br />
            <input type="email" name="email" /><br /><br /><br /><br /><br />
            <button type="submit">check</button>
        </form>
        }
        {producer && (
            <>
                <EditableField value={producer.name} setValue={(val: string) => updateField('name', val)} />
                <EditableField value={producer.email} setValue={(val: string) => updateField('email', val)} />
                <EditableField value={producer.phone} setValue={(val: string) => updateField('phone', val)} />
                <EditableField value={producer.description} setValue={(val: string) => updateField('description', val)} />
                <NavLink to="AddAnEvent">add event</NavLink></>)
        }
    </>
}
