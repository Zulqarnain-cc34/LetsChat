import React from "react";
import "../../../styles/Components/Home/navbar.css";

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = (props) => {
    return <nav className="navbar">{props.children}</nav>;
};
