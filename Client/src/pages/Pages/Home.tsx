import React from "react";
import "../../styles/pages/home.css";
import { Chat } from "../Components/Home/Chat";
import Sidebar from "../Components/Home/Sidebar";

interface HomeProps {}

export const Home: React.FC<HomeProps> = () => {
    return (
        <div className="home">
            <Sidebar />
            <Chat />
        </div>
    );
};
//Home.whyDidYouRender = true;
export default React.memo(Home);
