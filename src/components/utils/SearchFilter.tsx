import React, { useEffect } from "react";
import { FaPen } from "react-icons/fa";
import { gql, useQuery } from "@apollo/client";
import "./EmployeeStatus.css";

const fetch_employees_details_query = gql`
query employeeStatusQuery {
  fetchEmailUsersIds {
    uid
    name
    status
  }
}
`;

function EmployeeStatus() {

    const { data: showAllUsersDetailsAndStatus, loading, refetch } = useQuery(fetch_employees_details_query);

   
    return (
        <div className="employee-status-container">            
        </div>
    );
}

export default EmployeeStatus;
