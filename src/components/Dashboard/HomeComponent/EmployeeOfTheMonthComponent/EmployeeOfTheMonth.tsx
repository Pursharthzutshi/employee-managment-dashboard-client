import image from "../../../RegisterComponent/images/add-user.png"
import { gql, useQuery } from "@apollo/client";
import { useEffect } from "react";

import "./EmployeeOfTheMonth.css"
import { employeeOfTheMonthProps } from "../../../../Types/HomeComponentTypes";

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
                fetchEmployeeOfTheMonth.showAllEmployee.length > 0 ?
                    fetchEmployeeOfTheMonth.showAllEmployee.map((fetchEmployeeOfTheMonthData: employeeOfTheMonthProps) => {
                        if (fetchEmployeeOfTheMonthData.employeeOfTheMonth === true) {

                            return <div className="employee-of-the-month-div">
                                <p className="font-bold text-xl">Employee Of The Month</p>
                                <div className="employee-of-the-month-details-div">
                                    <img className="image" src={image} />
                                    <p className="font-bold text-lg">{fetchEmployeeOfTheMonthData.name}</p>
                                    <p>{fetchEmployeeOfTheMonthData.department}</p>
                                </div>
                            </div>
                        }
                    }) : <div className="employee-of-the-month-div">
                        <p className="font-bold text-center">No Employee Of The Month</p>
                    </div>
            }
            {

            }
        </div>
    )
}

export default EmployeeOfTheMonth;

