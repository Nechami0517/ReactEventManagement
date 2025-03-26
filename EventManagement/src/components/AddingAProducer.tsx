import { useHttp } from '../custom-hooks/useHttp';
import { Producer } from '../types/Producer';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export const AddingAProducer = () => {
    const { request } = useHttp<Producer>(`producer`, 'post');
    const navigate = useNavigate();

    // הגדרת מצב עבור כל שדה
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [description, setDescription] = useState('');

    const send = async (e: any) => {
        e.preventDefault();

        const p = {
            _id: "jjj",
            name,
            email,
            phone,
            description
        };

        const answer = await request(p);
        if (answer) {
            await alert(answer);        
            setName('');
            setEmail('');
            setPhone('');
            setDescription('');
        } else {
            navigate('/ProducerDetails');
    
        }
    }

    return (
        <form onSubmit={send}>
            <h2>insert your details:</h2>
            <input 
                type="text" 
                name="name" 
                placeholder="Name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
            />
            <input 
                type="email" 
                name="email" 
                placeholder="Email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
            />
            <input 
                type="text" 
                name="phone" 
                placeholder="Phone" 
                value={phone} 
                onChange={(e) => setPhone(e.target.value)} 
            />
            <input 
                type="text" 
                name="description" 
                placeholder="Description" 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
            />
            <button type="submit">send</button>
        </form>
    );
}
