import { useState } from "react";
import { useApolloClient, useMutation, useQuery } from "@apollo/client";
import { useDispatch } from "react-redux";
import { setSearchFilter } from "../../../ReduxSlicers/SearchFilterSilcer";
import { useAppSelector } from "../../../ReduxHooks";
import { EmployeesAccountDataProps } from "../../../Types/ShowAllEmployeesComponentTypes";


import { show_all_employees_data_query, update_Employee_Of_The_Month_query } from "../../../GraphQLQueries/ShowAllEmployeesQuery";

import DeleteEmployeeAccountDialogBox from "./DeleteEmployeeAccountDialogBox";
import { FaCheck } from "react-icons/fa";

import "../ShowAllEmployeesComponent/ShowAllEmployees.css"
import "../ShowAllEmployeesComponent/ShowAllEmployeesResponsive.css"
import "../ShowAllEmployeesComponent/DeleteEmployeeAccountDialogBox.css"
// import { client } from "../../..";

function ShowAllEmployees() {

    const [selectedEmployeeAccountUid, setSelectedEmployeeAccountUid] = useState<String>("")

    const searchFilter = useAppSelector((state) => state.SearchFilterSilcer.SearchFilter)

    const [showDeleteEmployeeAccountDialogBoxStatus, setShowDeleteEmployeeAccountDialogBoxStatus] = useState(false);



    const [showAssignEmployeeOfTheMonthStatus, setShowAssignEmployeeOfTheMonthStatus] = useState(false);

    const Dispatch = useDispatch()

    const [assignEmployeeOfTheMonth] = useMutation(update_Employee_Of_The_Month_query,{
        onError:(err)=>{
            console.log(err)
        }
    });


    const { data: ShowAllEmployeesData, loading, refetch } = useQuery(show_all_employees_data_query);

    const showDeleteEmployeeAccountDialogBox = (uid: String) => {
        setShowDeleteEmployeeAccountDialogBoxStatus(true)
        setSelectedEmployeeAccountUid(uid)
    }

    const showAssignEmployeeOfTheMonth = (selectedUid: string) => {

        assignEmployeeOfTheMonth({
            variables: {
                updateEmployeeOfTheMonthParameters: {
                    uid: selectedUid,
                    employeeOfTheMonth: true
                },
            },
        })
        setShowAssignEmployeeOfTheMonthStatus(true);
    }

    setTimeout(() => {
        setShowAssignEmployeeOfTheMonthStatus(false);
    }, 3000)


    const adminStatus = useAppSelector((state) => state.LocalStorageSlicer.adminStatus)

    if (loading) return <p>Loading...</p>

    return (
        <div id="main-page" className="p-6 md:p-8 pt-12 md:pt-16 max-w-[1600px] mx-auto w-full relative">
            {
                showAssignEmployeeOfTheMonthStatus &&

                <div className="absolute top-4 right-8 bg-emerald-50 text-emerald-600 px-4 py-3 rounded-xl shadow-lg border border-emerald-100 flex items-center space-x-3 z-50 animate-[showDashboardEffectAnimation_0.3s_ease-out]">
                    <FaCheck className="text-lg" />
                    <p className="font-semibold text-sm">New Employee of the Month Assigned</p>
                </div>
            }


            <div className="mt-8 animate-[showDashboardEffectAnimation_0.5s_ease-out]">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                    <h2 className="text-2xl font-bold text-slate-800 tracking-tight">All Employees</h2>
                    {
                        ShowAllEmployeesData.showAllEmployee.length > 0
                        && <input data-testid="search-input" onChange={(e) => Dispatch(setSearchFilter(e.target.value))} className="w-full sm:w-80 px-4 py-2.5 bg-white border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-sm" placeholder="Search Employees" type="text" />
                    }
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {
                        ShowAllEmployeesData.showAllEmployee.length > 0 ?
                            ShowAllEmployeesData.showAllEmployee.filter((filteredEmployeesAccountData: EmployeesAccountDataProps) => {

                                if (filteredEmployeesAccountData.name.toLowerCase().includes(searchFilter.toLowerCase())) {
                                    return filteredEmployeesAccountData;
                                } else if (searchFilter === "") {
                                    return filteredEmployeesAccountData;
                                }
                            }).map((EmployeesAccountData: EmployeesAccountDataProps) => {
                                return (
                                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col transition-all hover:shadow-md hover:-translate-y-1 duration-300" >
                                        <div className="mb-4">
                                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Name</p>
                                            <p data-testid="employee-name" className="text-lg font-bold text-slate-800">{EmployeesAccountData.name}</p>
                                        </div>
                                        <div className="mb-6">
                                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Email ID</p>
                                            <p className="text-sm font-medium text-slate-600 truncate">{EmployeesAccountData.emailId}</p>
                                        </div>
                                        {adminStatus ?
                                            <div className="mt-auto space-y-3">
                                                <button onClick={() => {
                                                    showAssignEmployeeOfTheMonth(EmployeesAccountData.uid)
                                                }} className="w-full bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold py-2.5 px-4 rounded-xl text-sm transition-colors shadow-sm">Assign Employee of the month</button>
                                                <button className="w-full bg-red-50 hover:bg-red-100 text-red-600 font-semibold py-2.5 px-4 rounded-xl text-sm transition-colors shadow-sm" onClick={() => showDeleteEmployeeAccountDialogBox(EmployeesAccountData.uid)} >Delete Account</button>
                                            </div>
                                            : null}
                                    </div>
                                )
                            })
                            :
                            <div className="col-span-full flex flex-col items-center justify-center p-12 bg-white rounded-2xl border border-dashed border-gray-300">
                                <p className="font-bold text-slate-500 text-lg">No Employees Added</p>
                            </div>
                    }


                    {
                        showDeleteEmployeeAccountDialogBoxStatus ?
                            <DeleteEmployeeAccountDialogBox showDeleteEmployeeAccountDialogBoxStatus={showDeleteEmployeeAccountDialogBoxStatus} setShowDeleteEmployeeAccountDialogBoxStatus={setShowDeleteEmployeeAccountDialogBoxStatus} uid={selectedEmployeeAccountUid} />
                            :
                            null
                    }

                </div>
            </div>

        </div>
    )
}

export default ShowAllEmployees;