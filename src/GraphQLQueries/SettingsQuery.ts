import { gql } from "@apollo/client"
import { useAppSelector } from "../ReduxHooks"


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
status
message

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