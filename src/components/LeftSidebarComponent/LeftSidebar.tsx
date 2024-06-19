import React, { useEffect } from "react";
import "./LeftSidebar.css"
import { FaAddressBook, FaBeer, FaChevronCircleUp, FaCogs, FaHome, FaPersonBooth, FaProductHunt, FaSignInAlt, FaSignOutAlt, FaUserPlus } from "react-icons/fa";
import { Route, Link, useNavigate } from "react-router-dom";
import { setShowLogOutButtonElements, setLogOutStatus, setAdminStatus } from "../../ReduxSlicers/LocalStorageSlicer";
import { useAppDispatch, useAppSelector } from "../../ReduxHooks";
import HomePageImage from "../RegisterComponent/images/homepage.png"
import detailsImage from "../RegisterComponent/images/file.png"
import employeeInfo from "../RegisterComponent/images/employee.png"
import addEmployee from "../RegisterComponent/images/add.png"
import settingsImage from "../RegisterComponent/images/settings.png"
import logoutImage from "../RegisterComponent/images/arrow.png"

function LeftSidebar() {
    const showLogOutButtonElements = useAppSelector((state: any) => state.LocalStorageSlicer.showLogOutButtonElements)
    const navigate = useNavigate()

    const Dispatch = useAppDispatch();

    const logout = () => {
        Dispatch(setShowLogOutButtonElements(false))
        Dispatch(setLogOutStatus(false))
        Dispatch(setAdminStatus(false))
        navigate("/")

    }

    return (
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

                    <Link className="left-sidebar-links" to="/createEmployeeNewAccount">
                        <img className="left-sidebar-icon-image" src={addEmployee} />
                        <p >Add Employee</p>

                    </Link>
                    {/* <Link className="left-sidebar-links" to="/signup">
                        <img className="left-sidebar-icon-image" src={settingsImage} />
                        <p >Settings</p>

                    </Link> */}
                </div>
                <br></br>
                <br></br>
                <br></br>
                {
                    showLogOutButtonElements ?
                            <img className="left-sidebar-icon-image" src={logoutImage} onClick={logout} />

                                :

                                <Link className="left-sidebar-links" to="/login">
                                    <FaSignInAlt to="/" />
                                    <p>Login</p>
                                </Link>
                }


                            </div>

                        </div>
    )
}

                export default LeftSidebar;