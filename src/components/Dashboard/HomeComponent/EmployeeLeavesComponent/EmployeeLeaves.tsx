import react, { useEffect, useState } from "react"
import { useMutation, useQuery } from "@apollo/client";
import { employees_leave_details_query, update_employee_leave_status } from "../../../../GraphQLQueries/HomeQuery";
import { employeeLeavesProps } from "../../../../Types/HomeComponentTypes";


import "../EmployeeLeavesComponent/EmployeeLeaves.css"

function EmployeeLeaves() {


    const { data: EmployeeLeavesDetailsData, loading, refetch } = useQuery(employees_leave_details_query, {
    },
    );

    const [employeeStatus, setEmployeeLeaveStatus] = useState(true);

    const [searchLeaveEmployeeName, setSearchLeaveEmployeeName] = useState("");


    const [updateLeaveStatus, { data: updateLeaveStatusData }] = useMutation(update_employee_leave_status, {
        refetchQueries: [{ query: employees_leave_details_query }],

        // update: (cache,{data:{updateEmployeeLeaveStatus}}) => {
        //     const showLeaveData = cache.readQuery({ query: show_all_employees_data_query })

        //     if(updateEmployeeLeaveStatus.success === true){
        //         cache.writeQuery({
        //             query:show_all_employees_data_query,
        //             data:{
        //                 showshowLoggedInEmployeesLeaveDetailsData:[...fetchLeaveDetailsData.showLoggedInEmployeesLeaveDetailsData]
        //             }
        //         })
        //     }
        //     console.log(updateEmployeeLeaveStatus);
        // }


    })

    const [showApprovedRejectedMessage, setShowApprovedRejectedMessage] = useState("");

    useEffect(() => {
        refetch()
        console.log(updateLeaveStatusData)
    })

    const approveEmployeeLeave = (val: employeeLeavesProps) => {


        console.log(val.employeeLeaveApplicationUid);
        updateLeaveStatus({
            variables: {
                updateEmployeeLeaveStatusParameters: {
                    uid: val.uid,
                    employeeLeaveApplicationUid: val.employeeLeaveApplicationUid,
                    leaveStatus: true,
                    leaveApprovedButtonsStatus: false
                }
            }
        }).then((val) => {
            console.log(val);
        })
        setShowApprovedRejectedMessage("Leave Approved")

    }

    const rejectEmployeeLeave = (val: employeeLeavesProps) => {


        updateLeaveStatus({
            variables: {
                updateEmployeeLeaveStatusParameters: {
                    uid: val.uid,
                    employeeLeaveApplicationUid: val.employeeLeaveApplicationUid,
                    leaveStatus: false,
                    leaveApprovedButtonsStatus: false
                }
            }
        })
        setShowApprovedRejectedMessage("Leave Rejected")

    }
    let pendingLeaves = [];
    let approvedLeaves = [];
    let rejectedLeaves = [];

    if (EmployeeLeavesDetailsData) {
        pendingLeaves = EmployeeLeavesDetailsData.fetchEmployeesLeaveDetails.filter((item: employeeLeavesProps) => item.leaveStatus === null || item.leaveStatus === undefined);
        approvedLeaves = EmployeeLeavesDetailsData.fetchEmployeesLeaveDetails.filter((item: employeeLeavesProps) => item.leaveStatus === true);
        rejectedLeaves = EmployeeLeavesDetailsData.fetchEmployeesLeaveDetails.filter((item: employeeLeavesProps) => item.leaveStatus === false);
    }

    const sortedLeaves = [...pendingLeaves, ...approvedLeaves, ...rejectedLeaves];

    // approvedLeaves.reverse();
    // rejectedLeaves.reverse();
    if (loading) return <div>Loading...</div>


    return (
        <div className="employees-leaves-component">


            <p className="font-bold employees-leaves-component-heading">Leaves</p>

            <input placeholder="Search Employee Name" onChange={(e) => setSearchLeaveEmployeeName(e.target.value)} className="employee-leave-search-bar" type="text" />

            {
                sortedLeaves.filter((EmployeeLeavesDetailsData: employeeLeavesProps, key: number) => {
                    if (EmployeeLeavesDetailsData.employeeName.toLowerCase().includes(searchLeaveEmployeeName.toLowerCase())) {
                        return EmployeeLeavesDetailsData;
                    } else if (searchLeaveEmployeeName === "") {
                        return EmployeeLeavesDetailsData;
                    }
                }).map((val: employeeLeavesProps, key: number) => {
                    return (
                        <div className="employees-leaves-container">
                            <div className="employee-leave-details-key-data-row">
                                <div className="employee-leave-details-data-div">
                                    <div>
                                        <p>{key + 1}.</p>
                                    </div>
                                    <div>
                                        <div className="employee-leave-details-data-div">
                                            <label className="font-semibold mt-2">Employee Name:</label>
                                            <p>{val.employeeName}</p>
                                        </div>

                                        <div className="employee-leave-details-data-div">
                                            <label className="font-semibold mt-2">Reason:</label>
                                            <p>{val.leaveReason}</p>
                                        </div>

                                        <div className="employee-leave-details-data-div">
                                            <label className="font-semibold mt-2">Date:</label>
                                            <p>{val.date}</p>
                                        </div>
                                        <div>
                                            {
                                                val.leaveApprovedButtonsStatus ?
                                                    <div key={val.id} className="employee-leave-box-buttons-container">
                                                        {/* <button>View Reason</button> */}
                                                        <button onClick={() => approveEmployeeLeave(val)}>Approve Leave</button>
                                                        <button onClick={() => rejectEmployeeLeave(val)}>Reject Leave</button>
                                                    </div>
                                                    :
                                                    <div className="employee-leave-box-buttons-container">
                                                        {
                                                            val.leaveStatus ? <p className="leave-approved-status">Leave Approved</p> : <p className="leave-rejected-status">Leave Rejected</p>
                                                        }
                                                    </div>
                                            }
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    )
                })
            }

        </div>
    )
}

export default EmployeeLeaves;