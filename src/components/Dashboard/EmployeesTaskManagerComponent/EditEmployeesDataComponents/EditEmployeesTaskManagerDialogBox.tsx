import { gql, useMutation, useQuery } from "@apollo/client";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../ReduxHooks";
import { setShowEmployeesDialogBox, setShowEmployeesEditDialogBox } from "../../../../ReduxSlicers/ShowEmployeesDialogBoxSlicer";
import EmployeesTaskManagerDialogBoxForm from "../EmployeesTaskManagerDialogBoxForm";
import ReactLoading from 'react-loading';

import "../ShowEmployeesDataComponent/ShowEmployeesTask.css"
import "../TaskDialogBox.css"
import "../TaskDialogBoxResponsive.css"

import { EditEmployeesTaskManagerDialogBoxProps } from "../../../../Types/EmployeesTaskTypes";
import { edit_employees_task_details_query, fetch_employees_task_details_query } from "../../../../GraphQLQueries/EmployeesTaskManagerQuery";



type EditEmployeesTaskDetailsDialogBoxProps = {
    selectedUpdateTaskFieldUid: String
    // setEditDialogBox: React.Dispatch<React.SetStateAction<Boolean>>
}

function EditEmployeesTaskManagerDialogBox({ selectedUpdateTaskFieldUid }: EditEmployeesTaskManagerDialogBoxProps) {
    const employeeName = useAppSelector((state) => state.AddEmployeesTaskSlicer.employeeName)
    const employeeEmailId = useAppSelector((state) => state.AddEmployeesTaskSlicer.employeeEmailId)
    const employeeTaskDesc = useAppSelector((state) => state.AddEmployeesTaskSlicer.employeeTaskDesc)
    const employeeDeadLine = useAppSelector((state) => state.AddEmployeesTaskSlicer.employeeDeadLine)

    const Dispatch = useAppDispatch()


    const [editEmployeesTaskFields] = useMutation(edit_employees_task_details_query)

    useEffect(() => {
        console.log(selectedUpdateTaskFieldUid)
    })

    const editDialogBox = () => {

            editEmployeesTaskFields({
                variables: {
                    editEmployeesTaskParameter: {
                        uid: selectedUpdateTaskFieldUid,
                        name: employeeName,
                        emailId: employeeEmailId,
                        taskDesc: employeeTaskDesc,
                        deadLine: employeeDeadLine
                    }
                }
            })

    }

    const closeDialogBox = () => {
        Dispatch(setShowEmployeesDialogBox(false));
        Dispatch(setShowEmployeesEditDialogBox(false));
    }

    return (
        <div className="task-dialog-box">
            <form className="task-dialog-box-form">

                <EmployeesTaskManagerDialogBoxForm />
                <div className="edit-button-div">
                    <button onClick={editDialogBox}
                        className="edit-new-task-button">Edit A New Task</button>
                    <button className="close-edit-dialog-box-button" onClick={closeDialogBox}>Cancel</button>

                </div>

            </form>
        </div>
    )
}

export default EditEmployeesTaskManagerDialogBox;