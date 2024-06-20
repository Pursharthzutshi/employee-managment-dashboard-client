import React, { useState } from "react";
import SignupUsers from "./SignupUsers";
import SignupAdmin from "./SignUpAdmin";
import { useAppDispatch, useAppSelector } from "../../../ReduxHooks";
import { setChangeSignUpForm } from "../../../ReduxSlicers/ChangeSignUpFormSlicer";

function ChangeSignUpFormButtons() {


    const Dispatch = useAppDispatch()

    const [showUserSignUpForm, setShowUserSignUpForm] = useState<boolean>(false);
    const [showAdminSignUpForm, setShowAdminSignUpForm] = useState<boolean>(false);

    const toggleSignUpForm = (signUpFormCategory: string) => {
        if (signUpFormCategory === "userSignUp") {
            // setShowUserSignUpForm(true)
            // setShowAdminSignUpForm(false)
            Dispatch(setChangeSignUpForm(true));
        } else {
            // setShowUserSignUpForm(false)
            // setShowAdminSignUpForm(true)

            Dispatch(setChangeSignUpForm(false));
        }
    }

    const categorySignUpForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
    }
    return (
        <div>
            <form onSubmit={categorySignUpForm}>
                <label>User sign up</label>
                <input name="sign-up-radio" type="checkbox" value="userSignUp" onChange={(e: React.ChangeEvent<HTMLInputElement>) => { toggleSignUpForm(e.target.value) }} />
                <label>Admin sign up</label>
                <input name="sign-up-radio" type="checkbox" value="adminSignUp" onChange={(e: React.ChangeEvent<HTMLInputElement>) => { toggleSignUpForm(e.target.value) }} />
            </form>
            {/* {showUserSignUpForm && <SignupUsers/>}
            {showAdminSignUpForm && <SignupAdmin/>} */}
        </div>
    )
}

export default ChangeSignUpFormButtons;