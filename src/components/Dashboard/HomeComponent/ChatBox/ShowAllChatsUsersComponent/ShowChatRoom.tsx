import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../ReduxHooks";
import { FaCross, FaPaperPlane, FaSadCry, FaTimes } from "react-icons/fa";
import { removeChatID, setChatID, setShowChatRoom } from "../../../../../ReduxSlicers/ShowChatRoomSlicer";
import { useApolloClient, useLazyQuery, useMutation, useSubscription } from "@apollo/client";
import { message_sent_subscribe, send_message_query, show_chat_room_query } from "../../../../../GraphQLQueries/HomeQuery";
import { v4 as uuidv4 } from 'uuid';
import image from "../../../../RegisterComponent/images/add-user.png"

import "./ShowChatRoom.css"

function ShowChatRoom() {
    const showUserDetails = useAppSelector((state) => state.ShowChatRoomSlicer.showSelectedChatUserDetails)

    const senderID = useAppSelector((state) => state.ShowChatRoomSlicer.senderID)
    const receiverID = useAppSelector((state) => state.ShowChatRoomSlicer.receiverID)

    const [chatMessage, setChatMessage] = useState("");

    const [sendMessage] = useMutation(send_message_query, ({
        onCompleted: (data) => {
            // setChatMessage("")
            console.log(data)
        },
        update: (cache, { data: { sendMessage } }) => {
            console.log(sendMessage);
            const newMessageData = sendMessage

            const showFetchedChats: any = cache.readQuery(
                {
                    query: show_chat_room_query,
                    variables: {
                        showSenderReceiverChatParameters: {
                            senderId: senderID,
                            receiverId: receiverID
                        }
                    }
                }
            )
            if (senderID && receiverID) {
                cache.writeQuery({
                    query: show_chat_room_query,
                    variables: {
                        showSenderReceiverChatParameters: {
                            senderId: senderID,
                            receiverId: receiverID
                        }
                    },
                    data: {
                        showSenderReceiverChat: [...showFetchedChats.showSenderReceiverChat, newMessageData]
                    }
                })
            }
        }
    }))

    const client = useApolloClient();

    const [showChatRoom, { data: fetchSenderReceiverChatRoomData }] = useLazyQuery(show_chat_room_query, ({
        onCompleted: (showChatRoomData) => {
            console.log(showChatRoomData);
        },
    }
    ))

    useSubscription(message_sent_subscribe, {
        onSubscriptionData: ({ client, subscriptionData }) => {
            const newMessage = subscriptionData.data.messageSent;

            client.writeQuery({
                query: show_chat_room_query,
                variables: {
                    showSenderReceiverChatParameters: {
                        senderId: senderID,
                        receiverId: receiverID
                    }
                },
                data: {
                    showSenderReceiverChat: [
                        ...(fetchSenderReceiverChatRoomData?.showSenderReceiverChat || []), // Use optional chaining to handle initial undefined state
                        newMessage
                    ]
                },
            });
        },
    });

    // useSubscription(message_sent_subscribe, {
    //     onSubscriptionData: ({ client, subscriptionData }) => {
    //         const newMessage = subscriptionData.data.messageSent;
    //         console.log(newMessage)
    //         client.writeQuery({
    //             query: show_chat_room_query,
    //             variables: {
    //                 senderId: senderID,
    //                 receiverId: receiverID
    //             },
    //             data: {
    //                 showSenderReceiverChat: [...fetchSenderReceiverChatRoomData.showSenderReceiverChat, newMessage],
    //             },
    //         });
    //     },
    // });

    useEffect(() => {
        if (senderID && receiverID) {
            showChatRoom({
                variables: {
                    showSenderReceiverChatParameters: {
                        senderId: senderID,
                        receiverId: receiverID
                    }
                }
            })
        }
    }, [])

    const closeChatBox = () => {
        Dispatch(setShowChatRoom(false))
        Dispatch(removeChatID(""))
    }

    const Dispatch = useAppDispatch()

    return (
        <div className="test">
            <div className="show-chat-room-component">

                <div className="chat-room-user-profile-details-container">

                    <div className="chat-room-user-profile-details-div">
                        <div>
                            <img className="chat-profile-image" src={image} />
                        </div>
                        <div className="chat-room-name-email-id-div">
                            <p>{showUserDetails.name}</p>
                            <p className="chat-room-email-id">{showUserDetails.emailId}</p>
                        </div>
                    </div>
                    <div className="cancel-chat-room-icon-div">
                        <FaTimes className="cancel-chat-room-icon" onClick={closeChatBox} />
                    </div>

                </div>
                <div className="show-chat-room-input-div">

                    <div className="chat-input-message-send-icon-div">
                        <textarea className="font-semibold send-message-textarea" onChange={(e) => { setChatMessage(e.target.value) }} placeholder="Send Message" rows={3} cols={43}  ></textarea>
                        {
                            chatMessage ? <FaPaperPlane className="send-message-icon-button" onClick={() =>
                                sendMessage({
                                    variables: {
                                        sendMessageParameters: {
                                            uid: uuidv4(),
                                            senderId: senderID,
                                            receiverId: receiverID,
                                            message: chatMessage
                                        }
                                    }
                                })
                            } /> : null
                        }

                    </div>
                </div>

            </div>

                <div className="messages-container">
                    {
                        fetchSenderReceiverChatRoomData && fetchSenderReceiverChatRoomData.showSenderReceiverChat.map((val: any) => {
                            return (
                                <div className="messages-div">
                                    {
                                        <p className="messages">{val.message}</p>
                                    }
                                </div>
                            )
                        })
                    }
                </div>

        </div>
    )
}

export default ShowChatRoom;