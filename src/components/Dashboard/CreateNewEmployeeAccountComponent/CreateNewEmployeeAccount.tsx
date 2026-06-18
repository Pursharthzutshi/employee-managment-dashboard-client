import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { useAppDispatch, useAppSelector } from "../../../ReduxHooks";
import { setUserName, setUserEmailId, setEmailPassword, setEmailPasswordRecheck, setGenderType, setDepartment } from "../../../ReduxSlicers/SignUpSlicer";
import { v4 as uuidv4 } from 'uuid';
import { setCreateEmployeeNewAccountStatus } from "../../../ReduxSlicers/createEmployeeNewAccountStatusSlicer";
import { signUpquery } from "../../../GraphQLQueries/CreateNewEmployeeAccountQuery";
import { show_all_employees_data_query } from "../../../GraphQLQueries/ShowAllEmployeesQuery";
import { createNewEmployeeAccountCacheType } from "../../../Types/InMemoryCacheTypes";


import "./CreateNewEmployeeAccount.css"
import "./CreateNewEmployeeAccountResponsive.css"

function CreateNewEmployeeAccount() {

  const userName = useAppSelector((state) => state.SignUpSlicer.userName)
  const userEmailId = useAppSelector((state) => state.SignUpSlicer.userEmailId)
  const userEmailPassword = useAppSelector((state) => state.SignUpSlicer.userEmailPassword)
  const genderType = useAppSelector((state) => state.SignUpSlicer.genderType)
  const department = useAppSelector((state) => state.SignUpSlicer.department)

  const Dispatch = useAppDispatch();

  const signUpForm = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  const createEmployeeNewAccountStatus = useAppSelector((state) => state.createEmployeeNewAccountStatusSlicer.createEmployeeNewAccountStatus)

  const [newEmployeeAccountCreatedStatus, setNewEmployeeAccountCreatedStatus] = useState(false);

  const [createNewEmployeeAccountErrorMessage, setCreateNewEmployeeAccountErrorMessage] = useState("");

  const [CreateEmployeeNewAccount, { data: signUpResponseData, loading }] = useMutation(signUpquery, {

    onCompleted: (createNewEmployeeAccountData) => {
      if (createNewEmployeeAccountData.createUserSignUp.success === true) {

        Dispatch(setCreateEmployeeNewAccountStatus(true))
        setNewEmployeeAccountCreatedStatus(true)
      } else if (createNewEmployeeAccountData.createUserSignUp.success === false) {
        setCreateNewEmployeeAccountErrorMessage(createNewEmployeeAccountData.createUserSignUp.message);
        Dispatch(setCreateEmployeeNewAccountStatus(false))
      }
    },


    update: (cache, { data: { createUserSignUp } }) => {
      if (createUserSignUp.success) {

        const newEmployee = createUserSignUp.AddedSignUpData;
        const existingEmployees: createNewEmployeeAccountCacheType | null = cache.readQuery({ query: show_all_employees_data_query });

        if (existingEmployees?.showAllEmployee) {
          cache.writeQuery({
            query: show_all_employees_data_query,
            data: {
              showAllEmployee: [...existingEmployees.showAllEmployee, newEmployee]
            },
          });

        }
      }
    }


  });

  setTimeout(() => {
    setNewEmployeeAccountCreatedStatus(false);
  }, 5000)

  useEffect(() => {
    setNewEmployeeAccountCreatedStatus(false);
  }, [])

  return (
    <div id="main-page" className="p-6 md:p-8 pt-12 md:pt-16 max-w-[1600px] mx-auto w-full">

        <div className="mt-8 max-w-3xl mx-auto animate-[showDashboardEffectAnimation_0.5s_ease-out]">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                <div className="mb-8 pb-6 border-b border-gray-100">
                    <h3 className="text-2xl font-bold text-slate-800 tracking-tight">Create Employee Account</h3>
                    <p className="text-sm font-medium text-slate-500 mt-1">Add a new member to your organization</p>
                </div>

                {newEmployeeAccountCreatedStatus && (
                    <div className="mb-6 bg-emerald-50 text-emerald-700 px-4 py-3 rounded-xl border border-emerald-100 flex items-center space-x-3">
                        <svg className="w-5 h-5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                        <p className="font-semibold text-sm">A New Account has been created successfully!</p>
                    </div>
                )}

                <form onSubmit={signUpForm} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2.5 block">Name</label>
                            <input className="w-full px-5 py-3.5 bg-slate-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm font-medium transition-all shadow-sm" type="text" placeholder="John Doe" onChange={(e) => Dispatch(setUserName(e.target.value))} />
                        </div>

                        <div>
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2.5 block">Email Address</label>
                            <input className="w-full px-5 py-3.5 bg-slate-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm font-medium transition-all shadow-sm" type="email" placeholder="john@example.com" onChange={(e) => Dispatch(setUserEmailId(e.target.value))} />
                        </div>
                        
                        <div className="md:col-span-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2.5 block">Password</label>
                            <input className="w-full px-5 py-3.5 bg-slate-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm font-medium transition-all shadow-sm" type="password" placeholder="Secure password" onChange={(e) => Dispatch(setEmailPassword(e.target.value))} />
                        </div>

                        <div>
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2.5 block">Gender</label>
                            <div className="flex flex-wrap gap-4 pt-2">
                                <label className="flex items-center space-x-2 cursor-pointer">
                                    <input onChange={(e) => Dispatch(setGenderType(e.target.value))} className="w-4 h-4 text-indigo-600 focus:ring-indigo-500 border-gray-300" name="gender" value="male" type="radio" />
                                    <span className="text-sm font-medium text-slate-700">Male</span>
                                </label>
                                <label className="flex items-center space-x-2 cursor-pointer">
                                    <input onChange={(e) => Dispatch(setGenderType(e.target.value))} className="w-4 h-4 text-indigo-600 focus:ring-indigo-500 border-gray-300" name="gender" value="female" type="radio" />
                                    <span className="text-sm font-medium text-slate-700">Female</span>
                                </label>
                                <label className="flex items-center space-x-2 cursor-pointer">
                                    <input onChange={(e) => Dispatch(setGenderType(e.target.value))} className="w-4 h-4 text-indigo-600 focus:ring-indigo-500 border-gray-300" name="gender" value="others" type="radio" />
                                    <span className="text-sm font-medium text-slate-700">Others</span>
                                </label>
                            </div>
                        </div>

                        <div>
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2.5 block">Department</label>
                            <select className="w-full px-5 py-3.5 bg-slate-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm font-medium transition-all shadow-sm appearance-none cursor-pointer" onChange={(e) => Dispatch(setDepartment(e.target.value))} defaultValue="DEFAULT">
                                <option value="DEFAULT" disabled>Select Department</option>
                                <option value="HR Department">HR Department</option>
                                <option value="Software Department">Software Department</option>
                                <option value="Testing Department">Testing Department</option>
                                <option value="UI/UX Design Department">UI/UX Design Department</option>
                                <option value="Sales Department">Sales Department</option>
                            </select>
                        </div>
                    </div>

                    <div className="pt-8 mt-8 border-t border-gray-100 flex items-center justify-between">
                        {!createEmployeeNewAccountStatus && createNewEmployeeAccountErrorMessage && (
                            <p className="text-red-500 font-medium text-sm flex-1">{createNewEmployeeAccountErrorMessage}</p>
                        )}
                        <div className="flex-1"></div>
                        
                        <button 
                            type="submit" 
                            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 px-8 rounded-xl shadow-sm shadow-indigo-200 transition-all hover:-translate-y-0.5"
                            onClick={() => {
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
                            }}
                        >
                            Create Account
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default CreateNewEmployeeAccount;