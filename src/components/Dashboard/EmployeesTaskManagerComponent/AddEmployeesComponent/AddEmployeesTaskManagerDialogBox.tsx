import { FormEvent, useState } from "react";
import { useMutation } from "@apollo/client";
import { useAppDispatch, useAppSelector } from "../../../../ReduxHooks/index";
import { setEmployeeDeadLine, setEmployeeName, setEmployeeTaskDesc } from "../../../../ReduxSlicers/AddEmployeesTaskSlicer";
import { v4 as uuidv4 } from 'uuid';
import EmployeesTaskManagerDialogBoxForm from "../EmployeesTaskManagerDialogBoxForm";
import { addEmployeesTask, fetch_employees_task_details_query } from "../../../../GraphQLQueries/EmployeesTaskManagerQuery";
import { setShowEmployeesDialogBox } from "../../../../ReduxSlicers/ShowEmployeesDialogBoxSlicer";
import { addTasksCacheType } from "../../../../Types/InMemoryCacheTypes";

import "../AddEmployeesComponent/AddEmployeesTaskManagerDialogBox.css"
import "../TaskDialogBox.css"
import "../TaskDialogBoxResponsive.css"

function AddEmployeesTaskManagerDialogBox() {


    const employeeName = useAppSelector((state) => state.AddEmployeesTaskSlicer.employeeName)
    const employeeEmailId = useAppSelector((state) => state.AddEmployeesTaskSlicer.employeeEmailId)
    const employeeTaskDesc = useAppSelector((state) => state.AddEmployeesTaskSlicer.employeeTaskDesc)
    const employeeDeadLine = useAppSelector((state) => state.AddEmployeesTaskSlicer.employeeDeadLine)

    const Dispatch = useAppDispatch();

    const [showErrorMessageStatus, setShowErrorMessageStatus] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState("");

    const [addTasks] = useMutation(addEmployeesTask, {
        onCompleted: (addTaskdata) => {
            if (addTaskdata.createEmployeesTask.success === false) {
                setShowErrorMessageStatus(true)
                setShowErrorMessage(addTaskdata.createEmployeesTask.message)
                Dispatch(setShowEmployeesDialogBox(true));

            } else {
                Dispatch(setShowEmployeesDialogBox(false));
                Dispatch(setEmployeeName(""))
                Dispatch(setEmployeeTaskDesc(""))
                Dispatch(setEmployeeDeadLine(""))
                Dispatch(setEmployeeTaskDesc(""))
                setShowErrorMessageStatus(false)
            }
        },
        update: (cache, { data: { createEmployeesTask } }) => {
            const newtaskData = createEmployeesTask.addNewTaskData
            if (newtaskData) {
                const fetchTask: addTasksCacheType | null = cache.readQuery({ query: fetch_employees_task_details_query })
                if (fetchTask?.fetchEmployeesTaskDetails) {
                    cache.writeQuery({
                        query: fetch_employees_task_details_query,
                        data: {
                            fetchEmployeesTaskDetails: [...fetchTask.fetchEmployeesTaskDetails, newtaskData]
                        }
                    })
                }
            }
        }
    });


    const addNewTask = () => {

        addTasks({
            variables: {
                employeesTaskParameters: {
                    uid: uuidv4(),
                    name: employeeName,
                    emailId: employeeEmailId,
                    taskDesc: employeeTaskDesc,
                    deadLine: employeeDeadLine
                }
            }
        })
    }

    const preventForm = (e: FormEvent) => {
        addNewTask()
        e.preventDefault()
    }

    return (
        <div className="task-dialog-box">

            <form onSubmit={preventForm} className="task-dialog-box-form">

                <EmployeesTaskManagerDialogBoxForm />

                {
                    showErrorMessageStatus && <p>{showErrorMessage}</p>
                }
                
                <div className="add-new-task-button-div">

                    <button type="submit" className="add-new-task-button">Add Task</button>

                </div>
            </form>
        </div>
    )
}

export default AddEmployeesTaskManagerDialogBox;