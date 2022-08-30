import React, { useState } from "react";
import "../../../styles/Components/Home/field.css";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import {
    //useFindFriendsQuery,
    useGetroomsQuery,
} from "../../../generated/graphql";
import { Fieldmembers } from "./Fieldmembers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface FieldProps {
    fieldname: string;
    type: string;
}

const Field: React.FC<FieldProps> = ({ fieldname, type }) => {
    const [{ data }] = useGetroomsQuery({
        variables: { limit: 10, bilateral: false },
    });
    const [friend] = useGetroomsQuery({
        variables: { limit: 10, bilateral: true },
    });

    //const [friends] = useFindFriendsQuery();

    const [selected, setSelected] = useState<boolean>(true);
    //const createRoom = () => {
    //    await
    //};

    return (
        <div className="field">
            <div className="field-info" onClick={() => setSelected(!selected)}>
                <h2>{fieldname}</h2>
                <FontAwesomeIcon
                    icon={faPlus}
                    style={{
                        width: "10px",
                        height: "15px",
                        color: "#cfcaca",
                    }}
                    onClick={() => createRoom}
                />
            </div>
            <div className={selected ? "selected" : "field-elements"}>
                {type.toLowerCase() === "rooms"
                    ? data?.getRoom.rooms.map((room) => (
                          <Fieldmembers
                              type={type}
                              room={room.room}
                              key={room.room.id}
                          />
                      ))
                    : type.toLowerCase() === "friends"
                    ? friend?.data?.getRoom.rooms.map((user) => (
                          <Fieldmembers
                              type={type}
                              room={user.room}
                              key={user.room.id}
                          />
                      ))
                    : null}
            </div>
        </div>
    );
};
export default React.memo(Field);
