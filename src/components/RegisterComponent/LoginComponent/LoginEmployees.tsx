import { useAppDispatch, useAppSelector } from "../../../ReduxHooks";
import { setUserLoggedInEmailId, setUserLoggedInEmailPassword } from "../../../ReduxSlicers/LoginSlicer";
import { useMutation } from "@apollo/client";
import { Link, useNavigate } from "react-router-dom";
import { setAdminStatus, setLoggedInSavedUid, setSavedLoggedInName, setShowLogOutButtonElements } from "../../../ReduxSlicers/LocalStorageSlicer";
import { useState } from "react";

import { checkEmployeeLoggedInAuthQuery } from "../../../GraphQLQueries/LoginQuery";
import { employees_leave_details_query } from "../../../GraphQLQueries/HomeQuery";

import "./Login.css"


function LoginUsers() {

    const [savedLoggedInEmployeeUid] = useState(localStorage.getItem("loggedInSavedUid"));


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
                    fetchLoggedInEmployeeAssignedTaskDetailsParameters: { uid: savedLoggedInEmployeeUid }
                },

            }
        ]

        // refetchQueries: [{ query: fetchTotalAdmin }]

    });

    


    const loginForm = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
    }


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
                    <div className="mx-auto w-14 h-14 rounded-xl bg-gradient-to-br from-blue-600 to-blue-500 flex items-center justify-center shadow-lg shadow-blue-500/30">
                        <span className="text-white font-bold text-2xl">E</span>
                    </div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900 tracking-tight">Employee Login</h2>
                    <p className="mt-2 text-center text-sm text-slate-500">
                        Welcome back. Please enter your credentials.
                    </p>
                </div>

                <form onSubmit={loginForm} className="mt-8 space-y-6">
                    {loginErrorMessageStatus && (
                        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md flex items-start">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-red-700 font-medium">{loginErrorMessage}</p>
                            </div>
                        </div>
                    )}

                    <div className="space-y-5">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email Address</label>
                            <input 
                                type="text" 
                                required 
                                className="appearance-none block w-full px-4 py-3 border border-gray-200 rounded-xl bg-slate-50 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 sm:text-sm transition-all" 
                                placeholder="employee@company.com" 
                                onChange={(e) => Dispatch(setUserLoggedInEmailId(e.target.value))} 
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Password</label>
                            <input 
                                type="password" 
                                required 
                                className="appearance-none block w-full px-4 py-3 border border-gray-200 rounded-xl bg-slate-50 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 sm:text-sm transition-all" 
                                placeholder="••••••••" 
                                onChange={(e) => Dispatch(setUserLoggedInEmailPassword(e.target.value))} 
                            />
                        </div>
                    </div>

                    <div>
                        <button 
                            type="button"
                            onClick={() => {
                                checkUserLoggedInAuth({
                                    variables: {
                                        userLoginParameters: {
                                            emailId: userLoggedinEmailId,
                                            password: userLoggedInEmailPassword
                                        }
                                    }
                                })
                            }}
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
                        >
                            Sign In
                        </button>
                    </div>

                    <div className="pt-4 flex items-center justify-between border-t border-gray-100">
                        <div className="text-sm w-full text-center">
                            <Link to="/loginAdmin" className="font-semibold text-slate-500 hover:text-slate-800 transition-colors">
                                Login as Admin &rarr;
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
            
            {/* Decorative background elements */}
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-200/20 blur-3xl"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-200/20 blur-3xl"></div>
            </div>
        </div>
    )
}

export default LoginUsers;