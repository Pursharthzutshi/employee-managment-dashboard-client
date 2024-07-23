import { useState } from "react";
import { useApolloClient, useMutation, useQuery } from "@apollo/client";
import { useDispatch } from "react-redux";
import { setSearchFilter } from "../../../ReduxSlicers/SearchFilterSilcer";
import { useAppSelector } from "../../../ReduxHooks";
import { EmployeesAccountDataProps } from "../../../Types/ShowAllEmployeesComponentTypes";
import NavBar from "../../NavBarComponent/NavBar";

import { show_all_employees_data_query, update_Employee_Of_The_Month_query } from "../../../GraphQLQueries/ShowAllEmployeesQuery";

import DeleteEmployeeAccountDialogBox from "./DeleteEmployeeAccountDialogBox";
import { FaCheck } from "react-icons/fa";

import "../ShowAllEmployeesComponent/ShowAllEmployees.css"
import "../ShowAllEmployeesComponent/ShowAllEmployeesResponsive.css"
import "../ShowAllEmployeesComponent/DeleteEmployeeAccountDialogBox.css"
// import { client } from "../../..";

function ShowAllEmployees() {

    const [selectedEmployeeAccountUid, setSelectedEmployeeAccountUid] = useState<String>("")

    const searchFilter = useAppSelector((state) => state.SearchFilterSilcer.SearchFilter)

    const [showDeleteEmployeeAccountDialogBoxStatus, setShowDeleteEmployeeAccountDialogBoxStatus] = useState(false);



    const [showAssignEmployeeOfTheMonthStatus, setShowAssignEmployeeOfTheMonthStatus] = useState(false);

    const Dispatch = useDispatch()

    const [assignEmployeeOfTheMonth] = useMutation(update_Employee_Of_The_Month_query,{
        onError:(err)=>{
            console.log(err)
        }
    });


    const { data: ShowAllEmployeesData, loading, refetch } = useQuery(show_all_employees_data_query);

    const showDeleteEmployeeAccountDialogBox = (uid: String) => {
        setShowDeleteEmployeeAccountDialogBoxStatus(true)
        setSelectedEmployeeAccountUid(uid)
    }

    const showAssignEmployeeOfTheMonth = (selectedUid: string) => {

        assignEmployeeOfTheMonth({
            variables: {
                updateEmployeeOfTheMonthParameters: {
                    uid: selectedUid,
                    employeeOfTheMonth: true
                },
            },
        })
        setShowAssignEmployeeOfTheMonthStatus(true);
    }

    setTimeout(() => {
        setShowAssignEmployeeOfTheMonthStatus(false);
    }, 3000)


    const adminStatus = useAppSelector((state) => state.LocalStorageSlicer.adminStatus)

    if (loading) return <p>Loading...</p>

    return (
        <div id="main-page" className="show-all-employees-component">
            {
                showAssignEmployeeOfTheMonthStatus &&

                <div className="assign-employee-of-the-month-message-box">
                    <FaCheck className="assign-employee-of-the-month-message-box-icon" />
                    <p>New Employee of the Month Assigned</p>
                </div>
            }
            <NavBar />

            <div>
                <p className="font-bold text-xl">All Employees</p>
                <br></br>
                {
                    ShowAllEmployeesData.showAllEmployee.length > 0
                    && <input data-testid="search-input" onChange={(e) => Dispatch(setSearchFilter(e.target.value))} className="search-employees-input" placeholder="Search Employees" type="text" />

                }
                <div className="employees-details-container">
                    {
                        ShowAllEmployeesData.showAllEmployee.length > 0 ?
                            ShowAllEmployeesData.showAllEmployee.filter((filteredEmployeesAccountData: EmployeesAccountDataProps) => {

                                if (filteredEmployeesAccountData.name.toLowerCase().includes(searchFilter.toLowerCase())) {
                                    return filteredEmployeesAccountData;
                                } else if (searchFilter === "") {
                                    return filteredEmployeesAccountData;
                                }
                            }).map((EmployeesAccountData: EmployeesAccountDataProps) => {
                                return (
                                    <div className="employees-details-div" >
                                        <strong>Name:</strong><p data-testid="employee-name" className="employee-name">{EmployeesAccountData.name}</p>
                                        <strong>Email ID:</strong><p className="email-id">{EmployeesAccountData.emailId}</p>
                                        {adminStatus ?
                                            <div>
                                                <button onClick={() => {
                                                    showAssignEmployeeOfTheMonth(EmployeesAccountData.uid)
                                                }} className="employees-details-button font-semibold ">Assign Employee of the month</button>
                                                <button className="delete-employee-Account-button font-semibold text-sm mt-4" onClick={() => showDeleteEmployeeAccountDialogBox(EmployeesAccountData.uid)} >Delete Employee Account</button>
                                            </div>
                                            : null}
                                    </div>
                                )
                            })
                            :
                            <div className="show-no-task-message">
                                <p className="font-bold">No Employees Added</p>
                            </div>
                    }


                    {
                        showDeleteEmployeeAccountDialogBoxStatus ?
                            <DeleteEmployeeAccountDialogBox showDeleteEmployeeAccountDialogBoxStatus={showDeleteEmployeeAccountDialogBoxStatus} setShowDeleteEmployeeAccountDialogBoxStatus={setShowDeleteEmployeeAccountDialogBoxStatus} uid={selectedEmployeeAccountUid} />
                            :
                            null
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