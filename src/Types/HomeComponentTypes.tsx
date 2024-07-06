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
  uid:string
  name:string
  status:boolean
}

export type employeeOfTheMonthProps = {
  department:string
  emailId:string
  name:string
  employeeOfTheMonth:boolean
}
