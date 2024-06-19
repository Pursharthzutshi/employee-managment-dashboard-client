import React, { useEffect, useState } from "react";
import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client";
import DisplayData from "../../HomeComponent/DisplayData";
import { useAppDispatch, useAppSelector } from "../../../../ReduxHooks/index";
import { SetEmployeeEmailId, setEmployeeDeadLine, setEmployeeName, setEmployeeTaskDesc } from "../../../../ReduxSlicers/AddEmployeesTaskSlicer";
import { v4 as uuidv4 } from 'uuid';
import AddTaskDialogBoxForm from "../EmployeesTaskManagerDialogBoxForm";
import EmployeesTaskManagerDialogBoxForm from "../EmployeesTaskManagerDialogBoxForm";

import "../AddEmployeesComponent/AddEmployeesTaskManagerDialogBox.css"
import "../TaskDialogBox.css"

type addTaskDialogBoxProps = {
    setAddTaskDialogBox: React.Dispatch<React.SetStateAction<Boolean>>;
}
const addEmployeesTask = gql`
mutation mt($employeesTaskParameters: createEmployeesTaskInput!){
  createEmployeesTask(employeesTaskParameters: $employeesTaskParameters) {
    name
  }
}
`

function AddEmployeesTaskManagerDialogBox() {

    // const { data:FetchUserData, loading, error, refetch, showUsersEmailIdsQuery } = DisplayData();

    const employeeName = useAppSelector((state) => state.AddEmployeesTaskSlicer.employeeName)
    const employeeEmailId = useAppSelector((state) => state.AddEmployeesTaskSlicer.employeeEmailId)
    const employeeTaskDesc = useAppSelector((state) => state.AddEmployeesTaskSlicer.employeeTaskDesc)
    const employeeDeadLine = useAppSelector((state) => state.AddEmployeesTaskSlicer.employeeDeadLine)

    const Dispatch = useAppDispatch();

 
    const [addTasks] = useMutation(addEmployeesTask);

    useEffect(()=>{
        console.log(employeeEmailId)
    })

    return (
        <div className="task-dialog-box">

            <form className="task-dialog-box-form">

                <EmployeesTaskManagerDialogBoxForm />
             

                <div className="add-new-task-button-div">
                    <button onClick={() => addTasks({
                        variables: {
                            employeesTaskParameters: {
                                uid: uuidv4(),
                                name: employeeName,
                                emailId: employeeEmailId,
                                taskDesc: employeeTaskDesc,
                                deadLine: employeeDeadLine
                            }
                        }
                    })}
                        className="add-new-task-button">Add Task</button>
                </div>
            </form>
        </div>
    )
}

export default AddEmployeesTaskManagerDialogBox;