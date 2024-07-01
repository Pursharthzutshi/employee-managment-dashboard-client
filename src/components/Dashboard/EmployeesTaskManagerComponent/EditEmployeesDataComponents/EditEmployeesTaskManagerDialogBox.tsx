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

const fetch_employees_task_details_query = gql`
query fetchEmployeesDetails{
 fetchEmployeesTaskDetails{
 uid,
name,
emailId,
taskDesc,
deadLine
 }
}
`

const edit_employees_task_details_query = gql`
mutation editEmployeesDetails($editEmployeesTaskParameter: editEmployeesTaskInput!){
  editEmployeesTask(editEmployeesTaskParameter: $editEmployeesTaskParameter) {
    name
emailId
taskDesc
deadLine
  }
}
`

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

    const { data: employeesTaskData, loading } = useQuery(fetch_employees_task_details_query)

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