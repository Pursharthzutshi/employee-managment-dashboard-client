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


    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col items-center justify-center text-center h-full transition-all hover:shadow-md min-h-[300px]">
            {
                fetchEmployeeOfTheMonth.showAllEmployee.length > 0 ?
                    fetchEmployeeOfTheMonth.showAllEmployee.map((fetchEmployeeOfTheMonthData: employeeOfTheMonthProps) => {
                        if (fetchEmployeeOfTheMonthData.employeeOfTheMonth === true) {

                            return <div key={fetchEmployeeOfTheMonthData.emailId} className="flex flex-col items-center">
                                <h3 className="text-lg font-bold text-slate-800 mb-6 tracking-tight">Employee Of The Month</h3>
                                <div className="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center mb-4 border-4 border-indigo-100 shadow-sm transition-transform hover:scale-105 duration-300">
                                    <img className="w-12 h-12 object-contain opacity-80" src={image} alt="Employee" />
                                </div>
                                <p className="font-bold text-xl text-indigo-600 mb-1">{fetchEmployeeOfTheMonthData.name}</p>
                                <p className="text-sm font-medium text-slate-500 bg-slate-50 px-4 py-1.5 rounded-full border border-slate-100">{fetchEmployeeOfTheMonthData.department}</p>
                            </div>
                        }
                        return null;
                    }) : <div className="flex flex-col items-center justify-center h-full text-slate-500 space-y-3">
                        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center">
                            <img className="w-8 h-8 opacity-30 grayscale" src={image} alt="No Employee" />
                        </div>
                        <p className="font-bold text-slate-400">No Employee Of The Month</p>
                    </div>
            }
        </div>
    )
}

export default EmployeeOfTheMonth;

