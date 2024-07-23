import { createSlice } from "@reduxjs/toolkit"

type createEmployeeNewAccountStatusSlicerProps = {
    createEmployeeNewAccountStatus: boolean
}

const initialState:createEmployeeNewAccountStatusSlicerProps = {
    createEmployeeNewAccountStatus: false
}

export const createEmployeeNewAccountStatusSlicer = createSlice({
    name: "createEmployeeNewAccountStatus",
    initialState,
    reducers: {
       setCreateEmployeeNewAccountStatus: (state, action) => {
            state.createEmployeeNewAccountStatus = action.payload;
        },
    }
})

export const { setCreateEmployeeNewAccountStatus } = createEmployeeNewAccountStatusSlicer.actions;

export default createEmployeeNewAccountStatusSlicer.reducer