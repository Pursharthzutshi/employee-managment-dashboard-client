import { FormEvent, useState } from "react";
import { useMutation } from "@apollo/client";
import { useAppDispatch, useAppSelector } from "../../../../ReduxHooks/index";
import { setEmployeeDeadLine, setEmployeeName, setEmployeeTaskDesc } from "../../../../ReduxSlicers/AddEmployeesTaskSlicer";
import { v4 as uuidv4 } from 'uuid';
import EmployeesTaskManagerDialogBoxForm from "../EmployeesTaskManagerDialogBoxForm";
import { addEmployeesTask, fetch_employees_task_details_query } from "../../../../GraphQLQueries/EmployeesTaskManagerQuery";
import { setShowEmployeesDialogBox } from "../../../../ReduxSlicers/ShowEmployeesDialogBoxSlicer";
import { addTasksCacheType } from "../../../../Types/InMemoryCacheTypes";

import "../AddEmployeesComponent/AddEmployeesTaskManagerDialogBox.css"
import "../TaskDialogBox.css"
import "../TaskDialogBoxResponsive.css"

function AddEmployeesTaskManagerDialogBox() {


    const employeeName = useAppSelector((state) => state.AddEmployeesTaskSlicer.employeeName)
    const employeeEmailId = useAppSelector((state) => state.AddEmployeesTaskSlicer.employeeEmailId)
    const employeeTaskDesc = useAppSelector((state) => state.AddEmployeesTaskSlicer.employeeTaskDesc)
    const employeeDeadLine = useAppSelector((state) => state.AddEmployeesTaskSlicer.employeeDeadLine)

    const Dispatch = useAppDispatch();

    const [showErrorMessageStatus, setShowErrorMessageStatus] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState("");

    const [addTasks] = useMutation(addEmployeesTask, {
        onCompleted: (addTaskdata) => {
            if (addTaskdata.createEmployeesTask.success === false) {
                setShowErrorMessageStatus(true)
                setShowErrorMessage(addTaskdata.createEmployeesTask.message)
                Dispatch(setShowEmployeesDialogBox(true));

            } else {
                Dispatch(setShowEmployeesDialogBox(false));
                Dispatch(setEmployeeName(""))
                Dispatch(setEmployeeTaskDesc(""))
                Dispatch(setEmployeeDeadLine(""))
                Dispatch(setEmployeeTaskDesc(""))
                setShowErrorMessageStatus(false)
            }
        },
        update: (cache, { data: { createEmployeesTask } }) => {
            const newtaskData = createEmployeesTask.addNewTaskData
            if (newtaskData) {
                const fetchTask: addTasksCacheType | null = cache.readQuery({ query: fetch_employees_task_details_query })
                if (fetchTask?.fetchEmployeesTaskDetails) {
                    cache.writeQuery({
                        query: fetch_employees_task_details_query,
                        data: {
                            fetchEmployeesTaskDetails: [...fetchTask.fetchEmployeesTaskDetails, newtaskData]
                        }
                    })
                }
            }
        }
    });


    const addNewTask = () => {

        addTasks({
            variables: {
                employeesTaskParameters: {
                    uid: uuidv4(),
                    name: employeeName,
                    emailId: employeeEmailId,
                    taskDesc: employeeTaskDesc,
                    deadLine: employeeDeadLine
                }
            }
        })
    }

    const preventForm = (e: FormEvent) => {
        addNewTask()
        e.preventDefault()
    }

    const closeDialogBox = () => {
        Dispatch(setShowEmployeesDialogBox(false));
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden relative">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                    <h3 className="font-bold text-lg text-slate-900">Add New Task</h3>
                    <button 
                        type="button"
                        onClick={closeDialogBox}
                        className="text-slate-400 hover:text-slate-600 transition-colors p-1.5 rounded-full hover:bg-slate-100"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>

                <form onSubmit={preventForm} className="flex flex-col">
                    <div className="p-6 space-y-5 max-h-[60vh] overflow-y-auto">
                        <EmployeesTaskManagerDialogBoxForm />
                        { showErrorMessageStatus && (
                            <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg border border-red-100 font-medium">
                                {showErrorMessage}
                            </div>
                        )}
                    </div>
                    
                    {/* Footer */}
                    <div className="px-6 py-4 bg-slate-50 border-t border-gray-100 flex justify-end gap-3">
                        <button 
                            type="button" 
                            onClick={closeDialogBox}
                            className="px-5 py-2.5 bg-white border border-gray-200 text-slate-700 text-sm font-semibold rounded-xl hover:bg-slate-50 transition-colors shadow-sm"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit" 
                            className="px-5 py-2.5 bg-indigo-600 text-white text-sm font-bold rounded-xl hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-200"
                        >
                            Add Task
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddEmployeesTaskManagerDialogBox;