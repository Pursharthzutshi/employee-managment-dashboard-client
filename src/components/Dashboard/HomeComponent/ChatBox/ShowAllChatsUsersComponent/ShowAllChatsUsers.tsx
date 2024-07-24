import React, { useEffect, useState } from "react";
import image from "../../../../RegisterComponent/images/add-user.png"
import { useAppDispatch, useAppSelector } from "../../../../../ReduxHooks";
import { setChatID, setShowChatRoom, setShowSelectedChatUserDetails } from "../../../../../ReduxSlicers/ShowChatRoomSlicer";
import { FaFacebookMessenger, FaTelegram } from "react-icons/fa";
import { fetchShowChatsDataType, messageType } from "../../../../../Types/HomeComponentTypes";

import "../ShowAllChatsUsersComponent/ShowAllChatUsers.css"
import "../ChatBoxResponsive.css"


type ShowAllChatsUsersProps = {
    fetchShowChatsData: fetchShowChatsDataType
}

function ShowAllChatsUsers({ fetchShowChatsData }: ShowAllChatsUsersProps) {

    const [setSavedLoggedInEmployeeUid] = useState(localStorage.getItem("loggedInSavedUid"));

    const showChatRoom = useAppSelector((state) => state.ShowChatRoomSlicer.showChatRoom)
    const [savedEmployeeLoggedInUid] = useState(localStorage.getItem("loggedInSavedUid") || localStorage.getItem("adminLoggedInSavedUid"));

    const Dispatch = useAppDispatch();


    const showChatRoomDialogBox = (val: messageType) => {
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

            {fetchShowChatsData && fetchShowChatsData?.showAllChats.filter((val: messageType) => {
                if (val.uid === setSavedLoggedInEmployeeUid) {
                    return val.uid !== setSavedLoggedInEmployeeUid
                } else {
                    return val
                }
            }).map((val: messageType) => {
                return (
                    <div className="show-all-user-to-chat-box">
                        <div onClick={() => { showChatRoomDialogBox(val) }} className="user-chat-container">
                            <div>
                                <div>
                                    <img className="image" src={image} />
                                </div>
                                <div>
                                    <p className="font-semibold">{val.name}</p>
                                    <span className="show-all-user-to-chat-email-id">{val.emailId}</span>
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