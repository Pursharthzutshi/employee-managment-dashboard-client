import { createSlice } from "@reduxjs/toolkit"

type initialStateProps = {
    employeeName: string,
    employeeEmailId: [string],
    employeeTaskDesc: string,
    employeeDeadLine: string,
    alreadyAddedEmployeeStatus: boolean

}

const initialState: initialStateProps = {
    employeeName: "",
    employeeEmailId: [""],
    employeeTaskDesc: "",
    employeeDeadLine: "",
    alreadyAddedEmployeeStatus: false
}

export const AddEmployeesTaskSlicer = createSlice({
    name: "AddEmployeesTaskSlicer",
    initialState,
    reducers: {
        setEmployeeName: (state, action) => {
            console.log(action.payload)
            state.employeeName = action.payload;
        },
        SetEmployeeEmailId: (state, action) => {
            state.employeeEmailId = action.payload;
        },
        setEmployeeTaskDesc: (state, action) => {
            console.log(action.payload)
            state.employeeTaskDesc = action.payload;

        },
        setEmployeeDeadLine: (state, action) => {
            state.employeeDeadLine = action.payload;
        },
        setAlreadyAddedEmployeeStatus: (state, action) => {
            state.alreadyAddedEmployeeStatus = action.payload
        }
    }
})

export const { setEmployeeName, SetEmployeeEmailId, setEmployeeTaskDesc, setEmployeeDeadLine, setAlreadyAddedEmployeeStatus } = AddEmployeesTaskSlicer.actions;

export default AddEmployeesTaskSlicer.reducer