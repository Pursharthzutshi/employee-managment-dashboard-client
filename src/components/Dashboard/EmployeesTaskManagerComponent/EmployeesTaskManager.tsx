import React, { useEffect } from "react";
import ShowEmployeesTask from "./ShowEmployeesDataComponent/ShowEmployeesTask";
import { useAppDispatch, useAppSelector } from "../../../ReduxHooks";
import { setShowEmployeesDialogBox } from "../../../ReduxSlicers/ShowEmployeesDialogBoxSlicer";
import AddEmployeesTaskManagerDialogBox from "./AddEmployeesComponent/AddEmployeesTaskManagerDialogBox";
import NavBar from "../../NavBarComponent/NavBar";

import "../../../App.css"
import "../EmployeesTaskManagerComponent/EmployeesTaskManager.css"
import "../EmployeesTaskManagerComponent/TaskDialogBox.css"


function EmployeesTaskManager() {

    // const loggedInSavedEmailId = useAppSelector((state) => state.LocalStorageSlicer.loggedInSavedEmailId)

    const dialogBox = useAppSelector((state) => state.ShowEmployeesDialogBoxSlicer.showEmployeesDialogBox)
    const Dispatch = useAppDispatch();

    const showDialogBox = () => {
        Dispatch(setShowEmployeesDialogBox(true));
    }

    useEffect(() => {
        const val = localStorage.getItem('loggedInEmailID')
        console.log(val);
    })

    return (
        <div className="employee-task-manager-component">
            <div className="tasks-component">
                <NavBar />
                <h3>Employees Task</h3>
                <button className="add-posts-dialog-box-button" onClick={showDialogBox}>Add New Tasks</button>
                {
                    dialogBox && <AddEmployeesTaskManagerDialogBox />
                }

                <ShowEmployeesTask />

            </div>
        </div>
    )
}

export default EmployeesTaskManager;