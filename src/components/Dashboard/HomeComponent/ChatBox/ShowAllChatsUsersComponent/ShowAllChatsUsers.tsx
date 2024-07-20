import React, { useState } from "react";
import image from "../../../../RegisterComponent/images/add-user.png"
import ShowChatRoom from "./ShowChatRoom";
import { useAppDispatch, useAppSelector } from "../../../../../ReduxHooks";
import { setChatID, setShowChatRoom } from "../../../../../ReduxSlicers/ShowChatRoomSlicer";

type ShowAllChatsUsersProps = {
    fetchShowChatsData: any
}

function ShowAllChatsUsers({ fetchShowChatsData }: ShowAllChatsUsersProps) {

    const [savedEmployeeLoggedInUid] = useState(localStorage.getItem("loggedInSavedUid") || localStorage.getItem("adminLoggedInSavedUid"));

    const Dispatch = useAppDispatch();


    const test = (val: any) => {
        const chatID = { val, savedEmployeeLoggedInUid }
        Dispatch(setChatID(chatID))
        Dispatch(setShowChatRoom(true))
        // setShowChatRoom(true)
    }

    return (
        <div>
            {
                fetchShowChatsData && fetchShowChatsData?.showAllChats.map((val: any) => {
                    return (
                        <div onClick={() => { test(val) }} className="show-all-user-to-chat-box">
                            <div>
                                <img className="image" src={image} />
                            </div>
                            <div>
                                <p>{val.name}</p>
                                <span className=" ">{val.emailId}</span>
                            </div>
                        </div>

                    )
                })
            }


        </div>
    )
}

export default ShowAllChatsUsers;