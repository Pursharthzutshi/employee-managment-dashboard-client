import { useAppDispatch, useAppSelector } from "../../../ReduxHooks";
import { setUserLoggedInEmailId, setUserLoggedInEmailPassword } from "../../../ReduxSlicers/LoginSlicer";
import { useMutation } from "@apollo/client";
import { Link, useNavigate } from "react-router-dom";
import { setAdminStatus, setLoggedInSavedUid, setSavedLoggedInName, setShowLogOutButtonElements } from "../../../ReduxSlicers/LocalStorageSlicer";
import { useEffect, useState } from "react";

import { checkEmployeeLoggedInAuthQuery } from "../../../GraphQLQueries/LoginQuery";
import { employees_leave_details_query } from "../../../GraphQLQueries/HomeQuery";

import "./Login.css"


function LoginUsers() {

    const [setSavedLoggedInEmployeeUid] = useState(localStorage.getItem("loggedInSavedUid"));


    const userLoggedinEmailId = useAppSelector((state) => state.LoginSlicer.userLoggedinEmailId)
    const userLoggedInEmailPassword = useAppSelector((state) => state.LoginSlicer.userLoggedinPassword)

    const [loginErrorMessageStatus, setLoginErrorMessageStatus] = useState<Boolean>(false);
    const [loginErrorMessage, setLoginErrorMessage] = useState("")

    const Dispatch = useAppDispatch()
    const navigate = useNavigate()

    const [checkUserLoggedInAuth] = useMutation(checkEmployeeLoggedInAuthQuery, {
        onCompleted: (userLoginData) => {

            if (userLoginData.createUserLogin.success === true) {
                localStorage.setItem('token', userLoginData.createUserLogin.token);

                navigate("/home")
                Dispatch(setSavedLoggedInName(userLoginData.createUserLogin.name))
                Dispatch(setAdminStatus(false));
                Dispatch(setShowLogOutButtonElements(true));
                Dispatch(setLoggedInSavedUid(userLoginData.createUserLogin.uid));
                setLoginErrorMessageStatus(false);
            } else {
                setLoginErrorMessageStatus(true)
                setLoginErrorMessage(userLoginData.createUserLogin.message)
                // Dispatch(setShowLogOutButtonElements(false));
            }
        },
      
        refetchQueries: [
            {
                query: employees_leave_details_query,
                variables: {
                    fetchLoggedInEmployeeAssignedTaskDetailsParameters: { uid: setSavedLoggedInEmployeeUid }
                },

            }
        ]

        // refetchQueries: [{ query: fetchTotalAdmin }]

    });

    


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