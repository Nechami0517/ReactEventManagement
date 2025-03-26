import { useHttp } from '../custom-hooks/useHttp';
import { Producer } from '../types/Producer';

export const AddingAProducer = () => {

    const { request, error } = useHttp<Producer>(`producer`, 'post');

    const send = async (e: any) => {
        e.preventDefault();

        const p = {
            _id: "jjj",
            name: e.target.name.value,
            email: e.target.email.value,
            phone: e.target.phone.value,
            description: e.target.description.value
        };




        await request(p);
        if (error)
            alert("the email not good")

    }

    return (
        <form onSubmit={send}>
            <h2>insert your details:</h2>
            <input type="text" name="name" placeholder="Name" />
            <input type="email" name="email" placeholder="Email" />
            <input type="text" name="phone" placeholder="Phone" />
            <input type="text" name="description" placeholder="Description" />
            <button type="submit">send</button>
        </form>
    );
}
