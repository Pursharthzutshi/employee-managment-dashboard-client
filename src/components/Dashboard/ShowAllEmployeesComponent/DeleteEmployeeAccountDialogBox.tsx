import { useMutation } from "@apollo/client";
import { delete_employees_account_query, show_all_employees_data_query } from "../../../GraphQLQueries/ShowAllEmployeesQuery";
import { useAppDispatch } from "../../../ReduxHooks";
import { setCreateEmployeeNewAccountStatus } from "../../../ReduxSlicers/createEmployeeNewAccountStatusSlicer";
import {showAllEmployeesCacheDataProps, showAllEmployeesCacheDataUidType } from "../../../Types/HomeComponentTypes";

import "../ShowAllEmployeesComponent/DeleteEmployeeAccountDialogBox.css"

type DeleteEmployeeAccountDialogBoxProps = {
    uid: String
    showDeleteEmployeeAccountDialogBoxStatus: Boolean
    setShowDeleteEmployeeAccountDialogBoxStatus: React.Dispatch<React.SetStateAction<boolean>>
}

function DeleteEmployeeAccountDialogBox({ uid, setShowDeleteEmployeeAccountDialogBoxStatus }: DeleteEmployeeAccountDialogBoxProps) {

    const [deleteEmployeeAccount, { data: deleteEmployeeAccountDetails, loading: deleteEmployeeAccountDetailsLoading }] = useMutation(delete_employees_account_query, {

        update: (cache, { data: { deleteEmployeeAccount } }) => {
            if (deleteEmployeeAccount.status) {
                const showAllEmployeesCacheData:showAllEmployeesCacheDataProps | null = cache.readQuery({ query: show_all_employees_data_query })
                const uid = showAllEmployeesCacheData?.showAllEmployee.map((showAllEmployeesCacheDataUid:showAllEmployeesCacheDataUidType)=>{
                    console.log(showAllEmployeesCacheDataUid.uid)
                })


                cache.writeQuery({
                    query:show_all_employees_data_query,
                    data:{
                        showAllEmployee: uid !== deleteEmployeeAccount.uid 
                    }
                })
    
            }
        },
        onError:(err)=>{
            console.log(err)
        }
    }



    );
   
    const closeDeleteAccountDialogBox = () => {
        setShowDeleteEmployeeAccountDialogBoxStatus(false);
    }
    const Dispatch = useAppDispatch()

    const deleteAccountAndCloseBox = () => {
        Dispatch(setCreateEmployeeNewAccountStatus(true))

        setShowDeleteEmployeeAccountDialogBoxStatus(false);
        deleteEmployeeAccount({
            variables: {
                deleteEmployeeAccountParameters: {
                    uid: uid
                }
            }
        })

    }

    if (deleteEmployeeAccountDetailsLoading) return <div>Loading</div>


    return (
        <div  className="delete-employee-Account-dialog-box">

            <form className="delete-employee-Account-dialog-box-form">
                <p className="font-bold text-sl ml-3 mt-5 text-blue">Are You Sure You want to delete this employee Account ?</p>
                <div className="delete-employee-Account-dialog-box-buttons-container">
                    <button className="delete-employee-Account-button" onClick={deleteAccountAndCloseBox}>Delete Employee Account</button>
                    <button className="close-employee-delete-Account-button" onClick={closeDeleteAccountDialogBox}>Cancel</button>
                </div>
            </form>
        </div>
    )
}

export default DeleteEmployeeAccountDialogBox;