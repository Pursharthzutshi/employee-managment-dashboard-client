import { createSlice } from "@reduxjs/toolkit"

type ShowEmployeesDialogBoxSlicerProps = {
    showEmployeesDialogBox: boolean
    showEmployeesEditDialogBox: boolean
}

const initialState: ShowEmployeesDialogBoxSlicerProps = {
    showEmployeesDialogBox: false,
    showEmployeesEditDialogBox: false
}

export const ShowEmployeesDialogBoxSlicer = createSlice({
    name: "showEmployeesDialogBoxSlicer",
    initialState,
    reducers: {
        setShowEmployeesDialogBox: (state, action) => {
            state.showEmployeesDialogBox = action.payload;
        },
        setShowEmployeesEditDialogBox: (state, action) => {
            state.showEmployeesEditDialogBox = action.payload;
        }


    }
})

export const { setShowEmployeesDialogBox, setShowEmployeesEditDialogBox } = ShowEmployeesDialogBoxSlicer.actions;

export default ShowEmployeesDialogBoxSlicer.reducer