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


//Chat Queries-:

export const show_chat_query = gql`
query fetchChats($showAllChatsParamters: showAllChatsInput!){
showAllChats(showAllChatsParamters: $showAllChatsParamters) {
uid
emailId
name
}
}
`
export const show_admin_chat_query = gql`
query showAllAdminChats($showAdminChatsParameters: showAdminChatsInput!){
  showAdminChats(showAdminChatsParameters: $showAdminChatsParameters) {
    uid
    emailId
    name
  }
}
`


export const show_chat_room_query = gql`
query showChatsRoom($showSenderReceiverChatParameters: showSenderReceiverChatInput!){
  showSenderReceiverChat(showSenderReceiverChatParameters: $showSenderReceiverChatParameters) {
  uid  
  senderId
    receiverId
    message
    date
  }
}
`

export const send_message_query = gql`
mutation sendMessage($sendMessageParameters: sendMessageInput!){
  sendMessage(sendMessageParameters: $sendMessageParameters) {
    uid
    senderId
    receiverId
    message
    date
  }
}
`

// export const show_sender_receiver_chat_query = gql`
// query fetchChats($showAllChatsParamters: showAllChatsInput!){
// showAllChats(showAllChatsParamters: $showAllChatsParamters) {
// uid
//   emailId
//   name
// }
// }
// `
export const message_sent_subscribe = gql`
subscription onMessageSent($messageSendParameters: messageSendInput!){
  messageSent(messageSendParameters: $messageSendParameters) {
     uid
      senderId
      receiverId
      message
      date
  }
}
`;

// export const message_sent_subscribe = gql`
//   subscription MessageSentSubscription {
//         messageSent {
//           message
//           senderId
//           receiverId
//           uid
//           date
//         }
//       }
// `


export const sendMessageTypeQuery = gql`
mutation sendMessageType($sendMessageTypeIndicatorParameters: sendMessageTypeIndicatorInput!){
  sendMessageTypeIndicator(sendMessageTypeIndicatorParameters: $sendMessageTypeIndicatorParameters) {
  success
  }
}`


export const typingIndicatorSubscribe = gql`
subscription typingIndicatorSubscribe{
  typingIndicator {
    success
  }
}

`