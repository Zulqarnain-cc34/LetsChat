import React from "react";
import {
    faBell,
    faHockeyPuck,
    faComments,
    faUser,
} from "@fortawesome/free-solid-svg-icons";

import { faCopyright } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar } from "@material-ui/core";
import "../../../styles/Components/Home/sidebar.css";
import Field from "./Field";
import { Searchbar } from "./Searchbar";
import { useMeQuery } from "../../../generated/graphql";
import { Skeleton } from "@material-ui/lab";
import Imageuploader from "./Imageuploader";
import { useStateValue } from "../../../context/stateProvider";
import { useRef } from "react";
import { faAccusoft } from "@fortawesome/free-brands-svg-icons";
//
interface SidebarProps {}

const Sidebar: React.FC<SidebarProps> = () => {
    const [{ data, fetching }] = useMeQuery();
    const imageuploadRef = useRef<HTMLDivElement>();
    const { state } = useStateValue();

    const handleUpload = (e) => {
        e.preventDefault();
        state?.ref?.current.classList.add("upload-open");
        imageuploadRef?.current.classList.add("uploader-blur");
    };

    const handleUploadBlur = (e) => {
        e.preventDefault();
        if (imageuploadRef?.current.classList.contains("uploader-blur")) {
            imageuploadRef?.current.classList.remove("uploader-blur");
        }
        if (state?.ref?.current.classList.contains("upload-open")) {
            state?.ref?.current.classList.remove("upload-open");
        }
    };

    return (
        <div className="sidebar">
            <div className="sidebar-options">
                <div className="sidebar-options-header">
                    <div className="sidebar-options-top">
                        <FontAwesomeIcon
                            icon={faAccusoft}
                            className="sidebar-options-topicon"
                        />
                    </div>
                    <div className="sidebar-options-features">
                        <FontAwesomeIcon
                            icon={faComments}
                            className="sidebar-options-icons"
                        />
                        <FontAwesomeIcon
                            icon={faUser}
                            className="sidebar-options-icons"
                        />
                        <FontAwesomeIcon
                            icon={faHockeyPuck}
                            className="sidebar-options-icons"
                        />
                    </div>
                </div>
                <div className="sidebar-options-user">
                    <FontAwesomeIcon
                        icon={faBell}
                        className="sidebar-options-icons"
                    />
                    {fetching !== undefined &&
                        (fetching ? (
                            <Skeleton
                                variant="circle"
                                style={{ width: 40, height: 40 }}
                            />
                        ) : data?.me.profilepic ? (
                            <Avatar
                                className="sidebar-options-user-avatar"
                                src={data?.me.profilepic}
                                onClick={handleUpload}
                            />
                        ) : (
                            <Avatar
                                className="sidebar-options-user-avatar"
                                onClick={handleUpload}
                            />
                        ))}
                    <div
                        className="imageupload"
                        ref={imageuploadRef}
                        onClick={handleUploadBlur}
                    >
                        <Imageuploader />
                    </div>
                </div>
            </div>

            <div className="sidebar-groups">
                <div className="sidebar-groups-top">
                    <div className="sidebar-header">
                        <div className="sidebar-header-title">
                            <div className="sidebar-header-title-title">
                                <FontAwesomeIcon
                                    className="sidebar-header-icon"
                                    icon={faCopyright}
                                />
                                <p className="sidebar-header-maintitle">
                                    rypto
                                </p>
                            </div>
                            <p>Ride</p>
                        </div>
                        <Searchbar placeholder="Search" />
                    </div>
                </div>
                <div className="sidebar-groups-bottom">
                    <div className="sidebar-groups-heading">
                        <p>All Chats</p>
                        <p
                            style={{
                                color: "#b8b6b6",
                                fontSize: "1rem",
                                marginTop: "1px",
                            }}
                        >
                            39
                        </p>
                    </div>
                    <Field fieldname="ROOMS" type="Rooms" />
                    <Field fieldname="FRIENDS" type="Friends" />
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
