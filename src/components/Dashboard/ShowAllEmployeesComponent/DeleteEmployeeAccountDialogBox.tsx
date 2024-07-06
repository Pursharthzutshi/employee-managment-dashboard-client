import { useEffect } from "react";
import "../ShowAllEmployeesComponent/DeleteEmployeeAccountDialogBox.css"
import { FaTimes } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { delete_employees_account_query, show_all_employees_data_query } from "../../../GraphQLQueries/ShowAllEmployeesQuery";
import { useAppDispatch } from "../../../ReduxHooks";
import { setCreateEmployeeNewAccountStatus } from "../../../ReduxSlicers/createEmployeeNewAccountStatusSlicer";

type DeleteEmployeeAccountDialogBoxProps = {
    uid: String
    showDeleteEmployeeAccountDialogBoxStatus: Boolean
    setShowDeleteEmployeeAccountDialogBoxStatus: React.Dispatch<React.SetStateAction<boolean>>
}

function DeleteEmployeeAccountDialogBox({ uid, setShowDeleteEmployeeAccountDialogBoxStatus }: DeleteEmployeeAccountDialogBoxProps) {

    const [deleteEmployeeAccount, { data: deleteEmployeeAccountDetails, loading: deleteEmployeeAccountDetailsLoading }] = useMutation(delete_employees_account_query, {

        onCompleted: (deleteEmployeeAccountDetailsData) => {
            // if(deleteEmployeeAccountDetailsData.deleteEmployeeAccount.success === "true"){
            // }
            console.log(deleteEmployeeAccountDetailsData)
        },

        update: (cache, { data: { deleteEmployeeAccount } }) => {
            console.log(deleteEmployeeAccount)
            if (deleteEmployeeAccount.status) {
                const showAllEmployeesCacheData:any = cache.readQuery({ query: show_all_employees_data_query })
                const uid = showAllEmployeesCacheData.showAllEmployee.map((showAllEmployeesCacheDataUid:any)=>{
                    console.log(showAllEmployeesCacheDataUid.uid)
                })

                console.log(showAllEmployeesCacheData)

                cache.writeQuery({
                    query:show_all_employees_data_query,
                    data:{
                        showAllEmployee: uid !== deleteEmployeeAccount.uid 
                    }
                })
    
            }
        }
    }
        // {
        //     refetchQueries: [{ query: show_all_employees_data_query }]
        // }


    );
    useEffect(() => {
        console.log(uid)
    })

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
        <div id="main-page" className="delete-employee-Account-dialog-box">

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