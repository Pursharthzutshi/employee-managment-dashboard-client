import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../ReduxHooks";
import { setUserLoggedInEmailId, setUserLoggedInEmailPassword } from "../../../ReduxSlicers/LoginSlicer";
import { gql, useMutation } from "@apollo/client";
import { Link, useNavigate } from "react-router-dom";
import { setAdminStatus, setLoggedInSavedUid, setLogOutStatus, setSavedLoggedInName, setShowLogOutButtonElements } from "../../../ReduxSlicers/LocalStorageSlicer";
import { checkAdminLoggedInAuthQuery } from "../../../GraphQLQueries/LoginQuery";
import { fetchTotalAdmin } from "../../../GraphQLQueries/CardsDetailsQuery";


import "./Login.css"

function LoginAdmin() {


    const userLoggedinEmailId = useAppSelector((state) => state.LoginSlicer.userLoggedinEmailId)
    const userLoggedInEmailPassword = useAppSelector((state) => state.LoginSlicer.userLoggedinPassword)

    const [loginErrorMessageStatus, setLoginErrorMessageStatus] = useState<Boolean>(false);
    const [loginErrorMessage, setLoginErrorMessage] = useState("")

    const Dispatch = useAppDispatch()
    const navigate = useNavigate()

    const [checkAdminLoggedInAuth] = useMutation(checkAdminLoggedInAuthQuery, {
        onCompleted: (adminLoginData) => {
            localStorage.setItem('token', adminLoginData.createAdminLogin.token);

            if (adminLoginData.createAdminLogin.admin === true) {
                Dispatch(setSavedLoggedInName(adminLoginData.createAdminLogin.name))
                Dispatch(setAdminStatus(true))
                navigate("/home")
                Dispatch(setShowLogOutButtonElements(true));
                Dispatch(setLoggedInSavedUid(adminLoginData.createAdminLogin.uid));
                setLoginErrorMessageStatus(false);

            } else {
                setLoginErrorMessageStatus(true);
                setLoginErrorMessage(adminLoginData.createAdminLogin.message);
                // Dispatch(setShowLogOutButtonElements(false));
            }

        },



    }

    );


    const loginForm = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()

    }

    return (
        <div className="login-component">
            <Link className="sign-up-admin-button" to="/">Go Back To Home Page</Link>

            <div className="login-left-sidebar-form-container">
                <p className="font-bold text-center text-lg text-color-blue">LOG IN AS ADMIN</p>
                {/* <ChangeLogInFormButtons /> */}
                <form onSubmit={loginForm} className="login-form">
                    <p className="font-semibold text-lg">Please Fill Up login details</p>

                    <input className="font-semibold" type="text" placeholder="Email Id" onChange={(e) => Dispatch(setUserLoggedInEmailId(e.target.value))} />
                    <input className="font-semibold" type="password" placeholder="Password" onChange={(e) => Dispatch(setUserLoggedInEmailPassword(e.target.value))} />
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
                    <div>
                        <p>
                            {
                                loginErrorMessageStatus && <p className="text-center text-semibold login-error-message">{loginErrorMessage}</p>
                            }
                        </p>
                        <p className="font-semibold text-center text-lg text-color-blue mb-0">OR</p>
                        <p className="font-semibold text-center text-lg text-color-blue mb-2">Create a admin account now</p>
                    </div>
                    <Link to="/signUpAdmin">
                        <button className="sign-up-admin-button">Sign Up</button>
                    </Link>
                    <Link className="font-semibold home-page-navbar-login-button-link" to="/loginEmployee">Login as Employee</Link>

                </form>
            </div>
        </div>
    )
}

export default LoginAdmin;