import { useHttp } from "../custom-hooks/useHttp";
import { Event } from "../types/Event";
import { useNavigate , useParams } from "react-router";

export const AddAnEvent = () =>{
        const {request} = useHttp<Event>(`event`,"post");
        const { EmailProducer } = useParams();
       // const navigate = useNavigate(); 
      

       const addEvent = async(e:any)=>{
                try{
                      const newEvent = {
                                emailProducer:EmailProducer,
                                name: e.target.name.value,
                                price: e.target.price.value,
                                description: e.target.description.value, 
                        }
                        await request(newEvent).then((response) => {
                                console.log("Event created:", response);
                            });

                           // navigate("/ProducerDetails");
                        } catch (error) {
                            console.log("Error add event:", error);
                        }
                        
                
       }




       return (
        <form onSubmit={addEvent}>
            <input type="text" id="name" name="name" placeholder="name" required />
            <input type="number" id="price" name="price" placeholder="price" required />
            <input type="text" id="description" name="description" placeholder="description" required />
            <button type="submit">create</button>
        </form>
    );
    
}