import React, { useRef, useState } from "react";
import "../../../styles/Components/Home/chatarea.css";
import SearchIcon from "../../../icons/searchicon.svg";
import EmojiIcon from "../../../icons/emoji.svg";
import { Picker } from "emoji-mart";
import {
    usePostAddedSubscription,
    useGetpostsQuery,
    RegularPostsFragment,
    useCreatepostMutation,
} from "../../../generated/graphql";
import { Message } from "./Message";
import { useEffect } from "react";
import "emoji-mart/css/emoji-mart.css";
import { useStateValue } from "../../../context/stateProvider";

interface ChatareaProps {
    roomId: string;
}

const Chatarea: React.FC<ChatareaProps> = ({ roomId }) => {
    const [{ data }] = useGetpostsQuery({
        variables: { roomId: parseInt(roomId), limit: 40 },
    });
    const { state } = useStateValue();

    const [newPost] = usePostAddedSubscription({
        variables: { roomId: parseInt(roomId) },
    });

    const [postcreated, setPostcreated] = useState<string>("");
    const [, createPost] = useCreatepostMutation();
    const [newPosts, setNewPosts] = useState<RegularPostsFragment[]>([]);
    const emojiRef = useRef<HTMLInputElement>();

    //console.log(data?.posts.posts);

    const addEmoji = (e) => {
        let emoji = e.native;
        setPostcreated(postcreated + emoji);
    };

    async function createMessageData() {
        await createPost({
            message: postcreated,
            roomId: parseInt(roomId),
        });
        setPostcreated("");
    }

    const showEmojiPicker = (e) => {
        e.preventDefault();

        if (emojiRef.current.classList.contains("emoji-picker-hide")) {
            emojiRef.current.classList.remove("emoji-picker-hide");
        } else {
            emojiRef.current.classList.add("emoji-picker-hide");
        }
    };

    const handleMessageSubmit = (e) => {
        e.preventDefault();

        // Emoji Picker is hidden when you submit the <message></message>
        emojiRef.current.classList.remove("emoji-picker-hide");
        createMessageData();
    };

    useEffect(() => {
        if (newPost?.data) {
            setNewPosts([newPost.data.Postadded.post, ...newPosts]);
        }
    }, [newPost.data]);

    return (
        <div className="chatarea">
            <div className="chattingarea">
                {data?.posts.posts
                    .slice(0)
                    .reverse()
                    .map((post) => (
                        <Message
                            username={post["creator"].username}
                            profilepic={post["creator"].profilepic}
                            createdAt={post.createdAt}
                            message={post.message}
                            admin={state?.room.adminId === post.creatorid}
                            key={post.id}
                        />
                    ))}

                {/*{newPosts
                    .slice(0)
                    .reverse()
                    .map((post) => (
                        <Message
                            username={post["creator"].username}
                            profilepic={post["creator"].profilepic}
                            createdAt={post.createdAt}
                            message={post.message}
                            admin={state?.room.adminId === post.creatorid}
                            key={post.id}
                        />
                    ))}*/}
            </div>
            <div className="chatarea-input">
                <img src={SearchIcon} alt="" />
                <form onSubmit={handleMessageSubmit} className="chatarea-form">
                    <input
                        type="text"
                        placeholder="Write a reply"
                        onChange={(e) => setPostcreated(e.target.value)}
                        value={postcreated}
                    />
                    <img src={EmojiIcon} alt="" onClick={showEmojiPicker} />
                </form>
                <span ref={emojiRef}>
                    <Picker onSelect={addEmoji} />
                </span>
            </div>
        </div>
    );
};

export default Chatarea;
