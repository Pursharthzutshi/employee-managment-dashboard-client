import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { v4 as uuidv4 } from 'uuid';
import { employees_leave_details_query, insert_employees_leave_data_query, show_logged_in_employees_leave_details_data_query } from "../../../GraphQLQueries/HomeQuery";
import { useAppSelector } from "../../../ReduxHooks";

import "../EmployeesTakenLeavesComponent/EmployeeApplyLeaveDialogBox.css"

type showEmployeeApplyLeaveDialogBoxProps = {
    showEmployeeApplyLeaveDialogBoxStatus: boolean
    setShowEmployeeApplyLeaveDialogBoxStatus: React.Dispatch<React.SetStateAction<boolean>>
    setShowLeaveApplicationSentStatus:React.Dispatch<React.SetStateAction<boolean>>
}

function EmployeeApplyLeaveDialogBox({ showEmployeeApplyLeaveDialogBoxStatus, setShowEmployeeApplyLeaveDialogBoxStatus,setShowLeaveApplicationSentStatus }: showEmployeeApplyLeaveDialogBoxProps) {


    const [showErrorMessage,setShowErrorMessage] = useState("");

    const [showErrorMessageStatus,setShowErrorMessageStatus] = useState(false);

    const [applyForLeave] = useMutation(insert_employees_leave_data_query, {
        onCompleted: (applyForLeaveData) => {
            if (applyForLeaveData.insertEmployeesLeaveDetails.success === true) {
                setShowEmployeeApplyLeaveDialogBoxStatus(false)
                setShowErrorMessageStatus(false)
                setShowLeaveApplicationSentStatus(true);
            } else {
                setShowEmployeeApplyLeaveDialogBoxStatus(true)
                setShowLeaveApplicationSentStatus(false)
                setShowErrorMessageStatus(true)
                setShowErrorMessage(applyForLeaveData.insertEmployeesLeaveDetails.message)
            }
        },
        update: (cache) => {
            const fetchLeaveDetailsData = cache.readQuery({ query: show_logged_in_employees_leave_details_data_query })
            console.log(fetchLeaveDetailsData)
        }
    });

    const [applyDate, setApplyDate] = useState("");
    const [leaveReason, setLeaveReason] = useState("");

    const closeEmployeeLeaveDialogBox = () => {
        setShowEmployeeApplyLeaveDialogBoxStatus(false)
    }

    const savedEmployeeLoggedInUid = useAppSelector((state) => state.LocalStorageSlicer.loggedInSavedUid)

    const sendApplyForLeaveData = () => {

        applyForLeave({
            variables: {
                insertEmployeesLeaveDetailsParameters: {
                    uid: savedEmployeeLoggedInUid,
                    date: applyDate,
                    employeeLeaveApplicationUid: uuidv4(),
                    leaveReason: leaveReason,
                    leaveStatus: null
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
                <input onChange={(e) => { setApplyDate(e.target.value) }} type="date" />
                <textarea onChange={(e) => { setLeaveReason(e.target.value) }} placeholder="Reason"></textarea>
            
                <button onClick={sendApplyForLeaveData} className="font-semibold">APPLY FOR THE LEAVE</button>
                {showErrorMessageStatus && <p className="error-message"> {showErrorMessage} </p>}
            </div>
        </div>
    )
}

export default EmployeeApplyLeaveDialogBox;