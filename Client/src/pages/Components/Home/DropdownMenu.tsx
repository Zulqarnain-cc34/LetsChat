import React from "react";
import "../../../styles/Components/Home/dropdownmenu.css";
interface DropdownMenuProps {}

export const DropdownMenu: React.FC<DropdownMenuProps> = (props) => {
    return <div className="dropdown">{props.children}</div>;
};
