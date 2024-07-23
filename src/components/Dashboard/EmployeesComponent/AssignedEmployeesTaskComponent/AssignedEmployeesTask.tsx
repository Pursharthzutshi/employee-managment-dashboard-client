import { useEffect, useState } from "react";
import { useAppDispatch } from "../../../../ReduxHooks";
import { gql, useMutation } from "@apollo/client";
import NavBar from "../../../NavBarComponent/NavBar";
import { fetchEmployeesDetailsProps } from "../../../../Types/EmployeesTaskTypes";

import "../../EmployeesTaskManagerComponent/ShowEmployeesDataComponent/ShowEmployeesTask.css"
import "../../../../App.css"


const findAssignedEmployeesTaskQuery = gql`
mutation fetchLoggedInEmployeeAssignedTaskDetailsMutation($fetchLoggedInEmployeeAssignedTaskDetailsParameters: fetchLoggedInEmployeeAssignedTaskDetailsInput!){
  fetchLoggedInEmployeeAssignedTaskDetails(fetchLoggedInEmployeeAssignedTaskDetailsParameters: $fetchLoggedInEmployeeAssignedTaskDetailsParameters) {
    name
    taskDesc
    deadLine
  }
}
  `

function AssignedEmployeesTask() {

    const [setSavedLoggedInEmployeeUid] = useState(localStorage.getItem("loggedInSavedUid"));

    const [fetchAssignedEmployeeTask, { data: fetchAssignedEmployeeTaskData, loading: fetchAssignedEmployeeTaskDataLoading }] = useMutation(findAssignedEmployeesTaskQuery, {
        variables: {
            fetchLoggedInEmployeeAssignedTaskDetailsParameters: { uid: setSavedLoggedInEmployeeUid }
        },
        onCompleted: (data) => {
        },
    })

    const Dispatch = useAppDispatch();

    useEffect(() => {
        if (setSavedLoggedInEmployeeUid) {
            fetchAssignedEmployeeTask()
        }
    }, [])

    if (fetchAssignedEmployeeTaskDataLoading) return <div>Loading...</div>

    return (
        <div id="main-page" className="employee-task-manager-component">
            <div className="tasks-component">
                <NavBar />
                <p className="font-semibold text-lg">My Assigned Task</p>

                {
                    fetchAssignedEmployeeTaskData && fetchAssignedEmployeeTaskData.fetchLoggedInEmployeeAssignedTaskDetails.length > 0 ?
                        fetchAssignedEmployeeTaskData && fetchAssignedEmployeeTaskData.fetchLoggedInEmployeeAssignedTaskDetails.map((fetchLoggedInEmployeeAssignedTaskDetailsData: fetchEmployeesDetailsProps) => {
                            return (
                                <div className="employees-task-data-div">
                                    <div>
                                        <br></br>
                                        <strong>TASK NAME - : </strong>
                                        <p className="task-name">{fetchLoggedInEmployeeAssignedTaskDetailsData.name}</p>
                                    </div>
                                    <strong>TASK DESCRIPTION - : </strong>

                                    <p className="task-desc">{fetchLoggedInEmployeeAssignedTaskDetailsData.taskDesc}</p>

                                    <strong>TASK DEADLINE - : </strong>

                                    <p>{fetchLoggedInEmployeeAssignedTaskDetailsData.deadLine}</p>

                                </div>
                            )
                        })
                        :
                        <div className="show-no-task-message">
                            <p className="font-bold">No Tasks Assigned</p>
                        </div>
                }
            </div>
        </div>
    )
}

export default AssignedEmployeesTask;