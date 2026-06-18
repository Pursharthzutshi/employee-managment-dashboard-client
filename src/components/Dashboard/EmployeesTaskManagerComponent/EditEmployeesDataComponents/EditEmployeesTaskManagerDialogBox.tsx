import { gql, useMutation, useQuery } from "@apollo/client";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../ReduxHooks";
import { setShowEmployeesDialogBox, setShowEmployeesEditDialogBox } from "../../../../ReduxSlicers/ShowEmployeesDialogBoxSlicer";
import EmployeesTaskManagerDialogBoxForm from "../EmployeesTaskManagerDialogBoxForm";
import ReactLoading from 'react-loading';

import "../ShowEmployeesDataComponent/ShowEmployeesTask.css"
import "../TaskDialogBox.css"
import "../TaskDialogBoxResponsive.css"

import { EditEmployeesTaskManagerDialogBoxProps } from "../../../../Types/EmployeesTaskTypes";
import { edit_employees_task_details_query, fetch_employees_task_details_query } from "../../../../GraphQLQueries/EmployeesTaskManagerQuery";



type EditEmployeesTaskDetailsDialogBoxProps = {
    selectedUpdateTaskFieldUid: String
    // setEditDialogBox: React.Dispatch<React.SetStateAction<Boolean>>
}

function EditEmployeesTaskManagerDialogBox({ selectedUpdateTaskFieldUid }: EditEmployeesTaskManagerDialogBoxProps) {
    const employeeName = useAppSelector((state) => state.AddEmployeesTaskSlicer.employeeName)
    const employeeEmailId = useAppSelector((state) => state.AddEmployeesTaskSlicer.employeeEmailId)
    const employeeTaskDesc = useAppSelector((state) => state.AddEmployeesTaskSlicer.employeeTaskDesc)
    const employeeDeadLine = useAppSelector((state) => state.AddEmployeesTaskSlicer.employeeDeadLine)

    const Dispatch = useAppDispatch()


    const [editEmployeesTaskFields] = useMutation(edit_employees_task_details_query)

    useEffect(() => {
        console.log(selectedUpdateTaskFieldUid)
    })

    const editDialogBox = () => {

            editEmployeesTaskFields({
                variables: {
                    editEmployeesTaskParameter: {
                        uid: selectedUpdateTaskFieldUid,
                        name: employeeName,
                        emailId: employeeEmailId,
                        taskDesc: employeeTaskDesc,
                        deadLine: employeeDeadLine
                    }
                }
            })

    }

    const closeDialogBox = () => {
        Dispatch(setShowEmployeesDialogBox(false));
        Dispatch(setShowEmployeesEditDialogBox(false));
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden relative">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                    <h3 className="font-bold text-lg text-slate-900">Edit Task</h3>
                    <button 
                        type="button"
                        onClick={closeDialogBox}
                        className="text-slate-400 hover:text-slate-600 transition-colors p-1.5 rounded-full hover:bg-slate-100"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>

                <form className="flex flex-col" onSubmit={(e) => { e.preventDefault(); editDialogBox(); closeDialogBox(); }}>
                    <div className="p-6 space-y-5 max-h-[60vh] overflow-y-auto">
                        <EmployeesTaskManagerDialogBoxForm />
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
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditEmployeesTaskManagerDialogBox;