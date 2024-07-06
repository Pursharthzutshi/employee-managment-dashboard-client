import React, { useState } from "react";
import { FaBuilding, FaUser, FaUserAlt } from "react-icons/fa";
import DropDown from "../utils/DropDown";


import "../NavBarComponent/NavBar.css"
import "../NavBarComponent/NavBarResponsive.css"

function NavBar() {

    const [test, setTest] = useState<boolean>(false);

    const change = () => {
        setTest(!test)
    }

    return (
        <div className="nav-bar-component">

            <div className="nav-bar-search-bar-container">
                <div className="navbar-div">
                    <FaUserAlt className="navbar-icon" />
                    <p className="dashboard-name">Dashboard</p>
                </div>

                <div className="nav-bar-search-user-profile-div">

                    {/* <div className="nav-bar-search-bar-div">
                        <input className="nav-bar-search-bar" type="text" placeholder="Search" />
                    </div> */}

                    <div className="nav-bar-profile-icon-div">
                        <FaUser className="user-profile-icon" onClick={() => change()}>Icon</FaUser>
                        <DropDown test={test} />
                    </div>
                </div>
            </div>


        </div>
    )
}

export default NavBar;