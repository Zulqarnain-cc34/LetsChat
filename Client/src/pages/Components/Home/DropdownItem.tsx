import React from "react";
import "../../../styles/Components/Home/dropdownitem.css";
import { motion } from "framer-motion";

interface DropdownItemProps {
    leftIcon?: any;
    rightIcon?: any;
}

export const DropdownItem: React.FC<DropdownItemProps> = (props) => {
    return (
        <motion.div
            className="dropdown-item"
            transition={{ type: "tween", duration: 0.2 }}
            whileHover={{
                backgroundColor: "var(--dropdown-item-hover)",
            }}
        >
            <span className="item-left">{props.leftIcon}</span>

            {props.children}

            {props.rightIcon && (
                <span className="item-right">{props.rightIcon}</span>
            )}
        </motion.div>
    );
};
