import React from "react";
import "../../../styles/Components/Home/search.css";
//import {
//    useFindUsersQuery,
//    useFindFriendsQuery,
//    useOnlineUsersSubscription,
//    useMeQuery,
//} from "../../../generated/graphql";
//import {  Fieldmembers} from "./Fieldmembers";
interface SearchProps {
    username?: string;
    type?: string;
}

export const Search: React.FC<SearchProps> = ({ username, type }) => {
    //const [onlineUsers] = useOnlineUsersSubscription({
    //    variables: { status: "online" },
    //});
    //const [{ data }] = useFindUsersQuery({ variables: { name: username } });
    //const [friends] = useFindFriendsQuery();
    //const [me] = useMeQuery();

    //console.log(friends);
    return (
        <div className="search-results">
            {/*{type === "Users" ? (
        data?.Findusers.map((user) => (
            <Onlineusers
                id={user.id}
                key={user.id}
                username={user.username}
                profilepic={user.profilepic}
            />
        ))
    ) : type === "friends" ? (
        friends?.data?.findFriends.users.map((user) => (
            <Onlineusers
                id={user.id}
                key={user.id}
                username={user.username}
                profilepic={user.profilepic}
            />
        ))
    ) : type === "onlineFriends" ? (
        onlineUsers?.data?.onlineUsers.map((user) =>
            user.user.id === me.data.me.id ? null : (
                <Onlineusers
                    id={user.user.id}
                    key={user.user.id}
                    username={user.user.username}
                    profilepic={user.user.profilepic}
                />
            )
        )
    ) : (
        <div className="active">
            <h2>ACTIVE NOW</h2>
            <div className="infotab">
                <h3>It's quiet right now...</h3>
                <p>
                    When a friend starts an activity—like playing a game
                    or hanging out on voice—we’ll show it here!
                </p>
            </div>
        </div>
    )}{" "}*/}
        </div>
    );
};
