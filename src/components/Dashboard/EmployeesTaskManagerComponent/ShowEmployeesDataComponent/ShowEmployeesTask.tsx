import { gql, useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { setShowEmployeesEditDialogBox } from "../../../../ReduxSlicers/ShowEmployeesDialogBoxSlicer";
import { useAppDispatch, useAppSelector } from "../../../../ReduxHooks";
import EditEmployeesTaskManagerDialogBox from "../EditEmployeesDataComponents/EditEmployeesTaskManagerDialogBox";
import { fetchEmployeesDetailsProps, FetchEmployeesTaskDetailsQueryResult, fetchEmployeesTaskDetailsType, fetchTaskDeleteDataType } from "../../../../Types/EmployeesTaskTypes";

import "../ShowEmployeesDataComponent/ShowEmployeesTask.css"
import { client } from "../../../..";

const fetch_employees_task_details_query = gql`
query fetchEmployeesDetails{
 fetchEmployeesTaskDetails{
 uid,
name,
emailId,
taskDesc,
deadLine
 }
}
`
const delete_employees_task_data = gql`
mutation dq($employeeUidParameter: deleteEmployeesTaskInput!){
  deleteEmployeesTask(employeeUidParameter: $employeeUidParameter) {
    emailId
  }
}

`
function ShowEmployeesTask() {



  const [selectedUpdateTaskFieldUid, setSelectedUpdateTaskFieldUid] = useState<string>("");

  const { data: employeesTaskData, loading } = useQuery(fetch_employees_task_details_query)

  const [editDialogBox, setEditDialogBox] = useState<Boolean>(false);

  const [deleteEmployeeTaskData, { data: deleteEmployeesTask }] = useMutation(delete_employees_task_data, {

    update: (cache) => {

      const fetchTaskDeleteData: fetchEmployeesTaskDetailsType | null  = cache.readQuery({ query: fetch_employees_task_details_query })


      const uid = fetchTaskDeleteData?.fetchEmployeesTaskDetails.map((fetchEmployeesTaskDetails: fetchTaskDeleteDataType) => {
        return fetchEmployeesTaskDetails.uid
      })

      if (fetchTaskDeleteData?.fetchEmployeesTaskDetails) {
        cache.writeQuery({
          query: fetch_employees_task_details_query,
          data: {
            fetchEmployeesTaskDetails: uid !== fetchTaskDeleteData.uid
          }
        })
      }
    }
  }
    // {
    //   refetchQueries: [{ query: fetch_employees_task_details_query }]
    // }
  );


  const editdialogBox = useAppSelector((state) => state.ShowEmployeesDialogBoxSlicer.showEmployeesEditDialogBox)

  const Dispatch = useAppDispatch();

  const showEditDialogBox = (val: string) => {
    Dispatch(setShowEmployeesEditDialogBox(true));
    setSelectedUpdateTaskFieldUid(val)
  }




  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {
        employeesTaskData.fetchEmployeesTaskDetails.length > 0 ?

          employeesTaskData.fetchEmployeesTaskDetails.map((val: fetchEmployeesDetailsProps) => {
            return (
              <div key={val.uid} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col transition-all hover:shadow-md hover:-translate-y-1 duration-300">

                <div className="mb-4">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Task Name</p>
                  <p className="text-lg font-bold text-slate-800 truncate">{val.name}</p>
                </div>

                <div className="mb-4 flex-1">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Description</p>
                  <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed">{val.taskDesc}</p>
                </div>

                <div className="mb-4">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Deadline</p>
                  <p className="text-sm font-medium text-slate-700 bg-slate-50 inline-block px-3 py-1 rounded-md border border-slate-100">{val.deadLine}</p>
                </div>

                <div className="mb-6">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Assigned To</p>
                  <div className="flex flex-wrap gap-2">
                    {
                      val.emailId.map((email: string, index: number) => (
                        <span key={index} className="text-xs font-medium text-indigo-700 bg-indigo-50 border border-indigo-100 px-2 py-1 rounded-md">
                          {email}
                        </span>
                      ))
                    }
                  </div>
                </div>

                <div className="mt-auto grid grid-cols-2 gap-3 pt-4 border-t border-gray-100">
                  <button 
                    className="w-full bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold py-2.5 px-4 rounded-xl text-sm transition-colors shadow-sm" 
                    onClick={() => showEditDialogBox(val.uid)}>
                    Edit Task
                  </button>
                  <button 
                    className="w-full bg-red-50 hover:bg-red-100 text-red-600 font-semibold py-2.5 px-4 rounded-xl text-sm transition-colors shadow-sm" 
                    onClick={() => {
                      deleteEmployeeTaskData({
                        variables: {
                          employeeUidParameter: {
                            uid: val.uid
                          }
                        }
                      })
                    }}>
                    Delete Task
                  </button>
                </div>
              </div>
            )
          })
          :
          <div className="col-span-full flex flex-col items-center justify-center p-12 bg-white rounded-2xl border border-dashed border-gray-300">
            <p className="font-bold text-slate-500 text-lg">No Tasks Added</p>
          </div>
      }
      </div>

      {
        editdialogBox && <EditEmployeesTaskManagerDialogBox selectedUpdateTaskFieldUid={selectedUpdateTaskFieldUid} />
      }
    </div>
  )
}

export default ShowEmployeesTask;