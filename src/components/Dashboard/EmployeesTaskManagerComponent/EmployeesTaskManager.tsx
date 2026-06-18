import React, { useEffect } from "react";
import ShowEmployeesTask from "./ShowEmployeesDataComponent/ShowEmployeesTask";
import { useAppDispatch, useAppSelector } from "../../../ReduxHooks";
import { setShowEmployeesDialogBox } from "../../../ReduxSlicers/ShowEmployeesDialogBoxSlicer";
import AddEmployeesTaskManagerDialogBox from "./AddEmployeesComponent/AddEmployeesTaskManagerDialogBox";


import "../EmployeesTaskManagerComponent/EmployeesTaskManager.css"
import "../EmployeesTaskManagerComponent/TaskDialogBox.css"
import "../../../App.css"

function EmployeesTaskManager() {


    const dialogBox = useAppSelector((state) => state.ShowEmployeesDialogBoxSlicer.showEmployeesDialogBox)
    const Dispatch = useAppDispatch();

    const showDialogBox = () => {
        Dispatch(setShowEmployeesDialogBox(true));
    }

    useEffect(() => {
        const val = localStorage.getItem('loggedInEmailID')
    })

    return (
        <div id="main-page" className="p-6 md:p-8 pt-12 md:pt-16 max-w-[1600px] mx-auto w-full">

            
            <div className="mt-8 animate-[showDashboardEffectAnimation_0.5s_ease-out]">
                <div className="flex justify-between items-center mb-8 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Employees Tasks</h2>
                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 px-6 rounded-xl shadow-sm shadow-indigo-200 transition-colors" onClick={showDialogBox}>Add New Tasks</button>
                </div>

                {
                    dialogBox && <AddEmployeesTaskManagerDialogBox />
                }

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <ShowEmployeesTask />
                </div>
            </div>
        </div>
    )
}

export default EmployeesTaskManager;