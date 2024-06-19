import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    addToDoList: "",

}

export const ToDoSlicer = createSlice({
    name: "SignUpSlicer",
    initialState,
    reducers: {
        setAddToDoList: (state, action) => {
            state.addToDoList = action.payload;
        },

    }
})
export const { setAddToDoList } = ToDoSlicer.actions;

export default ToDoSlicer.reducer