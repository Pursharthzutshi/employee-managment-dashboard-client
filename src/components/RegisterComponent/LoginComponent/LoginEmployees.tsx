import { useAppDispatch, useAppSelector } from "../../../ReduxHooks";
import { setUserLoggedInEmailId, setUserLoggedInEmailPassword } from "../../../ReduxSlicers/LoginSlicer";
import { gql, useMutation } from "@apollo/client";
import { Link, useNavigate } from "react-router-dom";
import ChangeLogInFormButtons from "./ChangeLogInFormButtons";
import { setAdminStatus, setLoggedInSavedUid, setSavedLoggedInName, setShowLogOutButtonElements } from "../../../ReduxSlicers/LocalStorageSlicer";
import { useEffect, useState } from "react";

import "./Login.css"
import { checkEmployeeLoggedInAuthQuery } from "../../../GraphQLQueries/LoginQuery";
import { fetchTotalAdmin } from "../../../GraphQLQueries/CardsDetailsQuery";



function LoginUsers() {

    const userLoggedinEmailId = useAppSelector((state) => state.LoginSlicer.userLoggedinEmailId)
    const userLoggedInEmailPassword = useAppSelector((state) => state.LoginSlicer.userLoggedinPassword)

    const [loginErrorMessageStatus, setLoginErrorMessageStatus] = useState<Boolean>(false);
    const [loginErrorMessage, setLoginErrorMessage] = useState("")

    const Dispatch = useAppDispatch()
    const navigate = useNavigate()

    const [checkUserLoggedInAuth] = useMutation(checkEmployeeLoggedInAuthQuery, {
        onCompleted: (userLoginData) => {

            if (userLoginData.createUserLogin.success === true) {
                console.log(userLoginData)
                navigate("/home")
                Dispatch(setSavedLoggedInName(userLoginData.createUserLogin.name))
                Dispatch(setAdminStatus(false));
                Dispatch(setShowLogOutButtonElements(true));
                Dispatch(setLoggedInSavedUid(userLoginData.createUserLogin.uid));
                setLoginErrorMessageStatus(false);
            } else {
                setLoginErrorMessageStatus(true)
                console.log(userLoginData)
                setLoginErrorMessage(userLoginData.createUserLogin.message)
                // Dispatch(setShowLogOutButtonElements(false));
            }
        },
        onError: (ErrorMessage) => {
            console.log(ErrorMessage);
        },
        // refetchQueries: [{ query: fetchTotalAdmin }]

    });

    useEffect(() => {
        console.log(checkUserLoggedInAuth)
    })


    const loginForm = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
    }


    return (
        <div className="login-component">
            <Link className="sign-up-admin-button" to="/">Go Back To Home Page</Link>
            <p className="font-bold pt-10 text-center text-lg">LOG IN AS EMPLOYEE</p>

            <div className="login-left-sidebar-form-container">

                {/* <ChangeLogInFormButtons /> */}

                <form onSubmit={loginForm} className="login-form">
                    <p className="font-semibold text-lg">Please Fill Up login details</p>

                    <input className="font-semibold" type="text" placeholder="Email Id" onChange={(e) => Dispatch(setUserLoggedInEmailId(e.target.value))} />
                    <input className="font-semibold" type="Password" placeholder="Password" onChange={(e) => Dispatch(setUserLoggedInEmailPassword(e.target.value))} />
                    <button className="sign-up-admin-button" onClick={() => {
                        {
                            checkUserLoggedInAuth({
                                variables: {
                                    userLoginParameters: {
                                        emailId: userLoggedinEmailId,
                                        password: userLoggedInEmailPassword
                                    }
                                }
                            })
                        }
                    }}>Login</button>
                    <Link className="font-semibold home-page-navbar-login-button-link" to="/loginAdmin">Login as Admin</Link>

                    <p>
                        {
                            loginErrorMessageStatus &&
                            <p className="text-center text-semibold login-error-message">{loginErrorMessage}</p>
                        }
                    </p>
                </form>

            </div>
        </div>
    )
}

export default LoginUsers;