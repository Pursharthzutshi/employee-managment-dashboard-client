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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* User Profile Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col transition-all hover:shadow-md">
                {fetchAdminProfileDetailsData ? (
                    fetchAdminProfileDetailsData.fetchAdminProfileDetails.map((val: fetchAdminProfileDetailsProps, index: number) => {
                        return (
                            <div key={index}>
                                <div className="flex items-center space-x-5 mb-8 pb-6 border-b border-gray-100">
                                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-100 to-indigo-50 border-4 border-white shadow-md flex items-center justify-center">
                                        <span className="text-indigo-700 font-bold text-3xl">{val.name.charAt(0).toUpperCase()}</span>
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-slate-800 tracking-tight">User Profile</h3>
                                        <p className="text-sm font-medium text-slate-500 mt-1">Manage your account details</p>
                                    </div>
                                </div>
                                
                                <div className="space-y-5">
                                    <div className="bg-slate-50 p-5 rounded-xl border border-gray-100 hover:border-indigo-100 transition-colors">
                                        <label className="text-xs font-bold text-indigo-500 uppercase tracking-widest mb-1.5 block">Full Name</label>
                                        <p className="font-bold text-slate-800 text-lg">{val.name}</p>
                                    </div>
                                    <div className="bg-slate-50 p-5 rounded-xl border border-gray-100 hover:border-indigo-100 transition-colors">
                                        <label className="text-xs font-bold text-indigo-500 uppercase tracking-widest mb-1.5 block">Email Address</label>
                                        <p className="font-bold text-slate-800 text-lg truncate">{val.emailId}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                ) : (
                    <div className="flex items-center justify-center h-full">
                        <p className="text-slate-400 font-medium">Loading profile...</p>
                    </div>
                )}
            </div>

            {/* Account Settings Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col transition-all hover:shadow-md">
                <div className="mb-8 pb-6 border-b border-gray-100">
                    <h3 className="text-2xl font-bold text-slate-800 tracking-tight">Account Settings</h3>
                    <p className="text-sm font-medium text-slate-500 mt-1">Update your credentials</p>
                </div>
                
                <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                    {/* Update Name */}
                    <div>
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2.5 block">Update Name</label>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <input 
                                onChange={(e) => setUpdateName(e.target.value)} 
                                placeholder="New User Name" 
                                className="flex-1 px-5 py-3.5 bg-slate-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm font-medium transition-all shadow-sm" 
                                type="text" 
                            />
                            <button 
                                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 px-7 rounded-xl shadow-sm shadow-indigo-200 transition-all hover:-translate-y-0.5 whitespace-nowrap" 
                                onClick={(e) => {
                                    e.preventDefault();
                                    if(updateName) {
                                        updateProfileName({
                                            variables: {
                                                updateProfileNameParameters: {
                                                    uid: adminProfileSavedUid,
                                                    name: updateName
                                                },
                                            },
                                        })
                                    }
                                }}
                            >
                                Update
                            </button>
                        </div>
                    </div>

                    {/* Update Password */}
                    <div className="pt-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2.5 block">Update Password</label>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <input 
                                onChange={(e) => setUpdatePassword(e.target.value)} 
                                placeholder="New Password" 
                                className="flex-1 px-5 py-3.5 bg-slate-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm font-medium transition-all shadow-sm" 
                                type="password" 
                            />
                            <button 
                                className="bg-slate-800 hover:bg-slate-900 text-white font-bold py-3.5 px-7 rounded-xl shadow-sm transition-all hover:-translate-y-0.5 whitespace-nowrap" 
                                onClick={(e) => {
                                    e.preventDefault();
                                    if(updatePassword) {
                                        updateProfilePassword({
                                            variables: {
                                                updateProfilePasswordParameters: {
                                                    uid: adminProfileSavedUid,
                                                    password: updatePassword
                                                },
                                            },
                                        })
                                    }
                                }}
                            >
                                Update
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SettingsProfileForm;