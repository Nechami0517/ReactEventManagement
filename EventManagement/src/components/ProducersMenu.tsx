import { NavLink } from "react-router"

export const ProducersMenu = () => {
    return <>
          <NavLink to={"/AddingProducer"}>new producer</NavLink><br /><br /><br />
        <NavLink to={"/ProducerDetails"}>enter producer</NavLink><br /><br />
    </>
}
