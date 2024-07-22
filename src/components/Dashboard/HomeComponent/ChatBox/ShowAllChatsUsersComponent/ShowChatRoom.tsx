import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../ReduxHooks";
import { FaCross, FaPaperPlane, FaSadCry, FaTimes } from "react-icons/fa";
import { removeChatID, setChatID, setShowChatRoom } from "../../../../../ReduxSlicers/ShowChatRoomSlicer";
import { useApolloClient, useLazyQuery, useMutation, useSubscription } from "@apollo/client";
import { message_sent_subscribe, send_message_query, sendMessageTypeQuery, show_chat_room_query, typingIndicatorSubscribe } from "../../../../../GraphQLQueries/HomeQuery";
import { v4 as uuidv4 } from 'uuid';
import image from "../../../../RegisterComponent/images/add-user.png"

import "./ShowChatRoom.css"
import { fetchShowChatsDataType, messageType } from "../../../../../Types/HomeComponentTypes";

function ShowChatRoom() {
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    const [showMessageName, setShowMessageName] = useState("")

    const showUserDetails = useAppSelector((state) => state.ShowChatRoomSlicer.showSelectedChatUserDetails)

    const senderID = useAppSelector((state) => state.ShowChatRoomSlicer.senderID)
    const receiverID = useAppSelector((state) => state.ShowChatRoomSlicer.receiverID)

    const [chatMessage, setChatMessage] = useState("");

    const [typeMessageIndicator, { data: typeMessageIndicatorData }] = useMutation(sendMessageTypeQuery)

    const [typeChatMessageIndicatorStatus, setTypeChatMessageIndicatorStatus] = useState(false)

    useEffect(() => {

        typeMessageIndicator({
            variables: {
                sendMessageTypeIndicatorParameters: {
                    isTyping: false
                }
            }
        })
        console.log(typeMessageIndicatorData)
    })
    const typeMessage = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setChatMessage(e.target.value)

        typeMessageIndicator({
            variables: {
                sendMessageTypeIndicatorParameters: {
                    isTyping: true
                }
            }
        })

        // setTypeChatMessageIndicatorStatus(true)
    }

    const { data } = useSubscription(typingIndicatorSubscribe);

    useEffect(() => {
        console.log(data)
    })

    const [sendMessage, { loading: sendMessageLoading }] = useMutation(send_message_query, ({
        onCompleted: (data) => {

        },
        update: (cache, { data: { sendMessage } }) => {
            const newMessageData = sendMessage;

            if (newMessageData && newMessageData.message) {
                const showFetchedChats: fetchShowChatsDataType | null = cache.readQuery({
                    query: show_chat_room_query,
                    variables: {
                        showSenderReceiverChatParameters: {
                            senderId: senderID,
                            receiverId: receiverID,
                        },
                    },
                });

                if (senderID && receiverID) {
                    cache.writeQuery({
                        query: show_chat_room_query,
                        variables: {
                            showSenderReceiverChatParameters: {
                                senderId: senderID,
                                receiverId: receiverID,
                            },
                        },
                        data: {
                            showSenderReceiverChat: [...showFetchedChats?.showSenderReceiverChat, newMessageData],
                        },
                    });
                }
            }
        }
    }))

    const client = useApolloClient();

    const [showChatRoom, { data: fetchSenderReceiverChatRoomData, loading: fetchSenderReceiverChatRoomLoading }] = useLazyQuery(show_chat_room_query, ({
        onCompleted: (showChatRoomData) => {
            console.log(showChatRoomData);
        },
    }
    ))
    useEffect(() => {

    })
    const [subscription, setSubscription] = useState(null)

    const newSubscription = useSubscription(message_sent_subscribe, {
        onSubscriptionData: ({ client, subscriptionData }) => {
            const newMessage = subscriptionData.data.messageSent;

            client.writeQuery({
                query: show_chat_room_query,
                variables: {
                    showSenderReceiverChatParameters: {
                        senderId: senderID,
                        receiverId: receiverID,
                    },
                },
                data: {
                    showSenderReceiverChat: [
                        ...(fetchSenderReceiverChatRoomData?.showSenderReceiverChat || []),
                        newMessage,
                    ],
                },
            });

        }

    },
    )
    // useEffect(()=>{
    //     setTypeChatMessageIndicatorStatus(false)
    // })


    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [fetchSenderReceiverChatRoomData]);

    useEffect(() => {
        let unsubscribe;

        console.log(newSubscription)
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
        unsubscribe = newSubscription;

    }, [])


    const closeChatBox = () => {
        Dispatch(setShowChatRoom(false))
        Dispatch(removeChatID(""))
    }

    const sendMessageData = (e: React.KeyboardEvent) => {
        console.log(e)
        if (chatMessage.trim()) {
            if (e.key === "Enter") {
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
                setChatMessage("")

            }
        } else {
            console.log("wrong")
        }

    }

    const Dispatch = useAppDispatch()

    // if (sendMessageLoading) return <div>Loading...</div>

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
                        <textarea value={chatMessage} onKeyUp={sendMessageData} className="font-semibold send-message-textarea" onChange={typeMessage} placeholder="Send Message" rows={4} cols={46}  >
                            {/* {
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
                            } */}
                        </textarea>


                    </div>
                </div>

            </div>

            <div className="messages-container">
                {
                    fetchSenderReceiverChatRoomData && fetchSenderReceiverChatRoomData.showSenderReceiverChat.map((val: messageType) => {

                        if (fetchSenderReceiverChatRoomLoading) return <div>Loading...</div>
                        return (
                            val.senderId === senderID ?
                                <div className="sender-message-div messages-div">
                                    <img className="chat-profile-image" src={image} />

                                    <p className="user-message font-semibold">You</p>


                                    <p className="font-semibold">{showMessageName}</p>
                                    <p className="messages">{val.message}</p>

                                    <div ref={messagesEndRef} />
                                </div> :
                                <div className="reciever-message-div messages-div">
                                    <img className="chat-profile-image" src={image} />

                                    <p className="other-message font-semibold">{showUserDetails.name}</p>


                                    <p className="font-semibold">{showMessageName}</p>
                                    <p className="messages">{val.message}</p>

                                    <div ref={messagesEndRef} />
                                </div>
                        )


                    })


                }
                {/* {
                typeMessageIndicatorData && typeMessageIndicatorData.sendMessageTypeIndicator.success ? <p>User is typing</p> : null
                }
                 */}
            </div>

        </div>
    )
}

export default ShowChatRoom;
