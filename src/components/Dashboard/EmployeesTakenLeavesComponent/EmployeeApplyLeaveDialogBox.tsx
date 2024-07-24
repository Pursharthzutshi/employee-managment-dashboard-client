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
        <div className="show-employee-apply-leave-dialog-box">

            <div className="close-button-icon-div">
                <FaTimes className="close-button-icon" onClick={closeEmployeeLeaveDialogBox}></FaTimes>
            </div>
            <p className="font-bold leave-apply-heading">Leave Apply</p>
            <br></br>
            <div className="employee-apply-leave-dialog-box-form">
                <input min={DateLimit()} onChange={(e) => { setApplyDate(e.target.value) }} data-date-format="DD MMMM YYYY" type="date" placeholder="deadLine" className="calendar" />
                <textarea onChange={(e) => { setLeaveReason(e.target.value) }} placeholder="Reason"></textarea>

                <button onClick={sendApplyForLeaveData} className="font-semibold">APPLY FOR THE LEAVE</button>
                {showErrorMessageStatus && <p className="error-message"> {showErrorMessage} </p>}
            </div>
        </div>
    )
}

export default EmployeeApplyLeaveDialogBox;