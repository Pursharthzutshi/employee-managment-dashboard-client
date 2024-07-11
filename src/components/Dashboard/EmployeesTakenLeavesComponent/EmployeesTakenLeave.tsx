import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../../ReduxHooks";
import { useLazyQuery } from "@apollo/client";
import { show_logged_in_employees_leave_details_data_query } from "../../../GraphQLQueries/HomeQuery";
import NavBar from "../../NavBarComponent/NavBar";


import "../EmployeesTakenLeavesComponent/EmployeeTakenLeave.css"
import EmployeeApplyLeaveDialogBox from "./EmployeeApplyLeaveDialogBox";
import { FaCheck } from "react-icons/fa";
// import EmployeeApplyLeaveDialogBox from "../HomeComponent/EmployeeLeavesComponent/EmployeeApplyLeaveDialogBox";

function EmployeesTakenLeaves() {

    const adminStatus = useAppSelector((state) => state.LocalStorageSlicer.adminStatus)

    const [showLeaveApplicationSentStatus, setShowLeaveApplicationSentStatus] = useState(false);

    const savedEmployeeLoggedInUid = useAppSelector((state) => state.LocalStorageSlicer.loggedInSavedUid);

    const [showEmployeeApplyLeaveDialogBoxStatus, setShowEmployeeApplyLeaveDialogBoxStatus] = useState(false);

    const [showLoggedInEmployeesLeaveDetails, { data: showLoggedInEmployeesLeaveDetailsData, loading }] = useLazyQuery(
        show_logged_in_employees_leave_details_data_query,
        {
            variables: {
                showLoggedInEmployeesLeaveDetailsDataParameters: {
                    uid: savedEmployeeLoggedInUid
                },
            },
            onCompleted: (data) => {
                console.log(data);
            },
        }
    );

    useEffect(() => {
        if (savedEmployeeLoggedInUid) {
            showLoggedInEmployeesLeaveDetails();
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

    return (
        <div id="main-page" className="show-all-employees-component">
            <NavBar />
            {
                showLeaveApplicationSentStatus &&

                <div className="leave-application-sent-msg-div">
                    <FaCheck className="leave-application-sent-msg-icon" />
                    <p className="font-semibold leave-application-sent-msg">Leave Application Sent</p>
                </div>
            }
            {
                showEmployeeApplyLeaveDialogBoxStatus && <EmployeeApplyLeaveDialogBox showEmployeeApplyLeaveDialogBoxStatus={showEmployeeApplyLeaveDialogBoxStatus} setShowEmployeeApplyLeaveDialogBoxStatus={setShowEmployeeApplyLeaveDialogBoxStatus} setShowLeaveApplicationSentStatus={setShowLeaveApplicationSentStatus} />
            }
            {
                adminStatus ? null : <button className="apply-for-the-leave-button" onClick={showEmployeeLeaveDialogBox}>APPLY FOR THE LEAVE</button>
            }
            <p className="font-bold">MY APPLIED LEAVES</p>
            {
               showLoggedInEmployeesLeaveDetailsData &&  showLoggedInEmployeesLeaveDetailsData.showLoggedInEmployeesLeaveDetailsData.length > 0 ?
                    showLoggedInEmployeesLeaveDetailsData.showLoggedInEmployeesLeaveDetailsData && showLoggedInEmployeesLeaveDetailsData.showLoggedInEmployeesLeaveDetailsData.map((val: any) => (
                        <div className="show-logged-in-employees-leave-details" key={val.id}>
                            <br></br>
                            {/* <p className="font-semibold">Name: {val.employeeName}</p> */}
                            <p className="font-semibold">Reason For Leave: {val.leaveReason}</p>
                            <p className="font-semibold">Leave Date Given: {val.date}</p>
                            <div>
                                {
                                    val.leaveStatus !== null ?
                                        <div>
                                            {
                                                val.leaveStatus === true ?
                                                    <p className="font-semibold leave-approved-status">Approved</p>
                                                    :
                                                    <p className="font-semibold leave-rejected-status">Rejected</p>
                                            }
                                        </div>
                                        :
                                        <p className="font-semibold leave-pending-status">Pending</p>

                                }
                            </div>

                        </div>

                    ))
                    :
                    <div className="show-no-task-message">
                        <p className="font-bold">No Leave Taken</p>
                    </div>
            }
        </div>
    );
}

export default EmployeesTakenLeaves;
