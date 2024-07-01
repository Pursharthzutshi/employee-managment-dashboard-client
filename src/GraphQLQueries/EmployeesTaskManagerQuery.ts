import { gql } from "@apollo/client";

export const addEmployeesTask = gql`
mutation AddedEmployeeTaskResponse($employeesTaskParameters: createEmployeesTaskInput!){
  createEmployeesTask(employeesTaskParameters: $employeesTaskParameters) {
    success 
    message
  }
}
`

export const showUsersEmailIdsQuery = gql`
query fetchEmailUsersIds{
  fetchEmailUsersIds {
  name  
  emailId
  }
}
`

//EditEmployeesTaskManagerDialogBox Queries

export const fetch_employees_task_details_query = gql`
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

export const edit_employees_task_details_query = gql`
mutation editEmployeesDetails($editEmployeesTaskParameter: editEmployeesTaskInput!){
  editEmployeesTask(editEmployeesTaskParameter: $editEmployeesTaskParameter) {
name
emailId
taskDesc
deadLine
  }
}
`

