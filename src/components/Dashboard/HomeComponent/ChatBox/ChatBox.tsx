import React, { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { show_chat_query } from "../../../../GraphQLQueries/HomeQuery";
import ShowAllChatsUsers from "./ShowAllChatsUsersComponent/ShowAllChatsUsers";

import "../ChatBox/ChatBox.css"

function ChatBox() {

    const [savedEmployeeLoggedInUid] = useState(localStorage.getItem("loggedInSavedUid") || localStorage.getItem("adminLoggedInSavedUid"));

    const [showChats, { data: fetchShowChatsData }] = useLazyQuery(show_chat_query, {
        onCompleted: (showChatsData) => {
            console.log(showChatsData)
        },

    })

    useEffect(() => {
        console.log(savedEmployeeLoggedInUid)
        if (savedEmployeeLoggedInUid) {
            showChats({
                variables: {
                    showAllChatsParamters: {
                        uid: savedEmployeeLoggedInUid
                    }
                }
            })
        }
    }, [savedEmployeeLoggedInUid])

    return (
        <div className="chat-box-component">
            <ShowAllChatsUsers fetchShowChatsData={fetchShowChatsData} />
        </div>
    )
}

export default ChatBox;