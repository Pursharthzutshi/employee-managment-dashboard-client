import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../ReduxHooks";
import { setChangeLoginForm, setChangeSignUpForm } from "../../../ReduxSlicers/ChangeSignUpFormSlicer";

import "../LoginComponent/ChangeLogInFormButtons.css"

function ChangeLogInFormButtons() {

    const Dispatch = useAppDispatch()

    // const [showUserSignUpForm, setShowUserSignUpForm] = useState<boolean>(false);
    // const [showAdminSignUpForm, setShowAdminSignUpForm] = useState<boolean>(false);

    const toggleSignUpForm = (signUpFormCategory: string) => {
        if (signUpFormCategory === "userSignUp") {
            Dispatch(setChangeLoginForm(true));
        } else {
            Dispatch(setChangeLoginForm(false));
        }
    }

    const categorySignUpForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
    }
    return (
        <div>
            <form className="login-toggle-form" onSubmit={categorySignUpForm}>
                <label className="font-semibold">Admin Log In</label>
                <input name="login-radio" type="checkbox" value="userSignUp" onChange={(e: React.ChangeEvent<HTMLInputElement>) => { toggleSignUpForm(e.target.value) }} />
                <label className="font-semibold">Employee Log in</label>
                <input name="login-radio" type="checkbox" value="adminSignUp" onChange={(e: React.ChangeEvent<HTMLInputElement>) => { toggleSignUpForm(e.target.value) }} />
            </form>
        </div>
    )
}

export default ChangeLogInFormButtons;