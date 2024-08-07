import React, { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { show_chat_query } from "../../../../GraphQLQueries/HomeQuery";
import ShowAllChatsUsers from "./ShowAllChatsUsersComponent/ShowAllChatsUsers";

import "../ChatBox/ChatBox.css"
import "../ChatBox/ChatBoxResponsive.css"

function ChatBox() {

    const [savedEmployeeLoggedInUid] = useState(localStorage.getItem("loggedInSavedUid"))

    const [showChats, { data: fetchShowChatsData, refetch }] = useLazyQuery(show_chat_query)

    useEffect(() => {
        if (savedEmployeeLoggedInUid) {
            showChats({
                variables: {
                    showAllChatsParamters: {
                        uid: savedEmployeeLoggedInUid
                    }
                }
            })
            refetch();
        }
    }, [savedEmployeeLoggedInUid])

    return (
        <div className="chat-box-component">
            <p className="chats-heading font-semibold ml-4 pl-2 ">All Chats</p>
            <ShowAllChatsUsers fetchShowChatsData={fetchShowChatsData} />
        </div>
    )
}

export default ChatBox;