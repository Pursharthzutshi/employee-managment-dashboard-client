import { createSlice } from "@reduxjs/toolkit"

type genderTypeCountProps = {
    checkInStatus: boolean
}

const initialState: genderTypeCountProps = {
    checkInStatus: false,
}

export const CheckInStatusSlicer = createSlice({
    name: "genderTypeCountPropsSlicer",
    initialState,
    reducers: {
        setChechInStatus: (state, action) => {
            state.checkInStatus = action.payload
        },

    }
})

export const { setChechInStatus } = CheckInStatusSlicer.actions;

export default CheckInStatusSlicer.reducer