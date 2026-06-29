import { useEffect, useState } from "react";
import { useAppDispatch } from "../../../../ReduxHooks";
import { gql, useMutation } from "@apollo/client";

import { fetchEmployeesDetailsProps } from "../../../../Types/EmployeesTaskTypes";

import "./AssignedEmployeesTask.css"

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

    if (fetchAssignedEmployeeTaskDataLoading) return (
        <div className="employee-task-loading">
            <div className="spinner"></div>
            <p>Loading your tasks...</p>
        </div>
    );

    return (
        <div id="main-page" className="assigned-tasks-page">
            <div className="assigned-tasks-container">
                <header className="assigned-tasks-header">
                    <h1 className="assigned-tasks-title">My Assigned Tasks</h1>
                    <p className="assigned-tasks-subtitle">View and manage your upcoming responsibilities</p>
                </header>

                {
                    fetchAssignedEmployeeTaskData && fetchAssignedEmployeeTaskData.fetchLoggedInEmployeeAssignedTaskDetails.length > 0 ? (
                        <div className="task-cards-grid">
                            {fetchAssignedEmployeeTaskData.fetchLoggedInEmployeeAssignedTaskDetails.map((task: fetchEmployeesDetailsProps, index: number) => {
                                return (
                                    <div className="task-card" key={index}>
                                        <div className="task-card-header">
                                            <h3 className="task-name">{task.name}</h3>
                                            <span className="task-status badge">Assigned</span>
                                        </div>
                                        
                                        <div className="task-card-body">
                                            <h4 className="task-section-label">Description</h4>
                                            <p className="task-desc">{task.taskDesc}</p>
                                        </div>

                                        <div className="task-card-footer">
                                            <div className="task-deadline">
                                                <svg className="deadline-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                                    <line x1="16" y1="2" x2="16" y2="6"></line>
                                                    <line x1="8" y1="2" x2="8" y2="6"></line>
                                                    <line x1="3" y1="10" x2="21" y2="10"></line>
                                                </svg>
                                                <span>{task.deadLine}</span>
                                            </div>
                                            <button className="task-action-btn">View Details</button>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    ) : (
                        <div className="empty-tasks-state">
                            <div className="empty-icon-wrapper">
                                <svg className="empty-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                </svg>
                            </div>
                            <h3>You're all caught up!</h3>
                            <p>No tasks are currently assigned to you.</p>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default AssignedEmployeesTask;