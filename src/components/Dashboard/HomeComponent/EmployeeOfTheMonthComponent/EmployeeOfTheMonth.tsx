import "./EmployeeOfTheMonth.css"
import image from "../../../RegisterComponent/images/add-user.png"
import { gql, useQuery } from "@apollo/client";
import { useEffect } from "react";

function EmployeeOfTheMonth() {

    const fetch_employee_of_the_month_query = gql`
    query fetchEmployeesDetails{
  showAllEmployee{
       name,
       emailId,
       employeeOfTheMonth,
       department
 }
}
`

    const { data: fetchEmployeeOfTheMonth, loading: fetchEmployeeOfTheMonthLoading } = useQuery(fetch_employee_of_the_month_query)

    if (fetchEmployeeOfTheMonthLoading) return <div>Loading...</div>

    // useEffect(() => {
    //     console.log(fetchEmployeeOfTheMonth.showAllEmployee);
    // })

    return (
        <div className="employee-of-the-month-component">

            {
                fetchEmployeeOfTheMonth.showAllEmployee.map((fetchEmployeeOfTheMonthData: any) => {
                    if (fetchEmployeeOfTheMonthData.employeeOfTheMonth === true) {

                        return <div className="employee-of-the-month-div">
                            <h3>Employee Of The Month</h3>

                            <img className="image" src={image} />

                            <h4>{fetchEmployeeOfTheMonthData.name}</h4>
                            <p>{fetchEmployeeOfTheMonthData.department}</p>
                        </div>
                    }
                })
            }
        </div>
    )
}

export default EmployeeOfTheMonth;

