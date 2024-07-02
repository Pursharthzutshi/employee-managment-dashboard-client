import { gql } from "@apollo/client";

export const checkEmployeeLoggedInAuthQuery = gql`
mutation userLogin($userLoginParameters: createLoginInput!){
  createUserLogin(userLoginParameters: $userLoginParameters) {
  uid
  name
  success
  message
  token
  }
}
`


export const checkAdminLoggedInAuthQuery = gql`
mutation adminLogin($adminLoginParameters: createAdminLoginInput!){
  createAdminLogin(adminLoginParameters: $adminLoginParameters) {
    uid
    success
    message
    token
    admin
    name
    
  }
}
`