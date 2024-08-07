export type chartDataProps = {
  labels: string[] | undefined,
  datasets: datasetsProps[]
}

export type datasetsProps = {
  label: string,
  data: number[],
  backgroundColor?: string[],
  borderWidth: number
}

export type employeeStatusProps = {
  uid: string
  name: string
  status: boolean
}

export type employeeOfTheMonthProps = {
  department: string
  emailId: string
  name: string
  employeeOfTheMonth: boolean
}


export type employeeLeavesProps = {
  showLoggedInEmployeesLeaveDetailsData: employeeLeavesProps[]
  id: string
  uid: string
  date: string
  employeeLeaveApplicationUid: string
  employeeName: string
  leaveApprovedButtonsStatus: boolean
  leaveReason: boolean
  leaveStatus: boolean

}

export type messageType = {
  date: string
  id: string
  uid:string
  name:string
  emailId:string
  senderId: string
  message: string

}


type chatDetailsType = {
  senderId: string;
  receiverId: string;
  message: string;
}

export type fetchShowChatsDataType = {
  showAllChats: messageType[];
  showSenderReceiverChat: messageType[];
  uid: string;
  emailId: string;
  name: string;
};

export type showLoggedInEmployeesLeaveDetailsDataType = {
  showLoggedInEmployeesLeaveDetailsData: employeeLeavesProps[]

}
export type Employee = {
  emailId: string;
  name: string;
  uid: string;
};

export type showAllEmployeesCacheDataProps = {
  showAllEmployee: Employee[];
};

export type showAllEmployeesCacheDataUidType = {
  uid: string
}