import { Producer } from "./Producer"

export type Event = {
    name: string,
    id: number,
    producer: Producer,
    price: number,
    hours: number
    
}