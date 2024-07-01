import React, { useEffect } from "react";
import { FaPen } from "react-icons/fa";
import { gql, useQuery } from "@apollo/client";
import { useAppSelector } from "../../../../ReduxHooks";
import "./EmployeeStatus.css";
import { fetch_employees_details_query } from "../../../../GraphQLQueries/HomeQuery";



function EmployeeStatus() {
    const checkInStatus = useAppSelector((state) => state.CheckInStatusSlicer.checkInStatus);

    const { data: showAllUsersDetailsAndStatus, loading, refetch } = useQuery(fetch_employees_details_query);

    useEffect(() => {
        if (showAllUsersDetailsAndStatus) {
            console.log(showAllUsersDetailsAndStatus.fetchEmailUsersIds);
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
                    {/* {showAllUsersDetailsAndStatus?.fetchEmailUsersIds.map((val: any) => (
            <tr key={val.uid} className="employee-table-content-div">
              <td>{val.name}</td>
              <td>{val.status ? "true" : "false"}</td>
              <td>
                <FaPen />
              </td>
            </tr>
          ))} */}

                    {showAllUsersDetailsAndStatus?.fetchEmailUsersIds.filter((val: any) => {
                        return val
                    }).map((val: any) => (
                        <tr key={val.uid} className="employee-table-content-div">
                            <td>{val.name}</td>
                            <td>{val.status ? "true" : "false"}</td>
                            <td>
                                <FaPen />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default EmployeeStatus;
