import React, { useEffect, useState } from "react";
import { FaAccusoft, FaIdCard, FaTasks, FaUser } from "react-icons/fa";
import {  useQuery } from "@apollo/client";
import { fetchTotalAdmin, fetchTotalEmployeesAndDepartmentsQuery, fetchTotalEmployeesTasks } from "../../../../GraphQLQueries/CardsDetailsQuery";

import "../CardsDetailsComponent/CardsDetails.css"

function CardsDetails() {

    // const { data: das, loading } = useQuery(fetchTotalEmployeesAndDepartmentsQuery, ({
    //     onCompleted: (data) => {
    //     }
    // }));




    const [totalEmployeesCount, setTotalEmployeesCount] = useState(0);
    const [totalEmployeesTask, setTotalEmployeesTask] = useState(0);


    const [totalAdminCount, setTotalAdminCount] = useState(0);

    const { loading: adminAccountDetailsLoading } = useQuery(fetchTotalAdmin, ({
        onCompleted: (AdminAccountDetailsData) => {
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
            setTotalEmployeesTask(EmployeesTotalTasksData.fetchEmployeesTaskDetails.length)
        },
        onError: (err) => {
            console.log(err);
        }
    }))




    if (EmployeesAccountDetailsLoading) return <div >Loading ...</div>
    if (EmployeesTotalTasksLoading) return <p>Loading ...</p>
    if (adminAccountDetailsLoading) return <p>Loading ...</p>

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mt-2">

            {/* Total Employees */}
            <div className="bg-white rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.02)] border border-gray-200/70 p-5 transition-all hover:border-gray-300">
                <div className="flex justify-between items-start mb-4">
                    <p className="text-slate-500 text-[11px] font-bold uppercase tracking-widest">Total Employees</p>
                    <div className="p-1.5 bg-blue-50/50 text-blue-600 rounded border border-blue-100">
                        <FaUser className="text-[13px]" />
                    </div>
                </div>
                <div className="flex items-end space-x-2.5">
                    <h4 className="text-slate-900 font-bold text-3xl tracking-tight leading-none">{totalEmployeesCount}</h4>
                    <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100/50 mb-0.5">↑ 12%</span>
                </div>
            </div>

            {/* Total Tasks */}
            <div className="bg-white rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.02)] border border-gray-200/70 p-5 transition-all hover:border-gray-300">
                <div className="flex justify-between items-start mb-4">
                    <p className="text-slate-500 text-[11px] font-bold uppercase tracking-widest">Active Tasks</p>
                    <div className="p-1.5 bg-indigo-50/50 text-indigo-600 rounded border border-indigo-100">
                        <FaTasks className="text-[13px]" />
                    </div>
                </div>
                <div className="flex items-end space-x-2.5">
                    <h4 className="text-slate-900 font-bold text-3xl tracking-tight leading-none">{totalEmployeesTask}</h4>
                    <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100/50 mb-0.5">↑ 8%</span>
                </div>
            </div>

            {/* Total Admins */}
            <div className="bg-white rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.02)] border border-gray-200/70 p-5 transition-all hover:border-gray-300">
                <div className="flex justify-between items-start mb-4">
                    <p className="text-slate-500 text-[11px] font-bold uppercase tracking-widest">Total Admins</p>
                    <div className="p-1.5 bg-emerald-50/50 text-emerald-600 rounded border border-emerald-100">
                        <FaIdCard className="text-[13px]" />
                    </div>
                </div>
                <div className="flex items-end space-x-2.5">
                    <h4 className="text-slate-900 font-bold text-3xl tracking-tight leading-none">{totalAdminCount}</h4>
                    <span className="text-[11px] font-bold text-slate-500 bg-slate-50 px-1.5 py-0.5 rounded border border-gray-100 mb-0.5">- 0%</span>
                </div>
            </div>

            {/* Total Departments */}
            <div className="bg-white rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.02)] border border-gray-200/70 p-5 transition-all hover:border-gray-300">
                <div className="flex justify-between items-start mb-4">
                    <p className="text-slate-500 text-[11px] font-bold uppercase tracking-widest">Departments</p>
                    <div className="p-1.5 bg-purple-50/50 text-purple-600 rounded border border-purple-100">
                        <FaAccusoft className="text-[13px]" />
                    </div>
                </div>
                <div className="flex items-end space-x-2.5">
                    <h4 className="text-slate-900 font-bold text-3xl tracking-tight leading-none">5</h4>
                    <span className="text-[11px] font-bold text-slate-500 bg-slate-50 px-1.5 py-0.5 rounded border border-gray-100 mb-0.5">- 0%</span>
                </div>
            </div>

        </div>
    )
}

export default CardsDetails;