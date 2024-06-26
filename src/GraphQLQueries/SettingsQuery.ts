import { gql } from "@apollo/client"


//SettingsProfileForm Query

export const fetchAdminProfileDetails = gql`
query showAdminProfileDetails($fetchAdminProfileDetailsParameters: fetchAdminProfileDetailsInput!){
  fetchAdminProfileDetails(fetchAdminProfileDetailsParameters: $fetchAdminProfileDetailsParameters) {
  uid
    name
    emailId
  }
} 
  `

export const updateProfileNameQuery = gql`
  mutation updateProfileName($updateProfileNameParameters: updateProfileNameInput!){
  updateName(updateProfileNameParameters: $updateProfileNameParameters) {
    name
  }
}
  `
export const updateProfilePasswordQuery = gql`
  mutation updateProfilePassword($updateProfilePasswordParameters: updateProfilePasswordInput!){
  updatePassword(updateProfilePasswordParameters: $updateProfilePasswordParameters) {
    password
  }
}
  `