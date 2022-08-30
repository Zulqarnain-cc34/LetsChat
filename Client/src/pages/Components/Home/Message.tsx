import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar } from "@material-ui/core";
import React from "react";
import { useRef } from "react";
import "../../../styles/Components/Home/message.css";

interface MessageProps {
    username: string;
    message: string;
    profilepic?: string;
    createdAt: string;
    admin?: boolean;
}

export const Message: React.FC<MessageProps> = ({
    username,
    createdAt,
    message,
    profilepic,
    admin,
}) => {
    const imgRef = useRef<HTMLImageElement>();

    return (
        <div className="message">
            <Avatar ref={imgRef} src={profilepic} className="message-avatar" />

            <div className="message-content">
                <div className="message-content-info">
                    <p>{username}</p>
                    <h4>- {createdAt.split("T")[1].split(".")[0]}</h4>
                    {admin ? (
                        <FontAwesomeIcon
                            icon={faStar}
                            className="message-icon"
                        />
                    ) : null}
                </div>
                <div className="message-content-message">
                    <p>{message}</p>
                </div>
            </div>
        </div>
    );
};
