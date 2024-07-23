import { createSlice } from "@reduxjs/toolkit"

type localStorageSlicerProps = {
    adminStatus: string | null
    loggedInSavedUid: string | null
    logOutStatus: string | null
    showLogOutButtonElements: string | null
    showLoggedInComponents: string | null
    savedLoggedInName: string | null
}

const initialState: localStorageSlicerProps = {
    adminStatus: JSON.parse(localStorage.getItem("adminStatus") || "false"),
    loggedInSavedUid: localStorage.getItem("loggedInSavedUid"),
    logOutStatus: localStorage.getItem("logOutButton"),
    showLogOutButtonElements: localStorage.getItem("logOutButton"),
    showLoggedInComponents: localStorage.getItem("showLoggedInComponents"),
    savedLoggedInName: localStorage.getItem("savedLoggedInName")
}

export const LocalStorageSlicer = createSlice({
    name: "LocalStorageSlicer",
    initialState,
    reducers: {

        setAdminStatus: (state, action) => {
            state.adminStatus = action.payload
            localStorage.setItem("adminStatus", action.payload);
        },
        setLoggedInSavedUid: (state, action) => {
            state.loggedInSavedUid = action.payload;

            const savedAdminStatus = JSON.parse(localStorage.getItem("adminStatus") || "false")

            // if (savedAdminStatus) {
            localStorage.setItem(savedAdminStatus ? "adminLoggedInSavedUid" : "loggedInSavedUid", action.payload);
            // }
        },

        setShowLogOutButtonElements: (state, action) => {
            state.showLogOutButtonElements = action.payload;
            localStorage.setItem("logOutButton", action.payload);
        },

        setLogOutStatus: (state, action) => {
     
            if (localStorage.getItem("adminLoggedInSavedUid")) {
                localStorage.removeItem("adminLoggedInSavedUid");
            } else {
                localStorage.removeItem("loggedInSavedUid");
            }
            localStorage.removeItem("logOutButton")
            localStorage.removeItem("showLoggedInComponents");
            localStorage.removeItem("adminStatus");
            localStorage.removeItem("savedLoggedInName");

            state.logOutStatus = action.payload

        },
        setSavedLoggedInName: (state, action) => {
            state.savedLoggedInName = action.payload;
            localStorage.setItem("savedLoggedInName", action.payload);
        }
        // setShowLoggedInComponents: (state, action) => {
        //     state.showLoggedInComponents = action.payload
        //     localStorage.setItem("showLoggedInComponents", action.payload);
        // }
    }
})

export const { setLoggedInSavedUid, setShowLogOutButtonElements, setLogOutStatus, setAdminStatus, setSavedLoggedInName } = LocalStorageSlicer.actions;

export default LocalStorageSlicer.reducer