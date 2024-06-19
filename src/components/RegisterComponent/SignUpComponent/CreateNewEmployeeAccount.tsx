import React, { useEffect } from "react";
import "./SignupUsers.css"
import { gql, useLazyQuery, useMutation } from "@apollo/client";
import { useAppDispatch, useAppSelector } from "../../../ReduxHooks";
import { setUserName, setUserEmailId, setEmailPassword, setEmailPasswordRecheck, setAdminSignUpSecret } from "../../../ReduxSlicers/SignUpSlicer";
import { Link, redirect, useNavigate } from "react-router-dom";
import ChangeSignUpFormButtons from "./ChangeSignUpFormButtons";
import { v4 as uuidv4 } from 'uuid';
import NavBar from "../../NavBarComponent/NavBar";

const signUpquery = gql`
mutation adminSignUp($adminSignUpParameters: adminSignUpTableInput!){
  createAdminSignUp(adminSignUpParameters: $adminSignUpParameters) {
    success
  }
}

`

function SignupAdmin() {

  const adminName = useAppSelector((state) => state.SignUpSlicer.userName)
  const adminEmailId = useAppSelector((state) => state.SignUpSlicer.userEmailId)
  const adminEmailPassword = useAppSelector((state) => state.SignUpSlicer.userEmailPassword)
  const adminEmailPasswordRecheck = useAppSelector((state) => state.SignUpSlicer.userEmailPasswordRecheck)
  const adminSecretKey = useAppSelector((state) => state.SignUpSlicer.userEmailPasswordRecheck)

  const dispatch = useAppDispatch();

  const navigate = useNavigate()


  const signUpForm = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    navigate("/")
  }

  const [adminSignUp, { loading }] = useMutation(signUpquery);

  if (loading) return <p>Loading</p>

  return (
    <div>
      {/* <ChangeSignUpFormButtons/> */}
      <div className="signup-container">

        <div className="signup-box">
          <h3>Sign Up Admin</h3>

          <form onSubmit={signUpForm} className="signup-form">

            <input type="text" placeholder="Admin Name" onChange={(e) => dispatch(setUserName(e.target.value))} />
            <input type="text" placeholder="Admin EmailId" onChange={(e) => dispatch(setUserEmailId(e.target.value))} />
            <input type="password" placeholder="Admin Password" onChange={(e) => dispatch(setEmailPassword(e.target.value))} />
            <input type="password" placeholder="Retype Password" onChange={(e) => dispatch(setEmailPasswordRecheck(e.target.value))} />
            <input type="secret key" placeholder="admin secret provided by company" onChange={(e) => dispatch(setAdminSignUpSecret(e.target.value))} />

            <button type="submit" onClick={() => {
              adminSignUp({
                variables: {
                  adminSignUpParameters: {
                    uid: uuidv4(),
                    name: adminName,
                    emailId: adminEmailId,
                    password: adminEmailPassword,
                    status: false,
                    adminSecretKey: adminSecretKey

                  },
                },
              })
            }}>Admin Sign Up</button>
  
            <Link to="/">Login</Link>

          </form>
        </div>

      </div>

    </div>
  )
}

export default SignupAdmin;