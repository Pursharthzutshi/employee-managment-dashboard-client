import { gql } from "@apollo/client";


//ShowAllEmployee Query

export const update_Employee_Of_The_Month_query = gql`
mutation updateEmployeeOfTheMonth($updateEmployeeOfTheMonthParameters: updateEmployeeOfTheMonthInput!){
  updateEmployeeOfTheMonth(updateEmployeeOfTheMonthParameters: $updateEmployeeOfTheMonthParameters) {
    uid,
    employeeOfTheMonth
  }
}
  `


export const show_all_employees_data_query = gql`
query fetchemployeesDataQuery{
   showAllEmployee {
   uid
   name
   emailId
}
}`


