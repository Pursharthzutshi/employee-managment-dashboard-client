import { createSlice } from "@reduxjs/toolkit"

type loginSlicerProps = {
    userLoggedinEmailId:String
    userLoggedinPassword:String
}

const initialState:loginSlicerProps = {
    userLoggedinEmailId: "",
    userLoggedinPassword: "",

}

export const LoginSlicer = createSlice({
    name: "loginSlicer",
    initialState,
    reducers: {
        setUserLoggedInEmailId: (state, action) => {
            state.userLoggedinEmailId = action.payload;
        },
        setUserLoggedInEmailPassword: (state, action) => {
            state.userLoggedinPassword = action.payload;
        },

    }
})

export const { setUserLoggedInEmailId, setUserLoggedInEmailPassword } = LoginSlicer.actions;

export default LoginSlicer.reducer