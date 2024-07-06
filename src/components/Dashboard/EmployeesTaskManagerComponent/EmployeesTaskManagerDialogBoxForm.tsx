import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../ReduxHooks";
import { SetEmployeeEmailId, setAlreadyAddedEmployeeStatus, setEmployeeDeadLine, setEmployeeName, setEmployeeTaskDesc } from "../../../ReduxSlicers/AddEmployeesTaskSlicer";
import { gql, useQuery } from "@apollo/client";
import { setShowEmployeesDialogBox, setShowEmployeesEditDialogBox } from "../../../ReduxSlicers/ShowEmployeesDialogBoxSlicer";
import Calendar from 'react-calendar';
import { FaTimes } from "react-icons/fa";
import 'react-calendar/dist/Calendar.css';
import { setTaskAssign } from "../../../ReduxSlicers/ShowTaskAssignEmployeeInDialogBoxSlicer";
import { employeesTaskManagerDialogBoxFormTypes, fetchEmailUsersIdsProps } from "../../../Types/EmployeesTaskTypes";

import "./EmployeesTaskManagerDialogBoxForm.css"

import { showUsersEmailIdsQuery } from "../../../GraphQLQueries/EmployeesTaskManagerQuery";

function EmployeesTaskManagerDialogBoxForm() {

    const { data: FetchUserData, loading, error, refetch } = useQuery(showUsersEmailIdsQuery);

    const [selectedUsers, setSelectedUsers] = useState<String[]>([]);

    const taskAssignedToEmployee = useAppSelector((state) => state.ShowTaskAssignEmployeeInDialogBoxSlicer.taskAssigned)

    const alreadyAddedEmployeeStatus = useAppSelector((state) => state.AddEmployeesTaskSlicer.alreadyAddedEmployeeStatus)

    const Dispatch = useAppDispatch();

    useEffect(() => {
        Dispatch(SetEmployeeEmailId(selectedUsers));
    })

    // ADD SELECTED USERS 

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


    // REMOVE SELECTED USERS    

    const removeSelectedUsers = (selectedEmailId: String) => {
        const updatedSelectedUsers = selectedUsers.filter((existingUsersEmailId: String) => {
            return existingUsersEmailId !== selectedEmailId;
        })
        setSelectedUsers(updatedSelectedUsers)
    }

    // CLOSE DIALOG BOX    

    const closeDialogBox = () => {
        Dispatch(setShowEmployeesDialogBox(false));
        Dispatch(setShowEmployeesEditDialogBox(false));
    }

    const year = new Date().getFullYear();
    const month = String(new Date().getMonth() + 1).padStart(2, '0');
    const day = String(new Date().getDate()).padStart(2, '0');
    const date = `${year}-${month}-${day}`;

    // LOADING    

    if (loading) return <h3>Loading</h3>

    return (
        <div className="employee-dialog-box-div">

            <div className="close-dialog-box-icon-div" onClick={closeDialogBox}>
                <FaTimes className="close-dialog-box-icon" >Close</FaTimes>
            </div>

            <p className="font-semibold text-xl ml-2 ">Task</p>

            <input type="text" placeholder="Task Name" onChange={(e: React.ChangeEvent<HTMLInputElement>) => { Dispatch(setEmployeeName(e.target.value)) }} />

            <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => addSelectedUser(e.target.value)} type="text" name="city" list="cityname" />

            <datalist id="cityname">
                <select>
                    {
                        FetchUserData.fetchEmailUsersIds.map((val: fetchEmailUsersIdsProps) => {
                            console.log(val)
                            return <option value={val.emailId}>
                                {val.name}
                            </option>
                        })
                    }

                </select>
            </datalist>

            {
                taskAssignedToEmployee && selectedUsers.length > 0 && <div className="selected-employees-container">

                    <strong>Task Assigned to the Employee</strong>
                    {
                        selectedUsers.map((SelectedUsersData: String) => {
                            return (
                                <div className="selected-employees-div">
                                    <p>{SelectedUsersData}</p>
                                    <FaTimes className="selected-employees-cancel-icon" onClick={() => removeSelectedUsers(SelectedUsersData)}></FaTimes>
                                </div>
                            )
                        })
                    }
                </div>
            }

            {
                alreadyAddedEmployeeStatus ? <h4 className="">Added Already</h4> : null
            }

            <textarea className="task-desc-textarea" placeholder="Task Description" onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => { Dispatch(setEmployeeTaskDesc(e.target.value)) }} ></textarea>
            <input min={date} data-date-format="DD MMMM YYYY" type="date" placeholder="deadLine" className="calendar" onChange={(e: React.ChangeEvent<HTMLInputElement>) => { Dispatch(setEmployeeDeadLine(e.target.value)) }} />

        </div>
    )
}

export default EmployeesTaskManagerDialogBoxForm;