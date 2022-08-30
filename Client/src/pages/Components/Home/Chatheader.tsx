import React from "react";
import { ReactComponent as MenuIcon } from "../../../icons/menu.svg";
import { ReactComponent as SearchIcon } from "../../../icons/searchicon.svg";
import { ReactComponent as ChatIcon } from "../../../icons/chat.svg";
import { ReactComponent as InfoIcon } from "../../../icons/info.svg";
//import { useStateValue } from "../../../context/stateProvider";
//import { useCreateRoomMutation } from "../../../generated/graphql";
//import { GET_ROOM } from "../../../context/actionsTypes";
//import { useHistory } from "react-router";
import { motion } from "framer-motion";
import { Navbar } from "./Navbar";
import { NavbarItem } from "./NavbarItem";
import { NavbarPortion } from "./NavbarPortion";
import { DropdownMenu } from "./DropdownMenu";
import { DropdownItem } from "./DropdownItem";

const TitleVariants = {
    initial: {
        color: "#bbbbbb",
        opacity: 0,
        y: "-100vh",
    },
    animate: {
        color: "#0a0a0a",
        opacity: 1,
        y: 0,
        transition: {
            type: "tween",
            duration: 0.7,
        },
    },
};

export const LogoVariants = {
    initial: {
        opacity: 0,
        x: -20,
    },
    animate: {
        opacity: 1,
        x: 0,
        scale: 1.1,
        transition: {
            type: "spring",
            delay: 0.8,
            stiffness: 80,
        },
    },
};

export const ContainerVariants = {
    initial: {
        borderColor: "#bbbbbb",
    },
    animate: {
        borderColor: "#ffffff",
    },
};

interface ChatheaderProps {}

const Chatheader: React.FC<ChatheaderProps> = () => {
    //const [name, setname] = useState<string>("");
    //const { _, dispatch } = useStateValue();
    //const [, createroom] = useCreateRoomMutation();
    //const history = useHistory();

    //const createRoom = async (e) => {
    //    e.preventDefault();
    //    const room = await createroom({ name: name });
    //    dispatch({
    //        type: GET_ROOM,
    //        payload: { room },
    //    });
    //};
    return (
        <Navbar>
            <NavbarPortion>
                <NavbarItem
                    icon={<ChatIcon className="icon-btn" />}
                ></NavbarItem>
            </NavbarPortion>
            <NavbarPortion>
                <motion.h2
                    variants={TitleVariants}
                    initial="initial"
                    animate="animate"
                >
                    Project Insight
                </motion.h2>
            </NavbarPortion>
            <NavbarPortion animate={true}>
                <NavbarItem icon={<SearchIcon />}></NavbarItem>

                <NavbarItem
                    icon={<InfoIcon className="icon-btn" />}
                ></NavbarItem>

                <NavbarItem icon={<MenuIcon />}>
                    <DropdownMenu>
                        <DropdownItem leftIcon={<SearchIcon />}>
                            <p>Menu</p>
                        </DropdownItem>
                        <DropdownItem leftIcon={<SearchIcon />}>
                            <p>Channel</p>
                        </DropdownItem>
                        <DropdownItem leftIcon={<SearchIcon />}>
                            <p>Logout</p>
                        </DropdownItem>
                    </DropdownMenu>
                </NavbarItem>
            </NavbarPortion>
        </Navbar>
    );
};
export default React.memo(Chatheader);
