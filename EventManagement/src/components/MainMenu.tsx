import { NavLink } from "react-router";
// import "../styles/MainMenu.css";

export const MainMenu = () => {
    return (
        <div className="menu-container">
            <NavLink className="menu-link" to="/EventListForUsers">user</NavLink>
            <NavLink className="menu-link" to="/ProducersMenu">producer</NavLink>
        </div>
    );
}
