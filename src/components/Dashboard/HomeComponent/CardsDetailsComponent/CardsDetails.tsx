import React, { useEffect, useState } from "react";
import "../CardsDetailsComponent/CardsDetails.css"
import { FaAccusoft, FaBuilding, FaIdCard, FaTasks, FaUser } from "react-icons/fa";
import { gql, useQuery } from "@apollo/client";
import { useAppSelector } from "../../../../ReduxHooks";
// import { useSelect } from "react-select-search";

const fetchTotalEmployeesAndDepartmentsQuery = gql`
query fetchEmployeesDetails{
showAllEmployee{
   name,
   emailId,
   employeeOfTheMonth,
   department
}
}`

const fetchTotalEmployeesTasks = gql`
query fetchEmployeesTaskDetails{
  fetchEmployeesTaskDetails {
    name
    emailId
  }
}`

const fetchTotalAdmin = gql`
query fetchAdminDetails{
  showAllAdmin {
    name
  }
}
`

function CardsDetails() {

    const [totalDepartmentCount, setTotalDepartmentCount] = useState(0);

    const [totalEmployeesCount, setTotalEmployeesCount] = useState(0);
    const [totalEmployeesTask, setTotalEmployeesTask] = useState(0);
    
    // const [totalDepartmentList, setTotalDepartmentList] = useState<any>([]);

    const [totalAdminCount,setTotalAdminCount] = useState(0);

    const {loading : adminAccountDetailsLoading} = useQuery(fetchTotalAdmin,({
        onCompleted:(AdminAccountDetailsData)=>{
            console.log(AdminAccountDetailsData)
            setTotalAdminCount(AdminAccountDetailsData.showAllAdmin.length)
        }
    }));


    const { loading: EmployeesAccountDetailsLoading } = useQuery(fetchTotalEmployeesAndDepartmentsQuery, ({
        onCompleted: (EmployeesAccountDetailsData) => {

            // EmployeesAccountDetailsData.showAllEmployee.map((data:any)=>{
            //     return setTotalDepartmentList((prevVal:any)=>[...prevVal,data])
            // });

            // // console.log(EmployeesAccountDetailsData.showAllEmployee.department[0])
            setTotalEmployeesCount(EmployeesAccountDetailsData.showAllEmployee.length)

            // const map = new Map();
            // for (let i = 0; i < EmployeesAccountDetailsData.showAllEmployee.length; i++) {
            //     if (map.has(EmployeesAccountDetailsData.showAllEmployee[i])) {
            //         setTotalDepartmentCount((totalDepartmentCount)=>totalDepartmentCount+1)
            //         map.set(EmployeesAccountDetailsData.showAllEmployee[i],map.get(EmployeesAccountDetailsData.showAllEmployee[i]+1))
            //     }else{
            //         map.set(EmployeesAccountDetailsData.showAllEmployee[i],1)
            //     }
            // }
            // console.log(map)
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


  

    if (EmployeesAccountDetailsLoading) return <p>Loading ...</p>
    if (EmployeesTotalTasksLoading) return <p>Loading ...</p>
    if(adminAccountDetailsLoading) return <p>Loading ...</p>
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
                        <p className="font-semibold text-lg">Loreum Ipsum</p>
                        <h4 className="font-bold text-xl">20</h4>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default CardsDetails;