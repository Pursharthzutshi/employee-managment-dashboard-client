import { gql } from "@apollo/client"

export const fetchTotalEmployeesAndDepartmentsQuery = gql`
query fetchEmployeesDetails{
showAllEmployee{
   name,
   emailId,
   employeeOfTheMonth,
   department
}
}`

export const fetchTotalEmployeesTasks = gql`
query fetchEmployeesTaskDetails{
  fetchEmployeesTaskDetails {
    name
    emailId
  }
}
  `

export const fetchTotalAdmin = gql`
query fetchAdminDetails{
  showAllAdmin {
    name
  }
}
`