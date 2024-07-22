import React, { useEffect, useState } from "react";
import image from "../../../../RegisterComponent/images/add-user.png"
import { useAppDispatch, useAppSelector } from "../../../../../ReduxHooks";
import { setChatID, setShowChatRoom, setShowSelectedChatUserDetails } from "../../../../../ReduxSlicers/ShowChatRoomSlicer";
import { FaFacebookMessenger, FaTelegram } from "react-icons/fa";

import "../ShowAllChatsUsersComponent/ShowAllChatUsers.css"
import { fetchShowChatsDataType } from "../../../../../Types/HomeComponentTypes";



type ShowAllChatsUsersProps = {
    fetchShowChatsData: fetchShowChatsDataType
}

function ShowAllChatsUsers({ fetchShowChatsData }: ShowAllChatsUsersProps) {

    const showChatRoom = useAppSelector((state) => state.ShowChatRoomSlicer.showChatRoom)
    const [savedEmployeeLoggedInUid] = useState(localStorage.getItem("loggedInSavedUid") || localStorage.getItem("adminLoggedInSavedUid"));

    const Dispatch = useAppDispatch();


    const showChatRoomDialogBox = (val: fetchShowChatsDataType) => {
        const chatID = { val, savedEmployeeLoggedInUid }
        Dispatch(setChatID(chatID))
        Dispatch(setShowChatRoom(true))
        if (showChatRoom === true) {
            Dispatch(setShowChatRoom(false))

            setTimeout(() => {
                Dispatch(setShowChatRoom(true))
            })
        } else {
            Dispatch(setShowChatRoom(true))
        }
        Dispatch(setShowSelectedChatUserDetails(val));
        // setShowChatRoom(true)
    }



    return (
        <div className="main-chatbox">
            {
                fetchShowChatsData && fetchShowChatsData?.showAllChats.map((val: fetchShowChatsDataType) => {
                    console.log(fetchShowChatsData)
                    return (
                        <div className="show-all-user-to-chat-box">
                            <div className="user-chat-container">
                                <div>
                                    <div>
                                        <img className="image" src={image} />
                                    </div>
                                    <div>
                                        <p className="font-semibold">{val.name}</p>
                                        <span className="">{val.emailId}</span>
                                    </div>
                                </div>

                                <div>
                                    <FaFacebookMessenger onClick={() => { showChatRoomDialogBox(val) }} className="user-chat-container-icon" />
                                </div>
                            </div>
                        </div>

                    )
                })
            }


        </div>
    )
}

export default ShowAllChatsUsers;