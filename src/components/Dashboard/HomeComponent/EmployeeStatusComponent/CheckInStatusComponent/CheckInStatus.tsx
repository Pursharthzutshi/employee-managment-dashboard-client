import React, { useEffect, useState } from "react";
import "./CheckInStatus.css"
import { gql, useMutation, useQuery } from "@apollo/client";
import { useAppDispatch, useAppSelector } from "../../../../../ReduxHooks";
import { setChechInStatus } from "../../../../../ReduxSlicers/CheckInStatusSlicer";
// import { FaPen } from "react-icons/fa";

const check_in_status_query = gql`
mutation updateStatus($updateSignUpStatusParameter: updateSignUpStatusInput!){
  updateSignUpStatus(updateSignUpStatusParameter: $updateSignUpStatusParameter) {
  uid
  status
  }
}
`

function CheckInStatus() {

    const [updateSignUpCheckInStatus,loading] = useMutation(check_in_status_query);

    const checkInStatus = useAppSelector((state) => state.CheckInStatusSlicer.checkInStatus)

    const Dispatch = useAppDispatch()

    const changeCheckInStatus = () => {
        updateSignUpCheckInStatus({
            variables: {
                updateSignUpStatusParameter: {
                    uid: "1",
                    // uid: "558beeb8-cee7-46d5-805d-b6e6c2c6006b",
                    status: checkInStatus
                }
            }
        })

        Dispatch(setChechInStatus((!checkInStatus)))
        
    }



    return (
        <div className="check-in-status-container">

            {/* <button onClick={changeCheckInStatus}>Toggle</button> */}

        </div>
    )
}

export default CheckInStatus;