import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { v4 as uuidv4 } from 'uuid';
import {  insert_employees_leave_data_query, show_logged_in_employees_leave_details_data_query } from "../../../GraphQLQueries/HomeQuery";
import { useAppDispatch, useAppSelector } from "../../../ReduxHooks";
import { employeeLeavesProps, showLoggedInEmployeesLeaveDetailsDataType } from "../../../Types/HomeComponentTypes";
import DateLimit from "../../utils/DateLimit";

import "../EmployeesTakenLeavesComponent/EmployeeApplyLeaveDialogBox.css"

type showEmployeeApplyLeaveDialogBoxProps = {
    showEmployeeApplyLeaveDialogBoxStatus: boolean
    setShowEmployeeApplyLeaveDialogBoxStatus: React.Dispatch<React.SetStateAction<boolean>>
    setShowLeaveApplicationSentStatus: React.Dispatch<React.SetStateAction<boolean>>
}



function EmployeeApplyLeaveDialogBox({ showEmployeeApplyLeaveDialogBoxStatus, setShowEmployeeApplyLeaveDialogBoxStatus, setShowLeaveApplicationSentStatus }: showEmployeeApplyLeaveDialogBoxProps) {
    const savedEmployeeLoggedInUid = useAppSelector((state) => state.LocalStorageSlicer.loggedInSavedUid)

    const Dispatch = useAppDispatch()

    const [showErrorMessage, setShowErrorMessage] = useState("");

    const [showErrorMessageStatus, setShowErrorMessageStatus] = useState(false);

    const [applyForLeave] = useMutation(insert_employees_leave_data_query, {
        onCompleted: (data) => {
            console.log(data)
            const { insertEmployeesLeaveDetails } = data;
            if (insertEmployeesLeaveDetails.success) {
                setShowEmployeeApplyLeaveDialogBoxStatus(false);
                setShowErrorMessageStatus(false);
                setShowLeaveApplicationSentStatus(true);
            } else {
                setShowEmployeeApplyLeaveDialogBoxStatus(true);
                setShowLeaveApplicationSentStatus(false);
                setShowErrorMessageStatus(true);
                setShowErrorMessage(insertEmployeesLeaveDetails.message);
            }
        },
        
        update(cache, { data: { insertEmployeesLeaveDetails } }) {
            const existingData:employeeLeavesProps | null = cache.readQuery({
                query: show_logged_in_employees_leave_details_data_query,
                variables: {
                    showLoggedInEmployeesLeaveDetailsDataParameters: {
                        uid: savedEmployeeLoggedInUid,
                    },
                },
            });
    
            if (existingData) {
                const newLeaveData:showLoggedInEmployeesLeaveDetailsDataType[] = insertEmployeesLeaveDetails.employeeLeaveData;
                cache.writeQuery({
                    query: show_logged_in_employees_leave_details_data_query,
                    data: {
                        showLoggedInEmployeesLeaveDetailsData: [
                            ...existingData?.showLoggedInEmployeesLeaveDetailsData,
                            ...newLeaveData,
                        ],
                    },
                    variables: {
                        showLoggedInEmployeesLeaveDetailsDataParameters: {
                            uid: savedEmployeeLoggedInUid,
                        },
                    },
                });
            }
        },

    });
    const year = new Date().getFullYear();
    const month = String(new Date().getMonth() + 1).padStart(2, '0');
    const day = String(new Date().getDate()).padStart(2, '0');
    const date = `${year}-${month}-${day}`;

    const [applyDate, setApplyDate] = useState("");
    const [leaveReason, setLeaveReason] = useState("");

    const closeEmployeeLeaveDialogBox = () => {
        setShowEmployeeApplyLeaveDialogBoxStatus(false)
    }


    const sendApplyForLeaveData = () => {

        applyForLeave({
            variables: {
                insertEmployeesLeaveDetailsParameters: {
                    uid: savedEmployeeLoggedInUid,
                    date: applyDate,
                    employeeLeaveApplicationUid: uuidv4(),
                    leaveReason: leaveReason,
                    leaveStatus: null,
                    leaveApprovedButtonsStatus: true
                }
            }
        })
    }



    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden relative">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                    <h3 className="font-bold text-lg text-slate-900">Apply for Leave</h3>
                    <button 
                        onClick={closeEmployeeLeaveDialogBox}
                        className="text-slate-400 hover:text-slate-600 transition-colors p-1.5 rounded-full hover:bg-slate-100"
                    >
                        <FaTimes />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 space-y-5">
                    {showErrorMessageStatus && (
                        <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg border border-red-100 font-medium">
                            {showErrorMessage}
                        </div>
                    )}
                    
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">Leave Date</label>
                        <input 
                            min={DateLimit()} 
                            onChange={(e) => { setApplyDate(e.target.value) }} 
                            type="date" 
                            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">Reason for Leave</label>
                        <textarea 
                            onChange={(e) => { setLeaveReason(e.target.value) }} 
                            placeholder="Please provide a brief reason..."
                            rows={4}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all resize-none"
                        ></textarea>
                    </div>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 bg-slate-50 border-t border-gray-100 flex justify-end">
                    <button 
                        onClick={sendApplyForLeaveData} 
                        className="px-5 py-2.5 bg-indigo-600 text-white text-sm font-bold rounded-xl hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-200"
                    >
                        Submit Application
                    </button>
                </div>
            </div>
        </div>
    )
}

export default EmployeeApplyLeaveDialogBox;