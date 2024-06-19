import { createSlice } from "@reduxjs/toolkit"
import { setDepartment } from "./SignUpSlicer"

type genderTypeCountProps = {
    count: number
    maleCount: number
    femaleCount: number
    othersCount: number
    chartData: []
    departmentCount: number
    HRDepartment: number
    softwareDepartment: number
    testingDepartment: number
    UIUXDepartment: number
    salesDepartment: number
}

const initialState: genderTypeCountProps = {
    count: 0,
    maleCount: 0,
    femaleCount: 0,
    othersCount: 0,
    chartData: [],
    departmentCount: 0,
    HRDepartment: 0,
    softwareDepartment: 0,
    testingDepartment: 0,
    UIUXDepartment: 0,
    salesDepartment: 0

}

export const ChangeSignUpFormSlicer = createSlice({
    name: "genderTypeCountPropsSlicer",
    initialState,
    reducers: {
        setGenderTypeCount: (state, action) => {

            if (action.payload.genderType === "male") {
                state.maleCount = state.maleCount + 1
            }

            if (action.payload.genderType === "female") {
                state.femaleCount = state.femaleCount + 1
            }
            if (action.payload.genderType === "others") {
                state.othersCount = state.othersCount + 1
            }

        },
        setDepartmentCount: (state, action) => {


            if (action.payload.department === "HR Department") {
                state.HRDepartment = state.HRDepartment + 1
            }
            else if (action.payload.department === "Software Department") {
                state.softwareDepartment = state.softwareDepartment + 1
            }
            else if (action.payload.department === "Testing Department") {
                state.testingDepartment = state.testingDepartment + 1
            }
            else if (action.payload.department === "UI/UX Design Department") {
                state.UIUXDepartment = state.UIUXDepartment + 1
            }
            else if (action.payload.department === "Sales Department") {
                state.salesDepartment = state.salesDepartment + 1
            }
        }
        ,
        setCount: (state, action) => {
            state.count = action.payload;

        },
        resetCounts: (state) => {
            state.maleCount = 0;
            state.femaleCount = 0;
            state.othersCount = 0;
            state.count = 0;
        },
        resetDepartmentCounts: (state) => {
            state.HRDepartment = 0;
            state.softwareDepartment = 0;
            state.testingDepartment = 0;
            state.UIUXDepartment = 0;
            state.salesDepartment = 0;
        },

        setChartData: (state, action) => {
            console.log(action.payload)
            state.chartData = action.payload
        }
    }
})

export const { setGenderTypeCount, setDepartmentCount, setCount, resetCounts, resetDepartmentCounts, setChartData } = ChangeSignUpFormSlicer.actions;

export default ChangeSignUpFormSlicer.reducer