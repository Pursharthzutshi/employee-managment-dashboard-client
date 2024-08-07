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
    <div className="employees-task-data-container">
      {
        employeesTaskData.fetchEmployeesTaskDetails.length > 0 ?

          employeesTaskData.fetchEmployeesTaskDetails.map((val: fetchEmployeesDetailsProps) => {
            return (
              <div className="employees-task-data-div">

                <div>
                  <br></br>
                  <strong>TASK NAME - : </strong>
                  <p className="task-name">{val.name}</p>
                </div>
                <strong>TASK DESCRIPTION - : </strong>

                <p className="task-desc">{val.taskDesc}</p>

                <strong>TASK DEADLINE - : </strong>

                <p>{val.deadLine}</p>

                <strong>TASK ASSIGNED TO - : </strong>
                <div className="assigned-to-employee-div">
                </div>
                {
                  val.emailId.map((val: string) => {
                    return <div>

                      <p>{val}</p>
                    </div>
                  })
                }
                {/* <p className="emailid"></p> */}

                <div className="employees-edit-delete-task-button-container">
                  <button className="employees-task-edit-dialog-box-button" onClick={() => showEditDialogBox(val.uid)}>Edit Task</button>
                  <button className="employees-task-delete-button" onClick={() => {
                    deleteEmployeeTaskData({
                      variables: {
                        employeeUidParameter: {
                          uid: val.uid
                        }
                      }
                    })
                  }}>Delete Task</button>
                </div>
              </div>
            )
          })
          :
          <div className="show-no-task-message">
            <p className="font-bold">No Tasks Added</p>
          </div>
      }
      {
      }

      {
        editdialogBox && <EditEmployeesTaskManagerDialogBox selectedUpdateTaskFieldUid={selectedUpdateTaskFieldUid} />
      }
    </div>
  )
}

export default ShowEmployeesTask;