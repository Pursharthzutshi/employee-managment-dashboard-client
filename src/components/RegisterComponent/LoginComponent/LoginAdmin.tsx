import React, { useEffect, useState } from "react";
import "./LoginUsers.css"
import "./LoginAdmin.css"
import { useAppDispatch, useAppSelector } from "../../../ReduxHooks";
import { setUserLoggedInEmailId, setUserLoggedInEmailPassword } from "../../../ReduxSlicers/LoginSlicer";
import { gql, useMutation } from "@apollo/client";
import { Link, useNavigate } from "react-router-dom";
import { setAdminStatus, setLoggedInSavedUid, setLogOutStatus, setSavedLoggedInName, setShowLogOutButtonElements } from "../../../ReduxSlicers/LocalStorageSlicer";
import ChangeLogInFormButtons from "./ChangeLogInFormButtons";
import { FaSadCry } from "react-icons/fa";

const checkUserLoggedInAuthQuery = gql`
mutation adminLogin($adminLoginParameters: createAdminLoginInput!){
  createAdminLogin(adminLoginParameters: $adminLoginParameters) {
  uid
    success
    message
    token
    admin
    name
    
  }
}
`

function LoginAdmin() {


    const userLoggedinEmailId = useAppSelector((state) => state.LoginSlicer.userLoggedinEmailId)
    const userLoggedInEmailPassword = useAppSelector((state) => state.LoginSlicer.userLoggedinPassword)

    const [loginErrorMessageStatus, setLoginErrorMessageStatus] = useState<Boolean>(false);
    const [loginErrorMessage, setLoginErrorMessage] = useState("")

    const Dispatch = useAppDispatch()
    // const [] = useState("");
    // const [] = useState()
    const navigate = useNavigate()

    const [checkAdminLoggedInAuth] = useMutation(checkUserLoggedInAuthQuery, {
        onCompleted: (adminLoginData) => {

            console.log(adminLoginData)
            if (adminLoginData.createAdminLogin.admin === true) {
                Dispatch(setSavedLoggedInName(adminLoginData.createAdminLogin.name))
                Dispatch(setAdminStatus(true))
                navigate("/home")
                console.log(adminLoginData.createAdminLogin)
                Dispatch(setShowLogOutButtonElements(true));
                Dispatch(setLoggedInSavedUid(adminLoginData.createAdminLogin.uid));
                setLoginErrorMessageStatus(false);

            } else {
                setLoginErrorMessageStatus(true);
                setLoginErrorMessage(adminLoginData.createAdminLogin.message);
                Dispatch(setShowLogOutButtonElements(false));
            }

        },
    });


    const loginForm = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()

    }

    return (
        <div className="login-component">
            <div className="login-left-sidebar-form-container">

                <form onSubmit={loginForm} className="login-form">
                    <p className="font-bold text-lg">Admin Login In Form</p>
                    <input type="text" placeholder="EmailId" onChange={(e) => Dispatch(setUserLoggedInEmailId(e.target.value))} />
                    <input type="password" placeholder="password" onChange={(e) => Dispatch(setUserLoggedInEmailPassword(e.target.value))} />
                    <button className="login-button" onClick={() => {
                        {
                            checkAdminLoggedInAuth({
                                variables: {
                                    adminLoginParameters: {
                                        emailId: userLoggedinEmailId,
                                        password: userLoggedInEmailPassword
                                    }
                                }
                            })
                        }
                    }}>Login</button>
                    <p>
                        {
                        loginErrorMessageStatus &&
                            <p>{loginErrorMessage}</p>
                        }
                    </p>
                    <p>OR</p>
                    <p>Create a admin account now</p>
                    <Link to="/signUpAdmin">
                        <button className="sign-up-admin-button">Sign Up</button>
                    </Link>

                </form>
            </div>
        </div>
    )
}

export default LoginAdmin;