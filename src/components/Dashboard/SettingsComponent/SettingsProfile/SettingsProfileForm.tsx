import { useEffect, useState } from "react";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { useAppDispatch, useAppSelector } from "../../../../ReduxHooks";
import { fetchAdminProfileDetails, updateProfileNameQuery, updateProfilePasswordQuery } from "../../../../GraphQLQueries/SettingsQuery";
import { setSavedLoggedInName } from "../../../../ReduxSlicers/LocalStorageSlicer";
import { fetchAdminProfileDetailsProps } from "../../../../Types/SettingsProfileFormTypes";

import "../SettingsProfile/SettingsProfileForm.css"

function SettingsProfileForm() {

    const adminStatus = useAppSelector((state) => state.LocalStorageSlicer.adminStatus)


    const [updateName, setUpdateName] = useState("")
    const [updatePassword, setUpdatePassword] = useState("")

    const [adminProfileSavedUid, setAdminProfileSavedUid] = useState(localStorage.getItem("adminLoggedInSavedUid"));

    const [updateProfileName] = useMutation(updateProfileNameQuery)
    const [updateProfilePassword, { loading: updateProfilePasswordLoading }] = useMutation(updateProfilePasswordQuery)

    const Disptach = useAppDispatch();

    const [fetchAdminDetails, { data: fetchAdminProfileDetailsData, loading }] = useLazyQuery(fetchAdminProfileDetails, {
        variables: {
            fetchAdminProfileDetailsParameters: {
                uid: adminProfileSavedUid
            },
        },
        onCompleted: (fetchAdminProfileDetailsData) => {
            Disptach(setSavedLoggedInName(fetchAdminProfileDetailsData.fetchAdminProfileDetails[0].name))
        },

    });



    useEffect(() => {
        if (adminProfileSavedUid) {
            fetchAdminDetails();
        }

    }, [adminProfileSavedUid, fetchAdminDetails]);


    return (
        <div className="settings-profile-form">

            {fetchAdminProfileDetailsData &&
                fetchAdminProfileDetailsData.fetchAdminProfileDetails.map((val: fetchAdminProfileDetailsProps) => {
                    return (
                        <div>
                            <p className="font-bold text-xl">User Details</p>
                            <br></br>
                            <label className="font-bold text-sl">Name:</label><p>{val.name}</p>
                            <br></br>
                            <label className="font-bold text-sl">EmailId:</label><p>{val.emailId}</p>
                        </div>
                    )
                })
            }

            <form className="settings-profile-form">
                <p className="font-bold text-xl">Change Settings</p>
                <div>
                    <input onChange={(e) => setUpdateName(e.target.value)} placeholder="User Name" type="text" />
                    <button className="update-profile-button" onClick={() =>
                        updateProfileName({
                            variables: {
                                updateProfileNameParameters: {
                                    uid: adminProfileSavedUid,
                                    name: updateName
                                },
                            },
                        })

                    }>Update Name</button>
                </div>
                <div>
                    <input onChange={(e) => setUpdatePassword(e.target.value)} placeholder="Password" type="text" />
                    <button className="update-profile-button" onClick={() =>
                        updateProfilePassword({
                            variables: {
                                updateProfilePasswordParameters: {
                                    uid: adminProfileSavedUid,
                                    password: updatePassword
                                },
                            },
                        })

                    }>Update Password</button>

                </div>
            </form>

        </div>
    )
}

export default SettingsProfileForm;