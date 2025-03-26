import { useHttp } from "../custom-hooks/useHttp";
import { Event } from "../types/Event";
import { useParams } from "react-router";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export const AddAnEvent = () => {
    const { request } = useHttp<Event>(`event`, "post");
    const { EmailProducer } = useParams();
    const navigate = useNavigate();

    // הגדרת state עבור השדות
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');

    const addEvent = async (e: any) => {
        e.preventDefault(); // למנוע טעינה מחדש של הדף
        try {
            const newEvent = {
                emailProducer: EmailProducer,
                name: name,
                price: price,
                description: description,
            }
            const answer = await request(newEvent);
            if (answer) {
                                setName('');
                setPrice('');
                setDescription('');
            }
            else{
                navigate('/ProducerDetails', { replace: true });

            }

        } catch (error) {
            console.log("Error add event:", error);
        }
    }

    return (
        <form onSubmit={addEvent}>
            <input 
                type="text" 
                id="name" 
                name="name" 
                placeholder="name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                required 
            />
            <input 
                type="number" 
                id="price" 
                name="price" 
                placeholder="price" 
                value={price} 
                onChange={(e) => setPrice(e.target.value)} 
                required 
            />
            <input 
                type="text" 
                id="description" 
                name="description" 
                placeholder="description" 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
                required 
            />
            <button type="submit">create</button>
        </form>
    );
}
