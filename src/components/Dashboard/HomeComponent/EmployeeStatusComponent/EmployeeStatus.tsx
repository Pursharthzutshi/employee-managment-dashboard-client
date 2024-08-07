import React, { useEffect } from "react";
import { FaPen } from "react-icons/fa";
import { gql, useQuery } from "@apollo/client";
import { useAppSelector } from "../../../../ReduxHooks";
import { fetch_employees_details_query } from "../../../../GraphQLQueries/HomeQuery";
import { employeeStatusProps } from "../../../../Types/HomeComponentTypes";

import "./EmployeeStatus.css";


function EmployeeStatus() {

    const { data: showAllUsersDetailsAndStatus, loading, refetch } = useQuery(fetch_employees_details_query);

    useEffect(() => {
        if (showAllUsersDetailsAndStatus) {
            refetch();
        }
    }, [showAllUsersDetailsAndStatus, refetch]);

    if (loading) return <p>Loading...</p>;

    return (
        <div className="employee-status-container">
            <h4>Employee Status</h4>
            <input className="search" type="search" />
            <table className="employee-table-heading-content-div">
                <thead>
                    <tr className="employee-table-heading-div">
                        <th>Name</th>
                        <th>Email Id</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        showAllUsersDetailsAndStatus?.fetchEmailUsersIds.length > 0 ?
                    showAllUsersDetailsAndStatus?.fetchEmailUsersIds.map((val: employeeStatusProps) =>
                    (
                    <tr key={val.uid} className="employee-table-content-div">
                        <td>{val.name}</td>
                        <td>{val.status ? "true" : "false"}</td>
                        <td>
                            <FaPen />
                        </td>
                    </tr>
                    ))
                    :
                    <div className="show-no-task-message">
                    <p className="font-bold">No Employee of the Month</p>
                  </div>
                    }
             
                </tbody>
            </table>
        </div>
    );
}

export default EmployeeStatus;
