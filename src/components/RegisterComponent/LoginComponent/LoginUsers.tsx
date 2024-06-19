import "./LoginUsers.css"
import { useAppDispatch, useAppSelector } from "../../../ReduxHooks";
import { setUserLoggedInEmailId, setUserLoggedInEmailPassword } from "../../../ReduxSlicers/LoginSlicer";
import { gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import ChangeLogInFormButtons from "./ChangeLogInFormButtons";
import { setAdminStatus, setLoggedInSavedUid, setSavedLoggedInName, setShowLogOutButtonElements } from "../../../ReduxSlicers/LocalStorageSlicer";
import { useState } from "react";

const checkUserLoggedInAuthQuery = gql`
mutation userLogin($userLoginParameters: createLoginInput!){
  createUserLogin(userLoginParameters: $userLoginParameters) {
  uid
  success
  message
  token
  }
}
`

function LoginUsers() {

    const userLoggedinEmailId = useAppSelector((state) => state.LoginSlicer.userLoggedinEmailId)
    const userLoggedInEmailPassword = useAppSelector((state) => state.LoginSlicer.userLoggedinPassword)

    const [loginErrorMessageStatus,setLoginErrorMessageStatus] = useState<Boolean>(false);
    const [loginErrorMessage,setLoginErrorMessage] = useState("")

    const Dispatch = useAppDispatch()
    // const [] = useState("");
    // const [] = useState()
    const navigate = useNavigate()

    const [checkUserLoggedInAuth] = useMutation(checkUserLoggedInAuthQuery, {
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
                setLoginErrorMessage(userLoginData.createUserLogin.message)
                Dispatch(setShowLogOutButtonElements(false));
            }
        },
        onError:(ErrorMessage)=>{
            console.log(ErrorMessage);
        }
    });



    const loginForm = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
    }


    return (
        <div className="login-component">
         
            <ChangeLogInFormButtons />
            <div className="login-left-sidebar-form-container">

            <form onSubmit={loginForm} className="login-form">
                <h3>User Login In Form</h3>

                <input type="text" placeholder="EmailId" onChange={(e) => Dispatch(setUserLoggedInEmailId(e.target.value))} />
                <input type="password" placeholder="password" onChange={(e) => Dispatch(setUserLoggedInEmailPassword(e.target.value))} />
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
                   <p>
                {  loginErrorMessageStatus &&
                <p>{loginErrorMessage}</p>
                }
            </p>
            </form>
            
            </div>
        </div>
    )
}

export default LoginUsers;