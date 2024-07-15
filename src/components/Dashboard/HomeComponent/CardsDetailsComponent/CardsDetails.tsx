import React, { useEffect, useState } from "react";
import "../CardsDetailsComponent/CardsDetails.css"
import { FaAccusoft, FaBuilding, FaIdCard, FaTasks, FaUser } from "react-icons/fa";
import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { useAppSelector } from "../../../../ReduxHooks";
import { assertValidExecutionArguments } from "graphql/execution/execute";
import { fetchTotalAdmin, fetchTotalEmployeesAndDepartmentsQuery, fetchTotalEmployeesTasks } from "../../../../GraphQLQueries/CardsDetailsQuery";
// import { useSelect } from "react-select-search";



function CardsDetails() {

    const { data: das, loading } = useQuery(fetchTotalEmployeesAndDepartmentsQuery, ({
        onCompleted: (data) => {
            console.log(data)
        }
    }));

    // const [data]  = useLazyQuery(fetchTotalEmployeesAndDepartmentsQuery)


    const [totalDepartmentCount, setTotalDepartmentCount] = useState(0);

    const [totalEmployeesCount, setTotalEmployeesCount] = useState(0);
    const [totalEmployeesTask, setTotalEmployeesTask] = useState(0);

    // const [totalDepartmentList, setTotalDepartmentList] = useState<any>([]);

    const [totalAdminCount, setTotalAdminCount] = useState(0);

    const { loading: adminAccountDetailsLoading } = useQuery(fetchTotalAdmin, ({
        onCompleted: (AdminAccountDetailsData) => {
            console.log(AdminAccountDetailsData)
            setTotalAdminCount(AdminAccountDetailsData.showAllAdmin.length)
        },
    
    }
    )
    );


    const { loading: EmployeesAccountDetailsLoading } = useQuery(fetchTotalEmployeesAndDepartmentsQuery, ({
        onCompleted: (EmployeesAccountDetailsData) => {
            setTotalEmployeesCount(EmployeesAccountDetailsData.showAllEmployee.length)


        },
        onError: (err) => {
            console.log(err);
        }
    }))

    const { loading: EmployeesTotalTasksLoading } = useQuery(fetchTotalEmployeesTasks, ({
        onCompleted: (EmployeesTotalTasksData) => {
            console.log(EmployeesTotalTasksData.fetchEmployeesTaskDetails.length)
            setTotalEmployeesTask(EmployeesTotalTasksData.fetchEmployeesTaskDetails.length)

        },
        onError: (err) => {
            console.log(err);
        }
    }))




    if (EmployeesAccountDetailsLoading) return <div >Loadng ...</div>
    // if (EmployeesTotalTasksLoading) return <p>Loading ...</p>
    // if (adminAccountDetailsLoading) return <p>Loading ...</p>
    return (
        <div>

            <div className="card-details-container">

                <div className="card-details-div">
                    <FaUser className="cards-icons" />

                    <div>
                        <p className="font-semibold text-lg">Total Employees</p>
                        <h4 className="font-bold text-xl">{totalEmployeesCount}</h4>
                    </div>
                </div>

                <div className="card-details-div">
                    <FaTasks className="cards-icons" />

                    <div>
                        <p className="font-semibold text-lg">Total Tasks</p>
                        <h4 className="font-bold text-xl">{totalEmployeesTask}</h4>
                    </div>
                </div>

                <div className="card-details-div">
                    <FaIdCard className="cards-icons" />

                    <div>
                        <p className="font-semibold text-lg">Total Admins</p>
                        <h4 className="font-bold text-xl">{totalAdminCount}</h4>
                    </div>
                </div>

                <div className="card-details-div">
                    <FaAccusoft className="cards-icons" />

                    <div>
                        <p className="font-semibold text-lg">Total Departments</p>
                        <h4 className="font-bold text-xl">5</h4>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default CardsDetails;