import { Avatar } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";
import { GET_ROOM } from "../../../context/actionsTypes";
import { useStateValue } from "../../../context/stateProvider";
import { RoomState, UserState } from "../../../interfaces";
import "../../../styles/Components/Home/fieldmembers.css";
import { motion } from "framer-motion";
//import { store } from "react-notifications-component";
//import { SendNotification } from "../../../utils/Notifications";

interface FieldmembersProps {
    type: string;
    room?: RoomState;
    user?: UserState;
}

export const Fieldmembers: React.FC<FieldmembersProps> = ({
    type,
    room,
    user,
}) => {
    const { dispatch } = useStateValue();
    const history = useHistory();

    const handleRoom = (e) => {
        e.preventDefault();
        history.push(`/rooms/${parseInt(room.id)}`);
        dispatch({
            type: GET_ROOM,
            payload: { room: room },
        });
    };

    return (
        <motion.div
            className="fieldmembers"
            onClick={handleRoom}
            transition={{ type: "tween", duration: 0.1 }}
            whileHover={{
                backgroundColor: "#ebebeb",
            }}
        >
            <Avatar
                src={`https://source.unsplash.com/user/erondu`}
                className="fieldmembers-avatar"
            />
            <div className="fieldmembers-info">
                <div className="fieldmembers-time">
                    <div className="fieldmembers-status">
                        <div className="fieldmembers-status-icon">
                            <p>Priority</p>
                        </div>
                        <div className="fieldmembers-status-icon fieldmembers-status-alert">
                            <p>Warning</p>
                        </div>
                    </div>
                    <p>11:24am</p>
                </div>

                {room ? (
                    <h2>{room?.Roomname}</h2>
                ) : user ? (
                    <h2>{user?.username}</h2>
                ) : null}

                <h3>
                    Hello there we have ot get ready for the strike and please
                </h3>
            </div>
        </motion.div>
    );
};
