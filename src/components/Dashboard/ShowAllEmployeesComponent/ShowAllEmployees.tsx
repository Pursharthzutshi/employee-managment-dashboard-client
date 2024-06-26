import { useEffect, useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useDispatch } from "react-redux";
import { setSearchFilter } from "../../../ReduxSlicers/SearchFilterSilcer";
import { useAppSelector } from "../../../ReduxHooks";
import { EmployeesAccountDataProps } from "../../../Types/ShowAllEmployeesComponentTypes";
import NavBar from "../../NavBarComponent/NavBar";


import "../ShowAllEmployeesComponent/ShowAllEmployees.css"
import { Link } from "react-router-dom";

const show_all_employees_data_query = gql`
query fetchemployeesDataQuery{
   showAllEmployee {
   uid
   name
   emailId
}
}`

const update_Employee_Of_The_Month_query = gql`
mutation updateEmployeeOfTheMonth($updateEmployeeOfTheMonthParameters: updateEmployeeOfTheMonthInput!){
  updateEmployeeOfTheMonth(updateEmployeeOfTheMonthParameters: $updateEmployeeOfTheMonthParameters) {
    uid,
    employeeOfTheMonth
  }
}
  `

function ShowAllEmployees() {
    const searchFilter = useAppSelector((state) => state.SearchFilterSilcer.SearchFilter)
    const [totalEmployeeDetailsCount,setTotalEmployeeDetailsCount] = useState(0);
   
    const createEmployeeNewAccountStatus = useAppSelector((state)=>state.createEmployeeNewAccountStatusSlicer.createEmployeeNewAccountStatus)

    const Dispatch = useDispatch()

    const [assignEmployeeOfTheMonth] = useMutation(update_Employee_Of_The_Month_query,({
        onError:(err)=>{
            console.log(err)
        }
    }));


    const { data: ShowAllEmployeesData, loading,refetch} = useQuery(show_all_employees_data_query, {
        onCompleted: (data) => {
            console.log(data)
            refetch()
        }
    }
    );

    // const assignEmployeeOfTheMonth = (val:any)=>{
    //     console.log(val)
    // }

    const adminStatus = useAppSelector((state) => state.LocalStorageSlicer.adminStatus)

    if (loading) return <p>Loading...</p>

    return (
        <div  id="main-page" className="show-all-employees-component">

            <NavBar />
            {/* <input  type="search" /> */}

  
    <div>
    <p className="font-bold text-xl">All Employees</p>
    <br></br>
    <input data-testid="search-input" onChange={(e) => Dispatch(setSearchFilter(e.target.value))} className="search-employees-input" placeholder="Search Employees" type="text" />
    <div className="employees-details-container">
        { 
            ShowAllEmployeesData.showAllEmployee.filter((filteredEmployeesAccountData: EmployeesAccountDataProps) => {

                if (filteredEmployeesAccountData.name.toLowerCase().includes(searchFilter.toLowerCase())) {
                    console.log(filteredEmployeesAccountData)
                    return filteredEmployeesAccountData;
                } else if (searchFilter === "") {
                    return filteredEmployeesAccountData;
                }
            }).map((EmployeesAccountData: EmployeesAccountDataProps) => {
                console.log(EmployeesAccountData)
                return (
                    <div className="employees-details-div" >
                        <strong>Name:</strong><p className="employee-name">{EmployeesAccountData.name}</p>
                        <strong>Email ID:</strong><p className="email-id">{EmployeesAccountData.emailId}</p>
                        {adminStatus ? <button onClick={() => {
                            assignEmployeeOfTheMonth({
                                variables: {
                                    updateEmployeeOfTheMonthParameters: {
                                        uid: EmployeesAccountData.uid,
                                        employeeOfTheMonth: true
                                    },
                                },
                            })

                        }} className="employees-details-button font-semibold text-sm">Assign Employee of the month</button> : null}
                    </div>
                )
            })
        }
    </div>
    </div>
    {/* :
    <div className="no-employee-div">
        <h3>No Employees </h3>
        <p>Please Add New Employee </p>
        <Link className="add-new-employee-link" to="/createEmployeeNewAccount">Add New Employees</Link>
    </div> */}

         
        </div>
    )
}

export default ShowAllEmployees;