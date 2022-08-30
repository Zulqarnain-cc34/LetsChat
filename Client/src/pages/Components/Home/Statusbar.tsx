import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef, useState } from "react";
import "../../../styles/Components/Home/statusbar.css";
//import { Search } from "./Search";
interface StatusbarProps {}

export const Statusbar: React.FC<StatusbarProps> = () => {
    const SearchEngineRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const [search, setSearch] = useState<string>("");
    const [getType, setGetType] = useState<string>("");

    const handleFocus = () => {
        SearchEngineRef.current.style.borderColor = " rgb(4, 59, 241)";
    };
    const handleBlur = () => {
        SearchEngineRef.current.style.borderColor = " rgb(0,0,0)";
    };
    const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.keyCode === 13) {
            setSearch(e.currentTarget.value);
            inputRef.current.value = "";
        }
    };

    return (
        <div className="statusbar">
            <div className="SEO">
                <div
                    className="search-engine"
                    ref={SearchEngineRef}
                    onBlur={handleBlur}
                >
                    <input
                        type="text"
                        className="search-engine-input"
                        onFocus={handleFocus}
                        onKeyUp={handleSearch}
                        ref={inputRef}
                    />
                    <FontAwesomeIcon
                        icon={faSearch}
                        className="search-engine-icon"
                    />
                </div>
            </div>

            <div className="statusbar-options">
                <div
                    className="statusbar-option"
                    onClick={() => setGetType("friends")}
                >
                    <p>Friends</p>
                </div>
                <div
                    className="statusbar-option"
                    onClick={() => setGetType("Users")}
                >
                    <p>Users</p>
                </div>
                <div
                    className="statusbar-option"
                    onClick={() => setGetType("onlineFriends")}
                >
                    <p>Online</p>
                </div>
            </div>
            {/*<Search
                username={search}
                type={getType !== "" ? getType : "Users"}
            />*/}
        </div>
    );
};
