import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../../ReduxHooks";
import { useLazyQuery } from "@apollo/client";
import { show_logged_in_employees_leave_details_data_query } from "../../../GraphQLQueries/HomeQuery";

import EmployeeApplyLeaveDialogBox from "./EmployeeApplyLeaveDialogBox";
import { FaCheck } from "react-icons/fa";
import { employeeLeavesProps } from "../../../Types/HomeComponentTypes";

import "../EmployeesTakenLeavesComponent/EmployeeTakenLeave.css"

function EmployeesTakenLeaves() {

    const adminStatus = useAppSelector((state) => state.LocalStorageSlicer.adminStatus)

    const [showLeaveApplicationSentStatus, setShowLeaveApplicationSentStatus] = useState(false);

    const savedEmployeeLoggedInUid = useAppSelector((state) => state.LocalStorageSlicer.loggedInSavedUid);

    const [showEmployeeApplyLeaveDialogBoxStatus, setShowEmployeeApplyLeaveDialogBoxStatus] = useState(false);

    const [showLoggedInEmployeesLeaveDetails, { data: showLoggedInEmployeesLeaveDetailsData, loading, refetch }] = useLazyQuery(
        show_logged_in_employees_leave_details_data_query,

        {
            variables: {
                showLoggedInEmployeesLeaveDetailsDataParameters: {
                    uid: savedEmployeeLoggedInUid
                },

            },

        },

    );

    useEffect(() => {
        if (savedEmployeeLoggedInUid) {
            console.log(showLoggedInEmployeesLeaveDetailsData)
            showLoggedInEmployeesLeaveDetails();
            refetch()
        }
    }, [savedEmployeeLoggedInUid, showLoggedInEmployeesLeaveDetails]);

    const showEmployeeLeaveDialogBox = () => {
        setShowEmployeeApplyLeaveDialogBoxStatus(true);
    }

    useEffect(() => {
        setTimeout(() => {
            setShowLeaveApplicationSentStatus(false);
        }, 3000)
    })

    if (loading) return <div>Loading...</div>

    return (
        <div id="main-page" className="flex flex-col h-screen bg-slate-50">

            
            <div className="flex-1 overflow-auto px-8 pt-12 pb-10">
                {
                    showLeaveApplicationSentStatus &&
                    <div className="mb-6 bg-green-50 border border-green-200 p-4 rounded-xl flex items-center shadow-sm">
                        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                            <FaCheck className="text-green-600 text-sm" />
                        </div>
                        <p className="font-semibold text-green-800">Leave Application Sent Successfully</p>
                    </div>
                }

                {
                    showEmployeeApplyLeaveDialogBoxStatus && <EmployeeApplyLeaveDialogBox showEmployeeApplyLeaveDialogBoxStatus={showEmployeeApplyLeaveDialogBoxStatus} setShowEmployeeApplyLeaveDialogBoxStatus={setShowEmployeeApplyLeaveDialogBoxStatus} setShowLeaveApplicationSentStatus={setShowLeaveApplicationSentStatus} />
                }

                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">My Applied Leaves</h2>
                        <p className="text-sm text-slate-500 mt-1">Track the status of your leave requests</p>
                    </div>
                    {
                        !adminStatus && (
                            <button 
                                onClick={showEmployeeLeaveDialogBox}
                                className="px-5 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-200 flex items-center gap-2"
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                                Apply For Leave
                            </button>
                        )
                    }
                </div>

                {
                    showLoggedInEmployeesLeaveDetailsData && showLoggedInEmployeesLeaveDetailsData.showLoggedInEmployeesLeaveDetailsData.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {showLoggedInEmployeesLeaveDetailsData.showLoggedInEmployeesLeaveDetailsData.map((val: employeeLeavesProps) => (
                                <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow relative" key={val.id}>
                                    
                                    <div className="absolute top-6 right-6">
                                        {
                                            val.leaveStatus === null ? (
                                                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-yellow-100 text-yellow-800">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 mr-1.5"></span>
                                                    Pending
                                                </span>
                                            ) : val.leaveStatus === true ? (
                                                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5"></span>
                                                    Approved
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mr-1.5"></span>
                                                    Rejected
                                                </span>
                                            )
                                        }
                                    </div>

                                    <div className="mt-2 mb-4">
                                        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Leave Date</div>
                                        <div className="text-slate-900 font-semibold">{val.date}</div>
                                    </div>

                                    <div>
                                        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Reason</div>
                                        <div className="text-slate-700 text-sm bg-slate-50 p-3 rounded-lg border border-gray-50">{val.leaveReason}</div>
                                    </div>

                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white border border-gray-100 border-dashed rounded-2xl p-12 text-center flex flex-col items-center justify-center shadow-sm">
                            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                                <svg className="w-8 h-8 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-1">No Leaves Found</h3>
                            <p className="text-slate-500 text-sm">You haven't applied for any leaves yet.</p>
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default EmployeesTakenLeaves;
