import { createSlice } from "@reduxjs/toolkit"

type taskAssignedProps = {
    taskAssigned: boolean
}

const initialState: taskAssignedProps = {
    taskAssigned: false
}

const ShowTaskAssignEmployeeInDialogBoxSlicer = createSlice({
    name: "ShowTaskAssignEmployeeInDialogBoxSlicer",
    initialState,
    reducers: {
        setTaskAssign: (state, action) => {
            state.taskAssigned = action.payload;
        }
    }
})


export const { setTaskAssign } = ShowTaskAssignEmployeeInDialogBoxSlicer.actions;

export default ShowTaskAssignEmployeeInDialogBoxSlicer.reducer