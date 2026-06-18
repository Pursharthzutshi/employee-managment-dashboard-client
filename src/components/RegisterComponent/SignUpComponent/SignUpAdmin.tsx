import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { useAppDispatch, useAppSelector } from "../../../ReduxHooks";
import { setUserName, setUserEmailId, setEmailPassword, setEmailPasswordRecheck, setAdminSignUpSecret } from "../../../ReduxSlicers/SignUpSlicer";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import { fetchTotalAdmin } from "../../../GraphQLQueries/CardsDetailsQuery";
import { showAllAdminType } from "../../../Types/InMemoryCacheTypes";

import "./SignUpAdmin.css"

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
  const adminSecretKey = useAppSelector((state) => state.SignUpSlicer.adminSignUpSecret)


  const [showAdminSignUpErrorMessageStatus, setShowAdminSignUpErrorMessageStatus] = useState(false)
  const [showAdminSignUpErrorMessage, setShowAdminSignUpErrorMessage] = useState("")

  const dispatch = useAppDispatch();

  const navigate = useNavigate()


  const signUpForm = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  const [adminSignUp] = useMutation(signUpquery, ({
    onCompleted: (adminSignUpData) => {
      if (adminSignUpData.createAdminSignUp.success === true) {
        navigate("/")
        setShowAdminSignUpErrorMessageStatus(false)
      } else {
        setShowAdminSignUpErrorMessage(adminSignUpData.createAdminSignUp.message)
        setShowAdminSignUpErrorMessageStatus(true)
      }
    },
    update: (cache, data) => {

      const adminArray: showAllAdminType | null = cache.readQuery({ query: fetchTotalAdmin })
      if (adminArray) {
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
    }

  }),
  );

  // if (loading) return <p>Loading</p>

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-sans relative">
            <div className="absolute top-6 left-6">
                <Link to="/" className="text-sm font-semibold text-slate-500 hover:text-indigo-600 transition-colors flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-100">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                    Back to Home
                </Link>
            </div>

            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 z-10">
                <div>
                    <div className="mx-auto w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                        <span className="text-white font-bold text-2xl">E</span>
                    </div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900 tracking-tight">Create Account</h2>
                    <p className="mt-2 text-center text-sm text-slate-500">
                        Sign up for an admin workspace account.
                    </p>
                </div>

                <form onSubmit={signUpForm} className="mt-8 space-y-6">
                    {showAdminSignUpErrorMessageStatus && (
                        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md flex items-start">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-red-700 font-medium">{showAdminSignUpErrorMessage}</p>
                            </div>
                        </div>
                    )}

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Full Name</label>
                            <input 
                                type="text" 
                                required 
                                className="appearance-none block w-full px-4 py-2.5 border border-gray-200 rounded-xl bg-slate-50 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 sm:text-sm transition-all" 
                                placeholder="Admin Name" 
                                onChange={(e) => dispatch(setUserName(e.target.value))} 
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email Address</label>
                            <input 
                                type="email" 
                                required 
                                className="appearance-none block w-full px-4 py-2.5 border border-gray-200 rounded-xl bg-slate-50 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 sm:text-sm transition-all" 
                                placeholder="admin@company.com" 
                                onChange={(e) => dispatch(setUserEmailId(e.target.value))} 
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Password</label>
                                <input 
                                    type="password" 
                                    required 
                                    className="appearance-none block w-full px-4 py-2.5 border border-gray-200 rounded-xl bg-slate-50 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 sm:text-sm transition-all" 
                                    placeholder="••••••••" 
                                    onChange={(e) => dispatch(setEmailPassword(e.target.value))} 
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Confirm</label>
                                <input 
                                    type="password" 
                                    required 
                                    className="appearance-none block w-full px-4 py-2.5 border border-gray-200 rounded-xl bg-slate-50 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 sm:text-sm transition-all" 
                                    placeholder="••••••••" 
                                    onChange={(e) => dispatch(setEmailPasswordRecheck(e.target.value))} 
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Admin Secret Key</label>
                            <input 
                                type="password" 
                                required 
                                className="appearance-none block w-full px-4 py-2.5 border border-gray-200 rounded-xl bg-slate-50 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 sm:text-sm transition-all" 
                                placeholder="Provided by company" 
                                onChange={(e) => dispatch(setAdminSignUpSecret(e.target.value))} 
                            />
                        </div>
                    </div>

                    <div className="pt-2">
                        <button 
                            type="button"
                            onClick={() => {
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
                            }}
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all"
                        >
                            Sign Up
                        </button>
                    </div>

                    <div className="pt-4 flex justify-center border-t border-gray-100">
                        <div className="text-sm">
                            <span className="text-slate-500 mr-2">Already have an account?</span>
                            <Link to="/loginAdmin" className="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors">
                                Log in
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
            
            {/* Decorative background elements */}
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-200/20 blur-3xl"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-200/20 blur-3xl"></div>
            </div>
        </div>
    )
}

export default SignupAdmin;