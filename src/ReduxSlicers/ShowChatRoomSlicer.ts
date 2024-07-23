import { createSlice } from "@reduxjs/toolkit"

type ShowChatRoomSlicerProps = {
    showChatRoom: boolean
    senderID: string
    receiverID: string
    showSelectedChatUserDetails: any
}

const initialState: ShowChatRoomSlicerProps = {
    showChatRoom: false,
    senderID: "",
    receiverID: "",
    showSelectedChatUserDetails: []
}

export const ShowChatRoomSlicer = createSlice({
    name: "ShowChatRoomSlicer",
    initialState,
    reducers: {
        setShowChatRoom: (state, action) => {
            state.showChatRoom = action.payload;

        },

        setChatID: (state, action) => {
            state.senderID = action.payload.savedEmployeeLoggedInUid
            state.receiverID = action.payload.val.uid
        },

        removeChatID: (state, action) => {
            state.senderID = ""
            state.receiverID = ""
        },

        setShowSelectedChatUserDetails: (state, action) => {
            state.showSelectedChatUserDetails = action.payload;
        }

    }
})

export const { setShowChatRoom, setChatID, removeChatID, setShowSelectedChatUserDetails } = ShowChatRoomSlicer.actions;

export default ShowChatRoomSlicer.reducer