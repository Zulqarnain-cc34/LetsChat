import React, { useState } from "react";
import "../../../styles/Components/Home/navbaritem.css";

interface NavbarItemProps {
    icon?: any;
}

export const NavbarItem: React.FC<NavbarItemProps> = (props) => {
    const [open, setOpen] = useState(false);

    return (
        <li className="navbar-item" onClick={() => setOpen(!open)}>
            <button className="icon-button">{props.icon}</button>
            {open && props.children}
        </li>
    );
};
