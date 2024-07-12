import react, { useEffect, useState } from "react"
import { useMutation, useQuery } from "@apollo/client";
import { employees_leave_details_query, update_employee_leave_status } from "../../../../GraphQLQueries/HomeQuery";
import { useAppSelector } from "../../../../ReduxHooks";

import "../EmployeeLeavesComponent/EmployeeLeaves.css"
import { show_all_employees_data_query } from "../../../../GraphQLQueries/ShowAllEmployeesQuery";

function EmployeeLeaves() {


    const { data: EmployeeLeavesDetailsData } = useQuery(employees_leave_details_query);

    useEffect(() => {
        // console.log(EmployeeLeavesDetailsData.fetchEmployeesLeaveDetails)
    })

    const [employeeStatus, setEmployeeLeaveStatus] = useState(true);

    const [searchLeaveEmployeeName, setSearchLeaveEmployeeName] = useState("");

    // const savedEmployeeLoggedInUid = useAppSelector((state) => state.LocalStorageSlicer.loggedInSavedUid)

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

    useEffect(() => {
        console.log(updateLeaveStatusData)
    })

    const approveEmployeeLeave = (val: any) => {

        // val.map((item:any)=>{
        //     if(){
        //         setEmployeeLeaveStatus(false)
        //     }else{
        //         setEmployeeLeaveStatus(true)
        //     }
        // })

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

    }

    const rejectEmployeeLeave = (val: any) => {
        // val.map((item:any)=>{
        //     if(){
        //         setEmployeeLeaveStatus(false)
        //     }else{
        //         setEmployeeLeaveStatus(true)                
        //     }
        // })


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

    }


    return (
        <div className="employees-leaves-component">


            <p className="font-bold employees-leaves-component-heading">Leaves</p>

            <input placeholder="Search Employee Name" onChange={(e) => setSearchLeaveEmployeeName(e.target.value)} className="employee-leave-search-bar" type="text" />

            {
                EmployeeLeavesDetailsData && EmployeeLeavesDetailsData.fetchEmployeesLeaveDetails.filter((EmployeeLeavesDetailsData: any) => {
                    if (EmployeeLeavesDetailsData.employeeName.toLowerCase().includes(searchLeaveEmployeeName.toLowerCase())) {
                        return EmployeeLeavesDetailsData;
                    } else if (searchLeaveEmployeeName === "") {
                        return EmployeeLeavesDetailsData;
                    }
                }).map((val: any, key: string) => {
                    console.log(val)
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
                                                        <p>Done</p>
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