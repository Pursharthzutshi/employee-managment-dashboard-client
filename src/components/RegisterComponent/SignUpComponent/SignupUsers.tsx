import React, { useEffect, useState } from "react";
import "./SignupUsers.css"
import { gql, useLazyQuery, useMutation } from "@apollo/client";
import { useAppDispatch, useAppSelector } from "../../../ReduxHooks";
import { setUserName, setUserEmailId, setEmailPassword, setEmailPasswordRecheck, setGenderType, setDepartment } from "../../../ReduxSlicers/SignUpSlicer";
import { redirect, useNavigate } from "react-router-dom";
import ChangeSignUpFormButtons from "./ChangeSignUpFormButtons";
import { v4 as uuidv4 } from 'uuid';
import { SetEmployeeEmailId } from "../../../ReduxSlicers/AddEmployeesTaskSlicer";
import NavBar from "../../NavBarComponent/NavBar";
import { setCreateEmployeeNewAccountStatus } from "../../../ReduxSlicers/createEmployeeNewAccountStatusSlicer";

const signUpquery = gql`
mutation create($userSignUpParameters: createUserSignUpInput!){
createUserSignUp(userSignUpParameters: $userSignUpParameters) {
success
message
}
}
`

function SignupUsers() {

  const userName = useAppSelector((state) => state.SignUpSlicer.userName)
  const userEmailId = useAppSelector((state) => state.SignUpSlicer.userEmailId)
  const userEmailPassword = useAppSelector((state) => state.SignUpSlicer.userEmailPassword)
  const userEmailPasswordRecheck = useAppSelector((state) => state.SignUpSlicer.userEmailPasswordRecheck)
  const genderType = useAppSelector((state) => state.SignUpSlicer.genderType)
  const department = useAppSelector((state) => state.SignUpSlicer.department)

  const Dispatch = useAppDispatch();

  const navigate = useNavigate()


  const signUpForm = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    // navigate("/")
  }

  useEffect(() => {

  })

  const createEmployeeNewAccountStatus = useAppSelector((state) => state.createEmployeeNewAccountStatusSlicer.createEmployeeNewAccountStatus);

  const [newEmployeeAccountCreatedStatus, setNewEmployeeAccountCreatedStatus] = useState(false);

  const [userSignUp, { data: signUpResponseData, loading }] = useMutation(signUpquery, {



    onCompleted: (data) => {
      console.log(data.createUserSignUp.success)
      if (data.createUserSignUp.success === true) {
        Dispatch(setCreateEmployeeNewAccountStatus(true))
        setNewEmployeeAccountCreatedStatus(true)
      }
    }
  });

  setTimeout(() => {
    setNewEmployeeAccountCreatedStatus(false);
  }, 3000)
  useEffect(() => {
    setNewEmployeeAccountCreatedStatus(false);

    console.log(createEmployeeNewAccountStatus)
  }, [])

  return (
    <div>
      {/* <ChangeSignUpFormButtons /> */}

      <div className="signup-container">

        <div className="signup-box">
          <h3 className="employee-account-heading">Create Employees Account</h3>

          <form onSubmit={signUpForm} className="signup-form">
          {
                  newEmployeeAccountCreatedStatus ?
                    <div className="new-employee-added-div">

                      <h3>A New Account has been created</h3>

                    </div>
                    : null
                }
            <div className="inputs-labels-container">
              {/* <div className="labels-div">

              </div> */}

              <div className="inputs-div">
            

                <strong>Name:</strong>

                <input type="text" placeholder="Name" onChange={(e) => Dispatch(setUserName(e.target.value))} />
                <strong>Password:</strong>

                <input type="text" placeholder="EmailId" onChange={(e) => Dispatch(setUserEmailId(e.target.value))} />
                <strong>EmailId:</strong>

                <input type="password" placeholder="Password" onChange={(e) => Dispatch(setEmailPassword(e.target.value))} />
                <strong>ReCheck Password:</strong>

                <input type="category" placeholder="Retype Password" onChange={(e) => Dispatch(setEmailPasswordRecheck(e.target.value))} />


                <strong>Gender:</strong>
                <div className="gender-cateogry-div">
                  <input onChange={(e) => Dispatch(setGenderType(e.target.value))} className="gender-type" name="gender" value="male" type="radio" />
                  <label>Male</label>
                  <input onChange={(e) => Dispatch(setGenderType(e.target.value))} className="gender-type" name="gender" value="female" type="radio" />
                  <label>Female</label>
                  <input onChange={(e) => Dispatch(setGenderType(e.target.value))} className="gender-type" name="gender" value="others" type="radio" />
                  <label>Others</label>
                </div>

                <strong>Department:</strong>
                <select className="select-department" onChange={(e) => Dispatch(setDepartment(e.target.value))}>
                  <option>HR Department</option>
                  <option>Software Department</option>
                  <option>Testing Department</option>
                  <option>UI/UX Design Department</option>
                  <option>Sales Department</option>
                </select>

              </div>
            </div>

            <button type="submit" onClick={() => {
              userSignUp({
                variables: {
                  userSignUpParameters: {
                    uid: uuidv4(),
                    name: userName,
                    emailId: userEmailId,
                    password: userEmailPassword,
                    genderType: genderType,
                    status: false,
                    department: department
                  },
                },
              })

            }}>Create Employee Account</button>
            {/* {
              d
            } */}

          </form>
        </div>

        <div className="sign-up-right-side-image">

        </div>

      </div>

    </div>
  )
}

export default SignupUsers;