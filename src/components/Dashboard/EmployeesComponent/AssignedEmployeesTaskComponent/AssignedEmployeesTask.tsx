import React, { useEffect } from "react";


import "../../../../App.css"
import { useAppDispatch, useAppSelector } from "../../../../ReduxHooks";
import ShowEmployeesTask from "../AssignedEmployeesTaskComponent/AssignedEmployeesTask";

// import "../AssignedTaskManagerComponent/EmployeesTaskManager.css"
// import "../EmployeesTaskManagerComponent/TaskDialogBox.css"
function EmployeesTaskManager() {
    // fetchLoggedInEmployeeAssignedTaskDetailsParameters
    
    // const loggedInSavedEmailId = useAppSelector((state) => state.LocalStorageSlicer.loggedInSavedEmailId)

    const Dispatch = useAppDispatch();

    useEffect(() => {
        const val = localStorage.getItem('loggedInEmailID')
        console.log(val);
    })

    return (
        <div  id="main-page" className="employee-task-manager-component">
            <div className="tasks-component">
                <ShowEmployeesTask/>

            </div>
        </div>
    )
}

export default EmployeesTaskManager;