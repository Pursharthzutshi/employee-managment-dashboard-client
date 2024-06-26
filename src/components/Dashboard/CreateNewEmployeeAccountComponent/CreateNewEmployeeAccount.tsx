import React, { useEffect, useState } from "react";
import { gql, useLazyQuery, useMutation } from "@apollo/client";
import { useAppDispatch, useAppSelector } from "../../../ReduxHooks";
import { setUserName, setUserEmailId, setEmailPassword, setEmailPasswordRecheck, setGenderType, setDepartment } from "../../../ReduxSlicers/SignUpSlicer";
import { redirect, useNavigate } from "react-router-dom";
// import ChangeSignUpFormButtons from "./ChangeSignUpFormButtons";
import { v4 as uuidv4 } from 'uuid';
import { setCreateEmployeeNewAccountStatus } from "../../../ReduxSlicers/createEmployeeNewAccountStatusSlicer";

import "./CreateNewEmployeeAccount.css"
import NavBar from "../../NavBarComponent/NavBar";
const show_all_employees_data_query = gql`
query fetchemployeesDataQuery{
   showAllEmployee {
   uid
   name
   emailId
}
}`
const signUpquery = gql`
mutation create($userSignUpParameters: createUserSignUpInput!){
createUserSignUp(userSignUpParameters: $userSignUpParameters) {
success
message
}
}
`

function CreateNewEmployeeAccount() {

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


  const signUpResponseStatus = useAppSelector((state) => state.createEmployeeNewAccountStatusSlicer.createEmployeeNewAccountStatus);

  const createEmployeeNewAccountStatus = useAppSelector((state) => state.createEmployeeNewAccountStatusSlicer.createEmployeeNewAccountStatus)

  const [newEmployeeAccountCreatedStatus, setNewEmployeeAccountCreatedStatus] = useState(false);

  const [createNewEmployeeAccountErrorMessage, setCreateNewEmployeeAccountErrorMessage] = useState("");

  // const [createNewEmployeeAccountErrorMessageStatus,setCreateNewEmployeeAccountErrorMessageStatus] = useState(false);

  const [CreateEmployeeNewAccount, { data: signUpResponseData, loading }] = useMutation(signUpquery, {

    onCompleted: (createNewEmployeeAccountData) => {
      console.log(createEmployeeNewAccountStatus)
      if (createNewEmployeeAccountData.createUserSignUp.success === true) {
        Dispatch(setCreateEmployeeNewAccountStatus(true))
        setNewEmployeeAccountCreatedStatus(true)
      } else if (createNewEmployeeAccountData.createUserSignUp.success === false) {
        setCreateNewEmployeeAccountErrorMessage(createNewEmployeeAccountData.createUserSignUp.message);
        Dispatch(setCreateEmployeeNewAccountStatus(false))
      }
    },
    // update(cache,{data:{createUser}}){
    //   const exisitingUsers = cache.readQuery({query:CreateEmployeeNewAccount})
    //   console.log(exisitingUsers)
    // }

    // update:(cache,{data:{createUserSignUp}})=>{
    //   const existingEmployee:any = cache.readQuery({query:show_all_employees_data_query})
    //   console.log(existingEmployee)
    //   const newList = {
    //     showAllEmployee:[...existingEmployee.showAllEmployee,createUserSignUp]
    //   }

    // cache.writeQuery({
    //   query:signUpquery,
    //   data:newList  
    // })

    // }


  });

  setTimeout(() => {
    setNewEmployeeAccountCreatedStatus(false);
  }, 5000)

  useEffect(() => {
    setNewEmployeeAccountCreatedStatus(false);
    console.log(signUpResponseStatus)
  }, [])

  return (
    <div className="create-new-employee-account-container">
      <div className="create-new-employee-account-box">

        <form onSubmit={signUpForm} className="signup-form">
        <h3 className="employee-account-heading font-semibold text-lg">Create Employees Account</h3>
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
              <input className="form-inputs" type="text" placeholder="Name" onChange={(e) => Dispatch(setUserName(e.target.value))} />

              <strong>EmailId:</strong>
              <input className="form-inputs" type="email" placeholder="EmailId" onChange={(e) => Dispatch(setUserEmailId(e.target.value))} />


              <strong>Password:</strong>
              <input className="form-inputs" type="password" placeholder="Password" onChange={(e) => Dispatch(setEmailPassword(e.target.value))} />

              <strong>Re Check Password:</strong>
              <input className="form-inputs" type="password" placeholder="Retype Password" onChange={(e) => Dispatch(setEmailPasswordRecheck(e.target.value))} />


              <strong>Gender:</strong>
              <div className="gender-cateogry-div">
                <label>Male</label>
                <input onChange={(e) => Dispatch(setGenderType(e.target.value))} className="gender-type" name="gender" value="male" type="radio" />
                <label>Female</label>
                <input onChange={(e) => Dispatch(setGenderType(e.target.value))} className="gender-type" name="gender" value="female" type="radio" />
                <label>Others</label>
                <input onChange={(e) => Dispatch(setGenderType(e.target.value))} className="gender-type" name="gender" value="others" type="radio" />
              </div>

              <strong>Department:</strong>
              <select className="select-department" onChange={(e) => Dispatch(setDepartment(e.target.value))}>
                <option disabled selected>Select Department:</option>
                <option>HR Department</option>
                <option>Software Department</option>
                <option>Testing Department</option>
                <option>UI/UX Design Department</option>
                <option>Sales Department</option>
              </select>

            </div>
          </div>

          <button type="submit" onClick={() => {
            CreateEmployeeNewAccount({
              variables: {
                userSignUpParameters: {
                  uid: uuidv4(),
                  name: userName,
                  emailId: userEmailId,
                  password: userEmailPassword,
                  genderType: genderType,
                  status: false,
                  department: department,
                  employeeOfTheMonth: false
                },
              },
            })

          }}>Create Employee Account</button>

          {createEmployeeNewAccountStatus ? null :
            <p className="signup-error-message">{createNewEmployeeAccountErrorMessage}</p>
          }

        </form>

      </div>
      <div className="sign-up-right-side-image"></div>
   
    </div>
  )
}

export default CreateNewEmployeeAccount;