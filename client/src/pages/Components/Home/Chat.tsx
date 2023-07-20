import React from "react";
import { useParams } from "react-router-dom";
import "../../../styles/Components/Home/chat.css";
import Chatarea from "./Chatarea";
import Chatheader from "./Chatheader";

interface ChatProps {}

export const Chat: React.FC<ChatProps> = () => {
    const { roomId } = useParams<{ roomId: string }>();

    return (
        <div className="chat">
            <Chatheader />
            <Chatarea roomId={roomId} />
        </div>
    );
};
