export type addTasksCacheType = {
    deadLine: string
    emailId: string[]
    name: string
    taskDesc: string
    uid: string
    fetchEmployeesTaskDetails: string
}

type AddedSignUpDataType = {
    department: string
    emailId: string
    employeeOfTheMonth: boolean
    genderType: boolean
    name: string
    status: boolean
    uid: string
}


export type createNewEmployeeAccountCacheType = {
    showAllEmployee: AddedSignUpDataType[]
    messsage: string
    success: boolean
}

export type showAllAdminType = {
    name: string
    showAllAdmin: string
}

export type fetchLeaveDetailsDataTypes = {
    date: string
    employeeLeaveApplicationUid: string
    employeeName: string
    leaveReason: string
    leaveStatus: boolean
    uid: string

}