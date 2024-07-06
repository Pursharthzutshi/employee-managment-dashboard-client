import React, { useEffect, useState } from "react";
import "./SignUpAdmin.css"
import { gql, useLazyQuery, useMutation } from "@apollo/client";
import { useAppDispatch, useAppSelector } from "../../../ReduxHooks";
import { setUserName, setUserEmailId, setEmailPassword, setEmailPasswordRecheck, setAdminSignUpSecret } from "../../../ReduxSlicers/SignUpSlicer";
import { Link, redirect, useNavigate } from "react-router-dom";
import ChangeSignUpFormButtons from "./ChangeSignUpFormButtons";
import { v4 as uuidv4 } from 'uuid';
import NavBar from "../../NavBarComponent/NavBar";
import { fetchTotalAdmin } from "../../../GraphQLQueries/CardsDetailsQuery";

const signUpquery = gql`
mutation adminSignUp($adminSignUpParameters: adminSignUpTableInput!){
  createAdminSignUp(adminSignUpParameters: $adminSignUpParameters) {
    success
    message
  }
}

`

function SignupAdmin() {

  const adminName = useAppSelector((state) => state.SignUpSlicer.userName)
  const adminEmailId = useAppSelector((state) => state.SignUpSlicer.userEmailId)
  const adminEmailPassword = useAppSelector((state) => state.SignUpSlicer.userEmailPassword)
  const adminEmailPasswordRecheck = useAppSelector((state) => state.SignUpSlicer.userEmailPasswordRecheck)
  const adminSecretKey = useAppSelector((state) => state.SignUpSlicer.adminSignUpSecret)


  const [showAdminSignUpErrorMessageStatus, setShowAdminSignUpErrorMessageStatus] = useState(false)
  const [showAdminSignUpErrorMessage, setShowAdminSignUpErrorMessage] = useState("")

  const dispatch = useAppDispatch();

  const navigate = useNavigate()


  const signUpForm = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  const [adminSignUp, { loading }] = useMutation(signUpquery, ({
    onCompleted: (adminSignUpData) => {
      console.log(adminSignUpData)
      if (adminSignUpData.createAdminSignUp.success === true) {
        navigate("/")
        setShowAdminSignUpErrorMessageStatus(false)
      } else {
        setShowAdminSignUpErrorMessage(adminSignUpData.createAdminSignUp.message)
        setShowAdminSignUpErrorMessageStatus(true)
      }
    },
    update: (cache, data) => {

      const adminArray: any = cache.readQuery({ query: fetchTotalAdmin })
      const totalArrayLength = adminArray.showAllAdmin.length + 1
      cache.writeQuery({
        query: fetchTotalAdmin,
        data: {
          showAllAdmin: {
            length: totalArrayLength
          }
        }
      })
    }

  }),
  );

  useEffect(() => {
    console.log(showAdminSignUpErrorMessage)
  })
  // if (loading) return <p>Loading</p>

  return (
    <div className="signup-component">
      {/* <ChangeSignUpFormButtons/> */}
      <div className="signup-container">


        <div className="signup-box">
          <p className="font-bold text-lg">Sign Up Admin</p>

          <form onSubmit={signUpForm} className="signup-form">

            <input type="text" placeholder="Admin Name" onChange={(e) => dispatch(setUserName(e.target.value))} />
            <input type="text" placeholder="Admin EmailId" onChange={(e) => dispatch(setUserEmailId(e.target.value))} />
            <input type="password" placeholder="Admin Password" onChange={(e) => dispatch(setEmailPassword(e.target.value))} />
            <input type="password" placeholder="Retype Password" onChange={(e) => dispatch(setEmailPasswordRecheck(e.target.value))} />
            <input type="secret key" placeholder="admin secret provided by company" onChange={(e) => dispatch(setAdminSignUpSecret(e.target.value))} />

            <div className="admin-sign-up-button-div">

              <button className="admin-sign-up-button" type="submit" onClick={() => {
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
              <p>OR</p>
              <Link className="navigate-login-page-button-link" to="/loginAdmin">Go To Login Page</Link>
            </div>
            {
              showAdminSignUpErrorMessageStatus && <p className="admin-sign-up-error-message">{showAdminSignUpErrorMessage}</p>
            }
          </form>
        </div>

      </div>

    </div>
  )
}

export default SignupAdmin;