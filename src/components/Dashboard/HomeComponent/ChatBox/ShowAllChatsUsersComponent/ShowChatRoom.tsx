import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../ReduxHooks";
import { FaCross, FaPaperPlane, FaSadCry, FaTimes } from "react-icons/fa";
import { removeChatID, setChatID, setShowChatRoom } from "../../../../../ReduxSlicers/ShowChatRoomSlicer";
import { useApolloClient, useLazyQuery, useMutation, useSubscription } from "@apollo/client";
import { message_sent_subscribe, send_message_query, show_chat_room_query } from "../../../../../GraphQLQueries/HomeQuery";

import { v4 as uuidv4 } from 'uuid';
import "./ShowChatRoom.css"

function ShowChatRoom() {

    const senderID = useAppSelector((state) => state.ShowChatRoomSlicer.senderID)
    const receiverID = useAppSelector((state) => state.ShowChatRoomSlicer.receiverID)

    const [chatMessage, setChatMessage] = useState("");

    const [sendMessage] = useMutation(send_message_query, ({
        onCompleted: (data) => {
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

    // useEffect(()=>{
    //     console.log(senderID)
    //     console.log(receiverID)
    // })
    useSubscription(message_sent_subscribe, {
        onSubscriptionData: ({ client, subscriptionData }) => {
            const newMessage = subscriptionData.data.messageSent;
            console.log(newMessage);
            console.log(senderID)
            console.log(receiverID)
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
        <div className="show-chat-room-component">

            <div className="show-chat-room-input-div">
                <div className="cancel-chat-room-icon-div">
                    <FaTimes className="cancel-chat-room-icon" onClick={closeChatBox} />
                </div>
                <div>
                    {
                        fetchSenderReceiverChatRoomData && fetchSenderReceiverChatRoomData.showSenderReceiverChat.map((val: any) => {
                            return (
                                <div>
                                    {
                                        <p>{val.message}</p>
                                    }
                                </div>
                            )
                        })
                    }
                </div>
                <div className="chat-input-message-send-icon-div">
                    <input onChange={(e) => { setChatMessage(e.target.value) }} placeholder="send Message" type="text" />
                    <FaPaperPlane onClick={() =>
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
                    } />
                </div>
            </div>
        </div>
    )
}

export default ShowChatRoom;