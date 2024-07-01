import { gql } from "@apollo/client"


//CreateNewEmployeeAccout Queries

export const show_all_employees_data_query = gql`
query fetchemployeesDataQuery{
   showAllEmployee {
   uid
   name
   emailId
}
}`

export const signUpquery = gql`
mutation create($userSignUpParameters: createUserSignUpInput!){
createUserSignUp(userSignUpParameters: $userSignUpParameters) {
success
message
}
}
`