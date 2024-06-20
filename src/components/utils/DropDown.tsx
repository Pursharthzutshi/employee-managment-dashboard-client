import React, { useEffect } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../ReduxHooks";
import { setShowLogOutButtonElements, setLogOutStatus, setAdminStatus } from "../../ReduxSlicers/LocalStorageSlicer";
import logoutImage from "../RegisterComponent/images/arrow.png"

type testProps = {
    test: Boolean
}

function DropDown({ test }: testProps) {
    const showLogOutButtonElements = useAppSelector((state: any) => state.LocalStorageSlicer.showLogOutButtonElements)
    const navigate = useNavigate()

    const Dispatch = useAppDispatch()

    const logout = () => {
        Dispatch(setShowLogOutButtonElements(false))
        Dispatch(setLogOutStatus(false))
        Dispatch(setAdminStatus(false))
        navigate("/")

    }
    return (
        <div>
            {
                test && <div className="box">
                    <ul>
                        {/* <Link className="links" to="/">My Profile</Link> */}
                        {/* <Link className="links" to="/a">Account</Link> */}
                        {
                            showLogOutButtonElements ?
                                <button className="logout-button"  onClick={logout} >
                                    Logout
                                    {/* <img src={logoutImage} className="left-sidebar-icon-image" /> */}
                                </button>
                                :

                                <Link className="left-sidebar-links" to="/login">
                                    <FaSignInAlt to="/" />
                                    <p>Login</p>
                                </Link>
                        }
                        {/* <Link className="links" to="/">Home</Link>
                        <Link className="links" to="/">Home</Link> */}
                    </ul>
                </div>
            }
        </div>
    )
}

export default DropDown;