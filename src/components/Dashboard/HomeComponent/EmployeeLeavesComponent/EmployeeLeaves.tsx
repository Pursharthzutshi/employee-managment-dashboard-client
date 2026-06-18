import react, { useEffect, useState } from "react"
import { useMutation, useQuery } from "@apollo/client";
import { employees_leave_details_query, update_employee_leave_status } from "../../../../GraphQLQueries/HomeQuery";
import { employeeLeavesProps } from "../../../../Types/HomeComponentTypes";


import "../EmployeeLeavesComponent/EmployeeLeaves.css"

function EmployeeLeaves() {


    const { data: EmployeeLeavesDetailsData, loading, refetch } = useQuery(employees_leave_details_query);

    const [searchLeaveEmployeeName, setSearchLeaveEmployeeName] = useState("");


    const [updateLeaveStatus, { data: updateLeaveStatusData }] = useMutation(update_employee_leave_status, {
        refetchQueries: [{ query: employees_leave_details_query }],
    })


    useEffect(() => {
        refetch()
    })

    const approveEmployeeLeave = (val: employeeLeavesProps) => {


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
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 col-span-full xl:col-span-1 h-full max-h-[600px] flex flex-col">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <h3 className="text-xl font-bold text-slate-800 tracking-tight">Leaves Applications</h3>
                <input 
                    placeholder="Search Employee Name" 
                    onChange={(e) => setSearchLeaveEmployeeName(e.target.value)} 
                    className="w-full sm:w-64 px-4 py-2 bg-slate-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm transition-all shadow-sm" 
                    type="text" 
                />
            </div>

            <div className="space-y-4 overflow-y-auto pr-2 custom-scrollbar">
            {
                sortedLeaves.filter((EmployeeLeavesDetailsData: employeeLeavesProps) => {
                    if (EmployeeLeavesDetailsData.employeeName.toLowerCase().includes(searchLeaveEmployeeName.toLowerCase())) {
                        return EmployeeLeavesDetailsData;
                    } else if (searchLeaveEmployeeName === "") {
                        return EmployeeLeavesDetailsData;
                    }
                    return null;
                }).map((val: employeeLeavesProps, key: number) => {
                    return (
                        <div key={val.id || key} className="p-5 rounded-xl border border-gray-100 bg-white shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition-all hover:shadow-md hover:border-indigo-100 group">
                            <div className="flex items-start space-x-4 w-full md:w-auto">
                                <span className="font-bold text-slate-300 mt-1 bg-slate-50 w-8 h-8 flex items-center justify-center rounded-lg">{key + 1}</span>
                                <div className="flex-1">
                                    <p className="font-bold text-slate-800 text-lg group-hover:text-indigo-600 transition-colors">{val.employeeName}</p>
                                    <div className="mt-2 space-y-1">
                                        <p className="text-sm text-slate-600"><span className="font-semibold text-slate-500 text-xs uppercase tracking-wider mr-2">Reason</span> {val.leaveReason}</p>
                                        <p className="text-sm text-slate-600"><span className="font-semibold text-slate-500 text-xs uppercase tracking-wider mr-2">Date</span> {val.date}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex-shrink-0 w-full md:w-auto border-t md:border-t-0 border-gray-100 pt-4 md:pt-0 mt-2 md:mt-0">
                                {
                                    val.leaveApprovedButtonsStatus ?
                                        <div className="flex space-x-3 w-full md:w-auto">
                                            <button onClick={() => approveEmployeeLeave(val)} className="flex-1 md:flex-none bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-semibold py-2.5 px-5 rounded-xl text-sm transition-colors border border-emerald-100 shadow-sm">Approve</button>
                                            <button onClick={() => rejectEmployeeLeave(val)} className="flex-1 md:flex-none bg-red-50 text-red-700 hover:bg-red-100 font-semibold py-2.5 px-5 rounded-xl text-sm transition-colors border border-red-100 shadow-sm">Reject</button>
                                        </div>
                                        :
                                        <div className="flex justify-end">
                                            {
                                                val.leaveStatus ? 
                                                <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">Approved</span> 
                                                : 
                                                <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold bg-red-100 text-red-800 border border-red-200">Rejected</span>
                                            }
                                        </div>
                                }
                            </div>
                        </div>
                    )
                })
            }
            {sortedLeaves.length === 0 && (
                <div className="flex flex-col items-center justify-center p-10 bg-slate-50 rounded-xl border border-dashed border-gray-200">
                    <p className="text-slate-500 font-medium">No leave applications found.</p>
                </div>
            )}
            </div>
        </div>
    )
}

export default EmployeeLeaves;