export type fetchEmployeesDetailsProps = {
    deadLine: String
    emailId: String[]
    name: String
    taskDesc: String
    uid: String
}

export type EditEmployeesTaskManagerDialogBoxProps ={
    selectedUpdateTaskFieldUid:String
}

export type employeesTaskManagerDialogBoxFormTypes = {
    name:String
    emailId:String
}

export type ReactChangeEvent  = React.ChangeEvent<HTMLInputElement>

// type ValuePiece = Date | null;

// type Value = ValuePiece | [ValuePiece, ValuePiece];


// export type selectedUserProps = {

// }