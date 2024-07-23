export type fetchEmployeesDetailsProps = {
    deadLine: string
    emailId: string[]
    name: string
    taskDesc: string
    uid: string
}

export type FetchEmployeesTaskDetailsQueryResult = {
    fetchEmployeesTaskDetails: fetchEmployeesDetailsProps[];
}

export type EditEmployeesTaskManagerDialogBoxProps ={
    selectedUpdateTaskFieldUid:string
}

export type employeesTaskManagerDialogBoxFormTypes = {
    name:string
    emailId:string
}

export type fetchEmailUsersIdsProps ={
    name:string
    emailId:string
}

export type fetchTaskDeleteDataType = {
    uid:string
    deadLine:string
    emailId:string[]
    name:string
    taskDesc:string
    fetchEmployeesTaskDetails:fetchEmployeesTaskDetailsType
}


export type fetchEmployeesTaskDetailsType = {
    uid: void[] | undefined
    fetchEmployeesTaskDetails:fetchTaskDeleteDataType[]
}

export type ReactChangeEvent  = React.ChangeEvent<HTMLInputElement>

