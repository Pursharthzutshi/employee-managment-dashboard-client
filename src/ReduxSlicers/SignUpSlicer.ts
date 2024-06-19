import { createSlice } from "@reduxjs/toolkit"

type SignUpSlicerProps = {
    userName: String
    userEmailId: String
    userEmailPassword: String
    userEmailPasswordRecheck: String
    genderType: String
    adminSignUpSecret: String
    department: String
}

const initialState: SignUpSlicerProps = {
    userName: "",
    userEmailId: "",
    userEmailPassword: "",
    userEmailPasswordRecheck: "",
    genderType: "",
    adminSignUpSecret: "",
    department: ""
}

export const SignUpSlicer = createSlice({
    name: "SignUpSlicer",
    initialState,
    reducers: {
        setUserName: (state, action) => {
            state.userName = action.payload;
        },
        setUserEmailId: (state, action) => {
            state.userEmailId = action.payload;
        },

        setEmailPassword: (state, action) => {
            state.userEmailPassword = action.payload;
        },
        setEmailPasswordRecheck: (state, action) => {
            state.userEmailPasswordRecheck = action.payload;
        },

        setGenderType: (state, action) => {
            console.log(action.payload)
            state.genderType = action.payload;
        },
        setAdminSignUpSecret: (state, action) => {
            console.log(action.payload);
        },
        setDepartment: (state, action) => {
            console.log(action.payload)
            state.department = action.payload;
        }

    }
})
export const { setUserName, setUserEmailId, setEmailPassword, setEmailPasswordRecheck, setGenderType, setAdminSignUpSecret, setDepartment } = SignUpSlicer.actions;

export default SignUpSlicer.reducer