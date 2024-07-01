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
`;