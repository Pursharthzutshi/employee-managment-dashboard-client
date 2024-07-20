import { createSlice } from "@reduxjs/toolkit"

type ShowChatRoomSlicerProps = {
    showChatRoom: boolean
    senderID: string
    receiverID: string
}

const initialState: ShowChatRoomSlicerProps = {
    showChatRoom: false,
    senderID: "",
    receiverID: ""

}

export const ShowChatRoomSlicer = createSlice({
    name: "ShowChatRoomSlicer",
    initialState,
    reducers: {
        setShowChatRoom: (state, action) => {
            state.showChatRoom = action.payload;

        },

        setChatID: (state, action) => {
            console.log(action.payload)
            state.senderID = action.payload.savedEmployeeLoggedInUid
            state.receiverID = action.payload.val.uid
        },

        removeChatID: (state, action) => {
            state.senderID = ""
            state.receiverID = ""
        }

    }
})

export const { setShowChatRoom, setChatID, removeChatID } = ShowChatRoomSlicer.actions;

export default ShowChatRoomSlicer.reducer