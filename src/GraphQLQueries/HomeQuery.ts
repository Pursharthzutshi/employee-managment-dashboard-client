//Home Query

import { gql } from "@apollo/client";


export const show_all_employees_charts_data_query = gql`
query qd {
 showAllEmployee {
   genderType
   department
 }
}`

//EmployeeStatusOfMonth Query

export const fetch_employees_details_query = gql`
query employeeStatusQuery {
  fetchEmailUsersIds {
    uid
    name
    status
  }
}
`

export const insert_employees_leave_data_query = gql`
mutation employeeLeaveTable($insertEmployeesLeaveDetailsParameters: insertEmployeesLeaveDetailsInput!){
  insertEmployeesLeaveDetails(insertEmployeesLeaveDetailsParameters: $insertEmployeesLeaveDetailsParameters) {
employeeLeaveData {
  uid
  date
  leaveReason
  leaveStatus
}
success
message
  }
}
  `

export const employees_leave_details_query = gql`
query employeeLeaveDetails{
fetchEmployeesLeaveDetails {
  uid
  leaveStatus
  employeeName
  leaveReason
  employeeLeaveApplicationUid
  date
  leaveApprovedButtonsStatus
}
}
`

export const update_employee_leave_status = gql`
mutation updateEmployeeLeaveStatus($updateEmployeeLeaveStatusParameters: updateEmployeeLeaveStatusInput!){
  updateEmployeeLeaveStatus(updateEmployeeLeaveStatusParameters: $updateEmployeeLeaveStatusParameters) {
    
  updatedEmployeeLeaveStatusData{
      uid
  leaveStatus
  employeeName
  leaveReason
  employeeLeaveApplicationUid
  date
    }
  success
  message
  }
}`

export const show_logged_in_employees_leave_details_data_query = gql`
query showLoggedInEmployeesLeaveDetailsDataQuery($showLoggedInEmployeesLeaveDetailsDataParameters: showLoggedInEmployeesLeaveDetailsDataInput!){
  showLoggedInEmployeesLeaveDetailsData(showLoggedInEmployeesLeaveDetailsDataParameters: $showLoggedInEmployeesLeaveDetailsDataParameters) {
      uid
  leaveStatus
  employeeName
  leaveReason
  employeeLeaveApplicationUid
  date
  }
}
`