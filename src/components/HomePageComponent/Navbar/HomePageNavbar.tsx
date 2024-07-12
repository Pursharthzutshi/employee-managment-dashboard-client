import React from "react";
import "../Navbar/HomePageNavbar.css"
import { Link } from "react-router-dom";

function HomePageNavbar() {
    return (
        <div className="home-page-navbar-component">
            <div>

                <p className="font-bold mt-1">Dashboard</p>
            </div>

            <div className="home-page-navbar-buttons-links-container">
                <Link className="font-semibold home-page-navbar-login-button-link" to="/loginAdmin">Login as Admin</Link>
                <Link className="font-semibold home-page-navbar-login-button-link" to="/loginEmployee">Login as Employee</Link>
            </div>
        </div>
    )
}

export default HomePageNavbar;