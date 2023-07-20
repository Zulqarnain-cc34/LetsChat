import React from "react";
import "../../../styles/Components/Home/navbarportion.css";
import { motion } from "framer-motion";

interface NavbarPortionProps {
    animate?: boolean;
}

const NavbarPortionVariants = {
    initial: {
        opacity: 0,
        x: "10vw",
    },
    animate: {
        opacity: 1,
        x: 0,
        transition: {
            type: "tween",
            delay: 1,
        },
    },
};

export const NavbarPortion: React.FC<NavbarPortionProps> = (props) => {
    return (
        <motion.ul
            className="nav-portion"
            variants={props.animate ? NavbarPortionVariants : null}
            initial={props.animate ? "initial" : ""}
            animate={props.animate ? "animate" : ""}
        >
            {props.children}
        </motion.ul>
    );
};
