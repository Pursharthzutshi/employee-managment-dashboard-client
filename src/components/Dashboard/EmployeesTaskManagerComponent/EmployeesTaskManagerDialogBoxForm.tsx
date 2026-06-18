import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../ReduxHooks";
import { SetEmployeeEmailId, setAlreadyAddedEmployeeStatus, setEmployeeDeadLine, setEmployeeName, setEmployeeTaskDesc } from "../../../ReduxSlicers/AddEmployeesTaskSlicer";
import { gql, useQuery } from "@apollo/client";
import { setShowEmployeesDialogBox, setShowEmployeesEditDialogBox } from "../../../ReduxSlicers/ShowEmployeesDialogBoxSlicer";
import { FaTimes } from "react-icons/fa";
import 'react-calendar/dist/Calendar.css';
import { setTaskAssign } from "../../../ReduxSlicers/ShowTaskAssignEmployeeInDialogBoxSlicer";
import { employeesTaskManagerDialogBoxFormTypes, fetchEmailUsersIdsProps } from "../../../Types/EmployeesTaskTypes";
import { showUsersEmailIdsQuery } from "../../../GraphQLQueries/EmployeesTaskManagerQuery";
import DateLimit from "../../utils/DateLimit";

import "./EmployeesTaskManagerDialogBoxForm.css"

function EmployeesTaskManagerDialogBoxForm() {

    const { data: FetchUserData, loading, error, refetch } = useQuery(showUsersEmailIdsQuery);

    const [selectedUsers, setSelectedUsers] = useState<String[]>([]);

    const taskAssignedToEmployee = useAppSelector((state) => state.ShowTaskAssignEmployeeInDialogBoxSlicer.taskAssigned)

    const alreadyAddedEmployeeStatus = useAppSelector((state) => state.AddEmployeesTaskSlicer.alreadyAddedEmployeeStatus)

    const Dispatch = useAppDispatch();

    useEffect(() => {
        Dispatch(SetEmployeeEmailId(selectedUsers));
    })

    const addSelectedUser = (currentUsers: String) => {

        if (!selectedUsers.includes(currentUsers)) {

            FetchUserData.fetchEmailUsersIds.find((ArrayOfEmailIds: employeesTaskManagerDialogBoxFormTypes) => {
                if (ArrayOfEmailIds.emailId === currentUsers) {
                    setSelectedUsers((prevUser: String[]) => [...prevUser, currentUsers])
                    Dispatch(setTaskAssign(true))
                    Dispatch(SetEmployeeEmailId(selectedUsers));
                    return;
                }
            })
        } else {
            Dispatch(setAlreadyAddedEmployeeStatus(true));
        }
    }

    const removeSelectedUsers = (selectedEmailId: String) => {
        const updatedSelectedUsers = selectedUsers.filter((existingUsersEmailId: String) => {
            return existingUsersEmailId !== selectedEmailId;
        })
        setSelectedUsers(updatedSelectedUsers)
    }


    const closeDialogBox = () => {
        Dispatch(setShowEmployeesDialogBox(false));
        Dispatch(setShowEmployeesEditDialogBox(false));
    }

    if (loading) return <h3>Loading</h3>

    return (
        <>
            <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Task Name</label>
                <input 
                    type="text" 
                    placeholder="E.g. Database Migration" 
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => { Dispatch(setEmployeeName(e.target.value)) }}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                />
            </div>

            <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Assign To (Email)</label>
                <input 
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => addSelectedUser(e.target.value)} 
                    type="text" 
                    name="city" 
                    list="cityname"
                    placeholder="Select employee..."
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                />

                <datalist id="cityname">
                    {
                        FetchUserData.fetchEmailUsersIds.map((val: fetchEmailUsersIdsProps) => {
                            return <option key={val.emailId} value={val.emailId}>
                                {val.name}
                            </option>
                        })
                    }
                </datalist>
            </div>

            {
                taskAssignedToEmployee && selectedUsers.length > 0 && (
                    <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4">
                        <label className="block text-xs font-bold text-indigo-800 uppercase tracking-wider mb-2">Assigned Employees</label>
                        <div className="flex flex-wrap gap-2">
                            {
                                selectedUsers.map((SelectedUsersData: String) => {
                                    return (
                                        <div key={String(SelectedUsersData)} className="inline-flex items-center px-2.5 py-1.5 rounded-lg text-sm font-medium bg-white border border-indigo-200 text-indigo-700 shadow-sm">
                                            <span>{SelectedUsersData}</span>
                                            <button 
                                                type="button"
                                                onClick={() => removeSelectedUsers(SelectedUsersData)}
                                                className="ml-1.5 text-indigo-400 hover:text-indigo-600 focus:outline-none"
                                            >
                                                <FaTimes />
                                            </button>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                )
            }

            {
                alreadyAddedEmployeeStatus ? <div className="text-red-500 text-sm font-medium">This employee is already added to the task.</div> : null
            }

            <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Description</label>
                <textarea 
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all resize-none" 
                    placeholder="Provide details about the task..." 
                    rows={3}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => { Dispatch(setEmployeeTaskDesc(e.target.value)) }} 
                ></textarea>
            </div>
            
            <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Deadline</label>
                <input 
                    min={DateLimit()} 
                    data-date-format="DD MMMM YYYY" 
                    type="date" 
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all" 
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => { Dispatch(setEmployeeDeadLine(e.target.value)) }} 
                />
            </div>
        </>
    )
}

export default EmployeesTaskManagerDialogBoxForm;