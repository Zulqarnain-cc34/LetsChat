import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "../../../styles/Components/Home/searchbar.css";

interface SearchbarProps {
    placeholder: string;
}

export const Searchbar: React.FC<SearchbarProps> = ({ placeholder }) => {
    return (
        <div className="searchbar">
            <div className="searchbar-icon">
                <FontAwesomeIcon
                    className="searchbar-icon-icon"
                    icon={faSearch}
                />
            </div>
            <input type="text" placeholder={placeholder} />
        </div>
    );
};
