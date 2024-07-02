import React, { useEffect } from "react";
import "./LeftSidebar.css"
import { FaAddressBook, FaBeer, FaChevronCircleUp, FaCogs, FaHome, FaPersonBooth, FaProductHunt, FaSignInAlt, FaSignOutAlt, FaUserPlus } from "react-icons/fa";
import { Route, Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../ReduxHooks";
import HomePageImage from "../RegisterComponent/images/homepage.png"
import detailsImage from "../RegisterComponent/images/file.png"
import employeeInfo from "../RegisterComponent/images/employee.png"
import addEmployee from "../RegisterComponent/images/add.png"
import settingsImage from "../RegisterComponent/images/settings.png"

function LeftSidebar() {

    const Dispatch = useAppDispatch();
    const adminStatus = useAppSelector((state) => state.LocalStorageSlicer.adminStatus)

    return (
        <div className="left-sidebar-component">
            <div className="left-sidebar">
                {/* <h4>Dashboard</h4> */}
                <div className="left-sidebar-links-icons-div">
                    {/* <img className="left-sidebar-icon-image" src={image}/> */}

                    <div className="left-sidebar-icons-div">
                        <Link className="left-sidebar-links" to="/home">
                            <img className="left-sidebar-icon-image" src={HomePageImage} />
                            <p >Home</p>
                        </Link>

                        <Link className="left-sidebar-links" to="/employeesTaskManagmentPage">
                            <img className="left-sidebar-icon-image" src={detailsImage} />
                            <p >Tasks</p>

                        </Link>

                        <Link className="left-sidebar-links" to="/showAllEmployeesData">
                            <img className="left-sidebar-icon-image" src={employeeInfo} />
                            <p >Employee Details</p>

                        </Link>

                        {
                            adminStatus ?
                                <Link className="left-sidebar-links" to="/createEmployeeNewAccount">
                                    <img className="left-sidebar-icon-image" src={addEmployee} />

                                    {
                                        adminStatus ? <p>Add Employee</p> : <p>Show Employee</p>
                                    }

                                </Link>
                                :
                                null
                        }
                        {
                            adminStatus && <Link className="left-sidebar-links" to="/settings">
                                <img className="left-sidebar-icon-image" src={settingsImage} />
                                <p>Settings</p>
                            </Link>
                        }




                    </div>




                </div>

            </div>
        </div>
    )
}

export default LeftSidebar;