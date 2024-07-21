import React, { useEffect, useState } from "react";
import image from "../../../../RegisterComponent/images/add-user.png"
import ShowChatRoom from "./ShowChatRoom";
import { useAppDispatch, useAppSelector } from "../../../../../ReduxHooks";
import { setChatID, setShowChatRoom, setShowSelectedChatUserDetails } from "../../../../../ReduxSlicers/ShowChatRoomSlicer";

// import "../ShowAllChatsUsersComponent/ShowAllChatUser.css"

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
        Dispatch(setShowSelectedChatUserDetails(val));
        // setShowChatRoom(true)
    }



    return (
        <div>
            {
                fetchShowChatsData && fetchShowChatsData?.showAllChats.map((val: any) => {
                    return (
                        <div onClick={() => { test(val) }} className="show-all-user-to-chat-box">
                            <div>
                         
                                {/* {
                                    showUserDetails.map((val:any)=>{
                                        return(
                                            <div>
                                                <p>{val.name}</p>
                                                <p>{val.emailId}</p>
                                            </div>
                                        )
                                    })
                                } */}

                                {/* {
                                    showUserDetails[0].name
                                } */}
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